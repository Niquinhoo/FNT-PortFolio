import { useEffect, useState } from 'react';
import { motion as Motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  const shadowX = useMotionValue(-100);
  const shadowY = useMotionValue(-100);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothShadowX = useSpring(shadowX, springConfig);
  const smoothShadowY = useSpring(shadowY, springConfig);

  useEffect(() => {
    const checkDesktop = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const canHover = window.matchMedia('(hover: hover)').matches;
      const isMobileWidth = window.innerWidth < 768;
      setIsDesktop(hasFinePointer && canHover && !isMobileWidth);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e) => {
      shadowX.set(e.clientX);
      shadowY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop, shadowX, shadowY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer circle */}
      <Motion.div
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
      {/* Inner dot */}
      <Motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-red-600"
        style={{
          x: shadowX,
          y: shadowY,
          translateX: '-50%',
          translateY: '-50%',
          width: 12,
          height: 12,
        }}
      />
    </>
  );
};

export default CustomCursor;
