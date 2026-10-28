const allowedKeys = new Set([
  'v1/calmavm-preview.mp4',
  'v1/citax-preview.mp4',
  'v1/courtix-preview.mp4',
  'v1/impostor-preview.mp4',
  'v1/launchui-preview.mp4',
  'v1/nasa-preview.mp4',
  'v1/poker-preview.mp4',
  'v1/splitit-preview.mp4',
]);

const responseHeaders = () => new Headers({
  'Accept-Ranges': 'bytes',
  'Cache-Control': 'public, max-age=3600',
  'Content-Type': 'video/mp4',
});

const objectKeyFromUrl = (url) => {
  const match = /^\/v1\/([a-z0-9-]+\.mp4)$/.exec(url.pathname);
  if (!match) return null;

  const key = `v1/${match[1]}`;
  return allowedKeys.has(key) ? key : null;
};

const parseRange = (header, size) => {
  const match = /^bytes=(\d*)-(\d*)$/i.exec(header);
  if (!match || size <= 0) return null;

  const [, startText, endText] = match;
  if (!startText && !endText) return null;

  if (!startText) {
    const suffix = Number(endText);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return null;
    const length = Math.min(suffix, size);
    return { offset: size - length, length };
  }

  const offset = Number(startText);
  if (!Number.isSafeInteger(offset) || offset >= size) return null;

  if (!endText) return { offset, length: size - offset };

  const end = Number(endText);
  if (!Number.isSafeInteger(end) || end < offset) return null;
  return { offset, length: Math.min(end, size - 1) - offset + 1 };
};

const notFound = () => new Response('Not Found', { status: 404 });
const invalidRange = (size) => new Response(null, {
  status: 416,
  headers: { 'Accept-Ranges': 'bytes', 'Content-Range': `bytes */${size}` },
});

export default {
  async fetch(request, env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD' },
      });
    }

    const key = objectKeyFromUrl(new URL(request.url));
    if (!key) return notFound();

    try {
      if (request.method === 'HEAD') {
        const object = await env.VIDEOS.head(key);
        if (!object) return notFound();

        const headers = responseHeaders();
        headers.set('Content-Length', String(object.size));
        if (object.httpEtag) headers.set('ETag', object.httpEtag);
        return new Response(null, { headers });
      }

      const rangeHeader = request.headers.get('range');
      let requestedRange = null;
      if (rangeHeader) {
        const metadata = await env.VIDEOS.head(key);
        if (!metadata) return notFound();
        requestedRange = parseRange(rangeHeader, metadata.size);
        if (!requestedRange) return invalidRange(metadata.size);
      }

      const object = await env.VIDEOS.get(key, { range: request.headers });
      if (!object) return notFound();
      if (!object.body || !Number.isSafeInteger(object.size) || object.size < 0) {
        throw new Error('Invalid R2 object response');
      }

      const headers = responseHeaders();
      headers.set('Content-Length', String(object.size));
      if (object.httpEtag) headers.set('ETag', object.httpEtag);

      if (!requestedRange) {
        return new Response(object.body, { headers });
      }

      const range = object.range;
      if (
        !range ||
        !Number.isSafeInteger(range.offset) ||
        !Number.isSafeInteger(range.length) ||
        range.offset !== requestedRange.offset ||
        range.length <= 0 ||
        range.length > requestedRange.length ||
        range.offset + range.length > object.size
      ) {
        throw new Error('Invalid R2 range response');
      }

      headers.set('Content-Length', String(range.length));
      headers.set('Content-Range', `bytes ${range.offset}-${range.offset + range.length - 1}/${object.size}`);
      return new Response(object.body, { status: 206, headers });
    } catch {
      return new Response('Internal Server Error', {
        status: 500,
        headers: { 'Cache-Control': 'no-store' },
      });
    }
  },
};
