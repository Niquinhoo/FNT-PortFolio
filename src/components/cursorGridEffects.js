export function getCursorGridEffect({ distance, pointerAge, pulseDistance, pulseAge, radius, holdTime, fadeDuration, cellSize, spotlight }) {
  const highlightFade = Math.max(0, 1 - Math.max(0, pointerAge - holdTime) / fadeDuration);
  const amount = Math.max(0, 1 - distance / radius) * highlightFade;
  const pulseActive = pulseAge >= 0 && pulseAge < 500;
  const pulseRadius = pulseActive ? (pulseAge / 500) * radius * 1.8 : 0;

  return {
    amount,
    inPulse: pulseActive && Math.abs(pulseDistance - pulseRadius) < cellSize * 0.7,
    pulseOpacity: pulseActive ? (1 - pulseAge / 500) * spotlight : 0,
  };
}
