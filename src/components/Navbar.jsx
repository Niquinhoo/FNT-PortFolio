import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const TypingLogo = () => {
  const fullText = "FNicolasTriberti";
  const baseText = "FNT";
  const [displayText, setDisplayText] = useState(baseText);
  const [phase, setPhase] = useState('idle'); // 'idle', 'deleting_to_f', 'typing_full', 'waiting_full', 'deleting_to_base'

  useEffect(() => {
    let timeout;

    if (phase === 'idle') {
      timeout = setTimeout(() => setPhase('deleting_to_f'), 3000);
    } else if (phase === 'deleting_to_f') {
      if (displayText.length > 1) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
      } else {
        setPhase('typing_full');
      }
    } else if (phase === 'typing_full') {
      if (displayText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 80);
      } else {
        setPhase('waiting_full');
      }
    } else if (phase === 'waiting_full') {
      timeout = setTimeout(() => setPhase('deleting_to_base'), 2500);
    } else if (phase === 'deleting_to_base') {
      if (displayText.length > baseText.length) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        if (displayText === baseText) {
          setPhase('idle');
        } else {
           if (displayText.length > 0) {
             timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 50);
           } else {
             setPhase('typing_base');
           }
        }
      }
    } else if (phase === 'typing_base') {
      if (displayText.length < baseText.length) {
        timeout = setTimeout(() => setDisplayText(baseText.slice(0, displayText.length + 1)), 100);
      } else {
        setPhase('idle');
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase]);

  return (
    <div className="flex items-center gap-0.5 font-headline font-bold text-2xl tracking-tighter relative pr-8 md:pr-16 lg:pr-24">
      {/* Hidden spacer to reserve width */}
      <span className="opacity-0 pointer-events-none select-none h-0 md:h-auto overflow-hidden">
        {fullText}
      </span>
      
      {/* Absolute positioned visible text */}
      <div className="absolute left-0 flex items-center">
        <span className="text-primary whitespace-nowrap">{displayText}</span>
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
          className="w-[2px] h-6 bg-primary inline-block ml-0.5"
        />
      </div>
    </div>
  );
};


const Navbar = () => {
  const { scrollYProgress } = useScroll();
  
  // Progress value for the conic gradient border
  const progressPercent = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);
  
  // Transform the scroll position into a glowing shadow
  const boxShadow = useTransform(
    scrollYProgress,
    [0, 0.7, 1],
    [
      '0px 4px 10px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(234, 234, 234, 0.4)',
      '0px 4px 20px rgba(217, 4, 41, 0.1), 0 0 0 1px rgba(217, 4, 41, 0.2)',
      '0px 4px 30px rgba(217, 4, 41, 0.3), 0 0 0 1px rgba(217, 4, 41, 0.2)'
    ]
  );

  return (
    <motion.nav 
      style={{ boxShadow }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl rounded-full liquid-glass flex justify-between items-center px-6 md:px-10 py-4 z-[9999] transition-colors duration-300"
    >
      {/* Animated Red Border */}
      <motion.div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "conic-gradient(from 270deg at 50% 50%, #D90429 var(--progress), transparent 0)",
          padding: "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          "--progress": progressPercent,
        }}
      />

      <TypingLogo />
      
      <div className="hidden lg:flex gap-10 items-center">
        {[
          { name: 'Proyectos', href: '#work' },
          { name: 'Habilidades', href: '#process' },
          { name: 'Sobre Mí', href: '#about' }
        ].map((item, idx) => (
          <a 
            key={item.name}
            className={`text-xs uppercase tracking-[0.3em] font-label transition-all duration-300 hover:text-primary relative z-10 ${idx === 0 ? "text-secondary font-bold" : "text-on-surface-variant"}`} 
            href={item.href}
          >
            {item.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <ThemeToggle />
        <a 
          href="#contact"
          className="bg-primary text-on-primary px-8 py-2.5 text-xs font-label uppercase tracking-[0.2em] hover:bg-on-surface hover:text-surface transition-all duration-500 rounded-full shadow-md hover:shadow-primary/20"
        >
          Contacto
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;