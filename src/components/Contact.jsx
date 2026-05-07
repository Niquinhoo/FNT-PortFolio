import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

const inputClass = "w-full bg-transparent border-b border-outline px-0 py-3 outline-none focus:border-primary hover:border-on-surface-variant transition-all duration-300 placeholder:text-on-surface-variant/40 text-on-surface font-label text-sm tracking-wide";

const Contact = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const stagger = (i) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      ref={containerRef}
      className="py-32 border-b border-outline relative z-10 bg-transparent"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-8 flex flex-col gap-20">

        {/* GitHub Calendar — full width */}
        <motion.div {...stagger(0)} className="flex flex-col gap-4">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Actividad en GitHub</span>
          <div className="overflow-x-auto">
            <GitHubCalendar
              username="Niquinhoo"
              colorScheme="dark"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </motion.div>

        {/* Bottom grid: header + form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

        {/* Left: Header block — mirrors About/Projects layout */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-16">
          <div>
            <motion.span {...stagger(0)} className="font-label text-xs uppercase tracking-widest text-primary block mb-6">
              05 — Contacto
            </motion.span>
            <motion.h3 {...stagger(1)} className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-surface">
              ¿Construimos<br />
              <span className="italic font-normal text-primary">algo nuevo?</span>
            </motion.h3>
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-20 h-px bg-outline mt-8"
            />
            <motion.p {...stagger(3)} className="mt-8 text-on-surface-variant text-base leading-relaxed max-w-sm">
              Contame tu idea. Disponible para proyectos freelance, full-time/part-time, pasantías, o simplemente tomar un café y charlar.
            </motion.p>
          </div>

          {/* Contact info links */}
          <motion.div {...stagger(4)} className="flex flex-col gap-4">
            {[
              { label: 'Email', value: 'nicotrib699@gmail.com', href: 'mailto:nicotrib699@gmail.com' },
              { label: 'LinkedIn', value: 'linkedin.com/in/nicolastriberti', href: 'https://www.linkedin.com/in/nicolas-triberti-224651247/' },
              { label: 'GitHub', value: 'github.com/Niquinhoo', href: 'https://github.com/Niquinhoo' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline gap-6 group"
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant w-20 shrink-0">{item.label}</span>
                <span className="font-label text-sm text-on-surface group-hover:text-primary transition-colors duration-200 relative">
                  {item.value}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: Form — separated by border like About stats */}
        <motion.div
          {...stagger(2)}
          className="lg:col-span-7 lg:border-l lg:border-outline lg:pl-16"
        >
          <form className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Nombre</label>
                <input className={inputClass} placeholder="Tu nombre" type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Email</label>
                <input className={inputClass} placeholder="tu@email.com" type="email" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Asunto</label>
              <input className={inputClass} placeholder="Sobre qué proyecto querés hablar" type="text" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Mensaje</label>
              <textarea
                className={`${inputClass} resize-none border-b`}
                placeholder="Contame los detalles..."
                rows="5"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-4 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface hover:text-primary transition-colors duration-200"
              >
                Enviar Mensaje
                <span className="inline-block w-14 h-px bg-on-surface group-hover:bg-primary group-hover:w-20 transition-all duration-300" />
              </button>
            </div>
          </form>
        </motion.div>

        </div>{/* end bottom grid */}

      </div>{/* end outer flex */}
    </section>
  );
};

export default Contact;
