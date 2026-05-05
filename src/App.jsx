import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import BlueprintBackground from './components/BlueprintBackground';

import TechStack from './components/TechStack';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

function App() {
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
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container min-h-screen relative transition-colors duration-500">
      <CustomCursor />
      <BlueprintBackground isGlobal={true} />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Projects />
        <TechStack />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
