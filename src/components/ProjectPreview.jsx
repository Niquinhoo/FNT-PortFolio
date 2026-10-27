import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const ProjectPreview = ({ src, poster, isEngaged = false, forcePlay = false, className, style }) => {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState !== 'hidden');
  const shouldPlay = isInView && isDocumentVisible && !prefersReducedMotion && (forcePlay || (isMobile ? true : isEngaged));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsDocumentVisible(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!shouldPlay) {
      videoRef.current?.pause();
      videoRef.current?.load();
      return;
    }
    videoRef.current?.play().catch(() => {});
  }, [shouldPlay]);

  return (
    <video
      ref={videoRef}
      style={style}
      src={shouldPlay ? src : undefined}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      className={className}
    />
  );
};

export default ProjectPreview;
