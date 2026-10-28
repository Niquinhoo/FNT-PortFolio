import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TechnologyLoop from './components/TechnologyLoop';
import BlueprintBackground from './components/BlueprintBackground';

import About from './components/About';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorGrid from './components/CursorGrid';

function App() {
  const lenisRef = useRef(null);
  const handleModalChange = useCallback((isOpen) => lenisRef.current?.[isOpen ? 'stop' : 'start'](), []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothHandlers: true,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      lerp: 0.1,
      autoRaf: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    lenisRef.current = lenis;

    if (window.location.hash === '#work') {
      const target = document.querySelector('#work');
      if (target) lenis.scrollTo(target, { immediate: true });
    }

    return () => {
      lenisRef.current = null;
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen relative transition-colors duration-500">
      <CursorGrid
        cellSize={60}
        color="#f43f5e"
        highlight="cell"
        gridStyle="crosses"
        radius={140}
        holdTime={400}
        fadeDuration={800}
        fillOpacity={0.06}
        gridOpacity={0.08}
        spotlight={0.6}
        clickPulse
      >
        <BlueprintBackground isGlobal />
      </CursorGrid>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Projects onModalChange={handleModalChange} />
        <TechnologyLoop />
        <TechStack />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
