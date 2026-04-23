import React from 'react';

const About = () => {
  return (
    <section className="py-32 bg-surface border-b border-outline" id="about">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: Text Block */}
        <div className="lg:col-span-8 space-y-8">
          <span className="font-label text-xs uppercase tracking-widest text-primary">04 — Identity</span>
          <h3 className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-surface">Sobre Mí</h3>
          
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            <p>
              Soy desarrollador Fullstack de Villa Mercedes, Argentina. Actualmente me encuentro en el último año de la carrera de Programador Universitario de Sistemas, especializándome en crear productos donde el diseño de interfaz y la automatización se encuentran.
            </p>
            <p>
              Mi enfoque está en resolver problemas reales mediante el desarrollo de ecosistemas digitales completos: desde la lógica de Citax y Courtix, hasta la gestión de stock en Calma y la creación de landing pages de alto impacto.
            </p>
            <p>
              Tener proyectos en producción utilizados por clientes reales me ha dado una perspectiva práctica del software: entiendo que un buen diseño debe ser intuitivo para el usuario y robusto en su backend para ser escalable.
            </p>
            <p className="font-label text-sm uppercase tracking-[0.2em] text-primary font-bold pt-4">
              Disponible para proyectos freelance y remote positions.
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
      </div>
    </section>
  );
};

export default About;