import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

const workerPath = new URL('../cloudflare/portfolio-media.js', import.meta.url);
const worker = existsSync(workerPath) ? (await import(workerPath)).default : null;
const objectKey = 'v1/citax-preview.mp4';
const contents = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

const createBucket = ({ exists = true, error = null } = {}) => {
  const calls = [];
  const metadata = () => ({
    key: objectKey,
    size: contents.byteLength,
    httpEtag: '"citax-etag"',
  });

  return {
    calls,
    async head(key) {
      calls.push({ method: 'head', key });
      if (error) throw error;
      return exists && key === objectKey ? metadata() : null;
    },
    async get(key, options) {
      calls.push({ method: 'get', key, options });
      if (error) throw error;
      if (!exists || key !== objectKey) return null;

      const rangeHeader = options?.range?.get('range');
      const match = rangeHeader && /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
      let offset = 0;
      let end = contents.byteLength - 1;
      if (match) {
        if (match[1]) {
          offset = Number(match[1]);
          if (match[2]) end = Number(match[2]);
        } else {
          offset = Math.max(0, contents.byteLength - Number(match[2]));
        }
        end = Math.min(end, contents.byteLength - 1);
      }
      const bytes = contents.slice(offset, end + 1);
      return {
        ...metadata(),
        ...(rangeHeader ? { range: { offset, length: bytes.byteLength } } : {}),
        body: new Blob([bytes]).stream(),
      };
    },
  };
};

const fetchWorker = (path, { method = 'GET', headers } = {}, bucket = createBucket()) => {
  assert.ok(worker, 'portfolio-media Worker implementation must exist');
  const request = new Request(`https://media.test${path}`, { method, headers });
  return worker.fetch(request, { VIDEOS: bucket });
};

test('serves an allowlisted video with safe media headers', async () => {
  const bucket = createBucket();
  const response = await fetchWorker('/v1/citax-preview.mp4?ignored=private-value', {}, bucket);

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('content-type'), 'video/mp4');
  assert.equal(response.headers.get('cache-control'), 'public, max-age=3600');
  assert.equal(response.headers.get('etag'), '"citax-etag"');
  assert.equal(response.headers.get('accept-ranges'), 'bytes');
  assert.equal(response.headers.get('content-length'), String(contents.byteLength));
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), contents);
  assert.equal(bucket.calls.find(call => call.method === 'get').key, objectKey);
});

test('serves an inclusive byte range with R2 range metadata', async () => {
  const bucket = createBucket();
  const response = await fetchWorker('/v1/citax-preview.mp4', { headers: { Range: 'bytes=2-5' } }, bucket);

  assert.equal(response.status, 206);
  assert.equal(response.headers.get('content-range'), 'bytes 2-5/10');
  assert.equal(response.headers.get('content-length'), '4');
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), contents.slice(2, 6));
  assert.ok(bucket.calls.find(call => call.method === 'get').options.range instanceof Headers);
});

test('serves suffix byte ranges', async () => {
  const response = await fetchWorker('/v1/citax-preview.mp4', { headers: { Range: 'bytes=-3' } });

  assert.equal(response.status, 206);
  assert.equal(response.headers.get('content-range'), 'bytes 7-9/10');
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), contents.slice(-3));
});

test('returns 416 and the total size for an unsatisfiable range', async () => {
  const bucket = createBucket();
  const response = await fetchWorker('/v1/citax-preview.mp4', { headers: { Range: 'bytes=10-' } }, bucket);

  assert.equal(response.status, 416);
  assert.equal(response.headers.get('content-range'), 'bytes */10');
  assert.equal(bucket.calls.some(call => call.method === 'get'), false);
});

test('HEAD returns full object metadata without a body or object download', async () => {
  const bucket = createBucket();
  const response = await fetchWorker('/v1/citax-preview.mp4', { method: 'HEAD' }, bucket);

  assert.equal(response.status, 200);
  assert.equal(response.body, null);
  assert.equal(response.headers.get('content-length'), String(contents.byteLength));
  assert.equal(bucket.calls.some(call => call.method === 'get'), false);
});

test('returns 404 for missing and non-allowlisted media keys', async () => {
  const missing = await fetchWorker('/v1/citax-preview.mp4', {}, createBucket({ exists: false }));
  const unknown = await fetchWorker('/v1/not-a-portfolio-video.mp4');
  const traversal = await fetchWorker('/v1/%2e%2e%2fsecret.mp4');

  assert.equal(missing.status, 404);
  assert.equal(unknown.status, 404);
  assert.equal(traversal.status, 404);
});

test('rejects methods other than GET and HEAD without touching R2', async () => {
  const bucket = createBucket();
  const response = await fetchWorker('/v1/citax-preview.mp4', { method: 'POST' }, bucket);

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET, HEAD');
  assert.equal(bucket.calls.length, 0);
});

test('returns a generic 500 when R2 fails without exposing its error', async () => {
  const bucket = createBucket({ error: new Error('private bucket details') });
  const response = await fetchWorker('/v1/citax-preview.mp4', {}, bucket);
  const body = await response.text();

  assert.equal(response.status, 500);
  assert.equal(body.includes('private bucket details'), false);
});
