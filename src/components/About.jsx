import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { featuredProjects, sideProjects } from '../data/projectsData';

const About = () => {
  return (
    <section className="py-32 bg-transparent border-b border-outline relative z-10" id="about">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Side: Text Block */}
        <div className="lg:col-span-8 space-y-8">
          <span className="font-label text-xs uppercase tracking-widest text-primary">01 — Sobre Mí</span>
          <h2 className="font-headline text-5xl md:text-6xl font-bold leading-tight text-on-surface">
            Desarrollo soluciones completas para{' '}
            <span className="italic text-primary">entornos reales</span>
          </h2>
          
          <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            <p>
              Soy desarrollador de software y estudiante avanzado de Programación Universitaria de Sistemas. Me especializo en construir soluciones completas, con un foco creciente en backend, arquitectura de servicios, infraestructura cloud, bases de datos y automatización de despliegues.
            </p>
            <p>Trabajo en proyectos que van más allá de la interfaz: diseño APIs, integro servicios externos, modelo datos, despliego aplicaciones y resuelvo problemas de rendimiento, concurrencia y operación en entornos reales.</p>
            <div className="pt-4 space-y-4">
              <h3 className="font-label text-xs uppercase tracking-widest text-primary">En qué me enfoco</h3>
              <p><strong>Backend y datos:</strong> APIs REST, lógica de negocio, integraciones, transacciones, consistencia de datos e idempotencia.</p>
              <p><strong>Cloud e infraestructura:</strong> despliegues serverless y contenedores, configuración de servicios, almacenamiento y operación sobre Linux.</p>
              <p><strong>DevOps y calidad:</strong> GitHub Actions, pipelines de CI/CD, pruebas automatizadas, observabilidad y diagnóstico de incidentes.</p>
              <p><strong>Automatización e IA:</strong> agentes conversacionales, webhooks, tareas programadas e integraciones con plataformas de mensajería.</p>
            </div>
          </div>
        </div>

        {/* Right Side: Stats Block */}
        <div className="lg:col-span-4 flex flex-col justify-center gap-16 lg:border-l lg:border-outline lg:pl-16">
          <div className="relative">
            <span className="block text-7xl md:text-8xl font-headline font-bold text-on-surface tracking-tighter">2+</span>
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant mt-4 block font-medium">Años de exp.</span>
          </div>
          <div className="relative">
            <span className="block text-7xl md:text-8xl font-headline font-bold text-on-surface tracking-tighter">{featuredProjects.length + sideProjects.length}</span>
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
