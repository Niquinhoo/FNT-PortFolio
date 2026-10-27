import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const ProjectPreview = ({ src, poster, className, style }) => {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef);
  const prefersReducedMotion = useReducedMotion();
  const [isDocumentVisible, setIsDocumentVisible] = useState(() => document.visibilityState !== 'hidden');
  const shouldPlay = isInView && isDocumentVisible && !prefersReducedMotion;

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
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
};

export default ProjectPreview;
