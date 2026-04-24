import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <header className="bg-surface min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 border-b border-outline overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl space-y-10 relative z-10"
      >
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p className="font-label text-xs md:text-sm uppercase tracking-[0.4em] text-on-surface-variant/80">
            Disponible para nuevas oportunidades - 2026
          </p>
        </div>
        
        <div className="space-y-4">
          <h1 className="font-headline text-7xl md:text-9xl font-black tracking-tight text-on-surface leading-[0.9]">
            Nicolás <br />
            <span className="italic font-light text-primary">Triberti</span>
          </h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-xl md:text-2xl text-secondary tracking-tight font-medium"
          >
            &lt;FullStack Developer /&gt;
          </motion.h2>
        </div>

        <p className="max-w-2xl mx-auto text-on-surface-variant text-lg md:text-xl font-light leading-relaxed">
          Crafting high-performance digital experiences with a focus on clean architecture, 
          scalability, and impeccable user interface design.
        </p>
        
        <div className="pt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          <a className="inline-flex items-center gap-4 text-on-surface font-label uppercase tracking-[0.2em] text-sm group" href="#work">
            <span>Explore Work</span>
            <div className="relative flex items-center">
              <div className="w-12 h-[1px] bg-outline group-hover:w-16 group-hover:bg-primary transition-all duration-500"></div>
              <div className="w-1 h-1 rounded-full bg-primary absolute right-0 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            </div>
          </a>
          
          <div className="w-[1px] h-8 bg-outline hidden md:block"></div>
          
          <div className="flex gap-6">
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-xs uppercase tracking-widest">LinkedIn</a>
            <a href="#" className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-xs uppercase tracking-widest">GitHub</a>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-outline to-transparent"></div>
      </motion.div>
    </header>
  );
};

export default Hero;

