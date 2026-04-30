import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 border-b border-outline overflow-hidden relative">

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl space-y-10 relative z-10 mix-blend-multiply"
      >
        {/* Badge */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
          <p className="font-inter text-[10px] md:text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
            Disponible para nuevas oportunidades - 2026
          </p>
        </div>
        
        {/* Title */}
        <div className="space-y-4">
          <h1 className="font-serif text-7xl md:text-[7.5rem] font-bold tracking-tight text-[#111] leading-[0.9]">
            Nicolás <br />
            <span className="italic font-normal text-[#D90429]">Triberti</span>
          </h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-mono text-lg md:text-xl text-[#E67E22] tracking-tight font-medium"
          >
            &lt;FullStack Developer /&gt;
          </motion.h2>
        </div>

        {/* Description */}
        <p className="max-w-lg mx-auto text-gray-500/90 text-sm md:text-base font-inter leading-relaxed">
          Crafting high-performance digital experiences with a focus on clean architecture, 
          scalability, and impeccable user interface design.
        </p>
        
        {/* Footer links */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between w-full max-w-lg mx-auto uppercase text-[10px] font-bold tracking-[0.2em] text-gray-700">
          
          <div className="flex items-center gap-4 cursor-pointer hover:text-black transition-colors group mb-6 sm:mb-0">
            <a href="#work">Explore Work</a>
            <div className="w-16 h-[1px] bg-gray-300 group-hover:bg-[#D90429] transition-colors"></div>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#D90429] transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-[#D90429] transition-colors">GitHub</a>
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

