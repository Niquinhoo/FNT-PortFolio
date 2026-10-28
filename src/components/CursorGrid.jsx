import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getCursorGridEffect } from './cursorGridEffects';

const CursorGrid = ({
  children,
  cellSize = 60,
  color = '#f43f5e',
  highlight = 'cell',
  gridStyle = 'crosses',
  radius = 140,
  holdTime = 400,
  fadeDuration = 800,
  fillOpacity = 0.06,
  gridOpacity = 0.08,
  spotlight = 0.6,
  clickPulse = false,
}) => {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let pointer = null;
    let pressedAt = 0;
    let pulseAt = 0;
    let frame = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(window.innerWidth * ratio);
      canvas.height = Math.round(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const draw = () => {
      cancelAnimationFrame(frame);
      const width = window.innerWidth;
      const height = window.innerHeight;
      context.clearRect(0, 0, width, height);
      const now = performance.now();
      const age = pointer ? now - pressedAt : fadeDuration + holdTime;
      const opacity = pointer ? (age < holdTime ? 1 : Math.max(0, 1 - (age - holdTime) / fadeDuration)) : 0;
      const pulseAge = now - pulseAt;
      const pulseEnabled = clickPulse && !prefersReducedMotion;
      const columns = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      for (let row = 0; row <= rows; row += 1) {
        for (let column = 0; column <= columns; column += 1) {
          const x = column * cellSize;
          const y = row * cellSize;
          const centerX = x + cellSize / 2;
          const centerY = y + cellSize / 2;
          const distance = pointer ? Math.hypot(centerX - pointer.x, centerY - pointer.y) : Infinity;
          const effect = getCursorGridEffect({
            distance,
            pointerAge: age,
            pulseDistance: distance,
            pulseAge: pulseEnabled ? pulseAge : 500,
            radius,
            holdTime,
            fadeDuration,
            cellSize,
            spotlight,
          });
          const amount = pointer ? effect.amount : 0;

          context.strokeStyle = color;
          context.fillStyle = color;
          context.globalAlpha = gridOpacity + amount * spotlight;
          context.beginPath();
          if (gridStyle === 'crosses') {
            context.moveTo(x + cellSize * 0.43, y + cellSize / 2);
            context.lineTo(x + cellSize * 0.57, y + cellSize / 2);
            context.moveTo(x + cellSize / 2, y + cellSize * 0.43);
            context.lineTo(x + cellSize / 2, y + cellSize * 0.57);
          } else {
            context.moveTo(x, y);
            context.lineTo(x + cellSize, y);
            context.moveTo(x, y);
            context.lineTo(x, y + cellSize);
          }
          context.stroke();

          if (highlight === 'cell' && amount) {
            context.globalAlpha = amount * fillOpacity;
            context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          }
          if (effect.inPulse) {
            context.globalAlpha = effect.pulseOpacity;
            context.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          }
        }
      }
      context.globalAlpha = 1;
      if (opacity > 0 || (pulseEnabled && pulseAge < 500)) frame = requestAnimationFrame(draw);
    };

    const move = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
      pressedAt = performance.now();
      draw();
    };
    const click = (event) => {
      if (!clickPulse || prefersReducedMotion) return;
      pointer = { x: event.clientX, y: event.clientY };
      pulseAt = performance.now();
      draw();
    };
    const leave = () => {
      pointer = null;
      draw();
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    window.addEventListener('blur', leave);
    resize();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', click);
      window.removeEventListener('blur', leave);
    };
  }, [cellSize, color, highlight, gridStyle, radius, holdTime, fadeDuration, fillOpacity, gridOpacity, spotlight, clickPulse, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {children}
    </div>
  );
};

export default CursorGrid;
