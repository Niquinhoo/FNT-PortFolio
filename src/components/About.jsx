import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

const About = () => {
  return (
    <section className="py-32 bg-transparent border-b border-outline relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: Text Block */}
        <div className="lg:col-span-8 space-y-8">
          <span className="font-label text-xs uppercase tracking-widest text-primary">01 — Sobre Mí</span>
          <h2 className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-surface">
            Construyo herramientas que te ayudan con{' '}
            <span className="italic text-primary">tu tiempo</span>
          </h2>
          
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            <p>
              Soy desarrollador Fullstack orientado a UI/UX en el último año de Programador Universitario de Sistemas. Me enfoco en resolver problemas reales creando ecosistemas digitales completos y en producción (Citax, Courtix, Calma). Mi objetivo es siempre lograr el equilibrio perfecto entre un diseño intuitivo y un backend robusto y escalable.
            </p>
          </div>
        </div>

        {/* Right Side: Stats Block */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-16 lg:border-l lg:border-outline lg:pl-16">
          <div className="relative">
            <span className="block text-7xl md:text-8xl font-headline font-bold text-on-surface tracking-tighter">2+</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mt-4 block font-medium">Años de exp.</span>
          </div>
          <div className="relative">
            <span className="block text-7xl md:text-8xl font-headline font-bold text-on-surface tracking-tighter">5+</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mt-4 block font-medium">Proyectos</span>
          </div>
        </div>

        {/* GitHub Calendar — full width, centered */}
        <div className="lg:col-span-12 flex flex-col items-center gap-4 pt-8 border-t border-outline">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant self-start">Actividad en GitHub</span>
          <div className="w-full">
            <style>{`
              .react-activity-calendar {
                width: 100% !important;
              }
              .react-activity-calendar__scroll-container {
                overflow-x: visible !important;
              }
              .react-activity-calendar__calendar {
                width: 100% !important;
                height: auto !important;
              }
            `}</style>
            <GitHubCalendar
              username="Niquinhoo"
              colorScheme="dark"
              blockSize={13}
              blockMargin={4}
              fontSize={12}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;