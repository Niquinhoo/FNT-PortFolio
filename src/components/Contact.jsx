import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const Contact = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsEnvelopeOpen(true), 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef} 
      className="py-32 max-w-4xl mx-auto px-8 text-center bg-surface relative min-h-[700px] flex flex-col justify-start" 
      id="contact"
    >
      <span className="font-label text-xs uppercase tracking-widest text-primary mb-4 block">Hablemos</span>
      <h3 className="font-headline text-5xl md:text-6xl font-bold mb-12 text-on-surface">¿Construimos algo nuevo?</h3>

      <div className="relative w-full flex items-center justify-center mt-12 min-h-[400px]">
        <AnimatePresence mode="wait">
          {!showForm ? (
            /* --- ANIMACIÓN DEL SOBRE --- */
            <motion.div
              key="envelope-sequence"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute flex items-center justify-center w-80 h-56"
            >
              {/* Parte trasera del sobre */}
              <div className="absolute inset-0 bg-red-800 rounded-md shadow-2xl z-0" />
              
              {/* Carta interior saliendo */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={isEnvelopeOpen ? { y: -90, opacity: 1 } : { y: 10, opacity: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpen) {
                    setTimeout(() => setShowForm(true), 200); 
                  }
                }}
                className="absolute w-72 h-48 bg-white rounded border border-gray-200 flex flex-col items-start justify-start p-6 shadow-lg z-10"
              >
                 <div className="w-1/3 h-2 bg-gray-200 rounded mb-6"></div>
                 <div className="w-full h-2 bg-gray-100 rounded mb-3"></div>
                 <div className="w-full h-2 bg-gray-100 rounded mb-3"></div>
                 <div className="w-4/5 h-2 bg-gray-100 rounded"></div>
              </motion.div>

              {/* Frente del sobre */}
              <div className="absolute inset-0 z-20 pointer-events-none rounded-md overflow-hidden">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-red-600 drop-shadow-md">
                  <polygon points="0,0 50,55 100,0 100,100 0,100" fill="currentColor" />
                  <polygon points="0,0 30,35 0,100" fill="#dc2626" /> 
                  <polygon points="100,0 70,35 100,100" fill="#dc2626" /> 
                </svg>
              </div>

              {/* Solapa Superior Animada */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isEnvelopeOpen ? { rotateX: 180 } : { rotateX: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: "top", backfaceVisibility: "hidden" }}
                className="absolute top-0 left-0 w-full h-[65%] z-30"
              >
                <svg viewBox="0 0 100 65" preserveAspectRatio="none" className="w-full h-full text-red-500 drop-shadow-lg">
                  <polygon points="0,0 100,0 50,65" fill="currentColor" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" />
                </svg>
              </motion.div>
            </motion.div>
          ) : (
            /* --- FORMULARIO REAL --- */
            <motion.form 
              key="contact-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12 text-left w-full absolute top-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Nombre</label>
                  <input className="w-full bg-transparent border border-outline px-4 py-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-xl" placeholder="Tu nombre" type="text"/>
                </div>
                <div className="group relative">
                  <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Email</label>
                  <input className="w-full bg-transparent border border-outline px-4 py-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-xl" placeholder="tu@email.com" type="email"/>
                </div>
              </div>
              
              <div className="group relative">
                <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Mensaje</label>
                <textarea className="w-full bg-transparent border border-outline px-4 py-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 hover:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-xl" placeholder="Cuéntame sobre tu proyecto..." rows="4"></textarea>
              </div>
              
              <div className="pt-8 text-center">
                <button className="bg-primary text-on-primary px-12 py-4 font-label uppercase tracking-widest text-sm hover:bg-primary/90 transition-all duration-300 rounded-sm" type="submit">
                  Enviar Mensaje
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
