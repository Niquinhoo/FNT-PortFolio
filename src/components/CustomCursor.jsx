import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const isTouchDevice = typeof window !== 'undefined' &&
  (window.matchMedia?.('(hover: none) and (pointer: coarse)').matches ||
   'ontouchstart' in window);

const CustomCursor = () => {
  if (isTouchDevice) return null;

  // Cursor position state for the main cursor (no delay)
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for the shadow cursor (with spring physics for delay/smoothness)
  const shadowX = useMotionValue(-100);
  const shadowY = useMotionValue(-100);

  // Spring configuration for the shadow cursor delay effect
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothShadowX = useSpring(shadowX, springConfig);
  const smoothShadowY = useSpring(shadowY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      // Update immediate position for main cursor
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update motion values for delayed shadow cursor
      shadowX.set(e.clientX);
      shadowY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, shadowX, shadowY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Shadow Cursor (delayed, larger, liquid glass with solid red border) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-red-600"
        style={{
          x: smoothShadowX,
          y: smoothShadowY,
          width: 32,
          height: 32,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      
      {/* Main Cursor (immediate, smaller, solid red) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-red-600"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: 12,
          height: 12,
        }}
      />
    </>
  );
};

export default CustomCursor;
