import assert from 'node:assert/strict';
import test from 'node:test';
import { getCursorGridEffect } from '../src/components/cursorGridEffects.js';

const settings = { radius: 140, holdTime: 400, fadeDuration: 800, cellSize: 60, spotlight: 0.6 };

test('el foco cae con la distancia y se desvanece después de mantenerse', () => {
  const atPointer = getCursorGridEffect({ ...settings, distance: 0, pointerAge: 0, pulseDistance: Infinity, pulseAge: 500 });
  const afterHold = getCursorGridEffect({ ...settings, distance: 0, pointerAge: 600, pulseDistance: Infinity, pulseAge: 500 });
  const outsideRadius = getCursorGridEffect({ ...settings, distance: 140, pointerAge: 0, pulseDistance: Infinity, pulseAge: 500 });

  assert.equal(atPointer.amount, 1);
  assert.equal(afterHold.amount, 0.75);
  assert.equal(outsideRadius.amount, 0);
});

test('el pulso crece y pierde opacidad hasta desaparecer', () => {
  const start = getCursorGridEffect({ ...settings, distance: 0, pointerAge: 0, pulseDistance: 0, pulseAge: 0 });
  const middleRadius = settings.radius * 0.9;
  const middle = getCursorGridEffect({ ...settings, distance: 0, pointerAge: 0, pulseDistance: middleRadius, pulseAge: 250 });
  const finished = getCursorGridEffect({ ...settings, distance: 0, pointerAge: 0, pulseDistance: 0, pulseAge: 500 });

  assert.equal(start.inPulse, true);
  assert.equal(middle.inPulse, true);
  assert.equal(middle.pulseOpacity, settings.spotlight / 2);
  assert.equal(finished.inPulse, false);
  assert.equal(finished.pulseOpacity, 0);
});
