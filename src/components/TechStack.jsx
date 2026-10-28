import React from 'react';
import { Server, Cloud, Workflow, Bot, Layout, Check } from 'lucide-react';
import AnimatedContent from './AnimatedContent';
import { technologies } from '../data/technologies';

const skills = [
  {
    id: 'backend', index: '01', icon: Server, title: 'Backend', accent: 'y datos',
    description: 'APIs REST, lógica de negocio, transacciones y consistencia de datos con idempotencia.',
    items: technologies.backend,
    span: 'lg:col-span-7', visual: 'terminal',
  },
  {
    id: 'infra', index: '02', icon: Cloud, title: 'Cloud e', accent: 'infraestructura',
    description: 'Despliegues y contenedores, almacenamiento y operación sobre Linux.',
    items: technologies.cloud,
    span: 'lg:col-span-5', visual: 'nodes',
  },
  {
    id: 'devops', index: '03', icon: Workflow, title: 'DevOps y', accent: 'calidad',
    description: 'Pipelines de CI/CD, pruebas automatizadas, observabilidad y diagnóstico de incidentes.',
    items: technologies.devops,
    span: 'lg:col-span-5', visual: 'pipeline',
  },
  {
    id: 'automation', index: '04', icon: Bot, title: 'Automatización', accent: 'e IA',
    description: 'Agentes conversacionales, webhooks y tareas programadas integradas con mensajería.',
    items: technologies.automation,
    span: 'lg:col-span-7', visual: 'chat',
  },
];

const frontend = technologies.frontend;
const totalTech = skills.reduce((total, skill) => total + skill.items.length, 0) + frontend.length;

const TerminalVisual = () => (
  <div className="rounded-xl border border-outline bg-surface-dim/60 overflow-hidden" aria-hidden="true">
    <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-outline/70">
      <span className="w-2 h-2 rounded-full bg-outline" /><span className="w-2 h-2 rounded-full bg-outline" /><span className="w-2 h-2 rounded-full bg-outline" />
      <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">orders.service</span>
    </div>
    <div className="px-4 py-3.5 font-mono text-[10px] sm:text-[12px] leading-6 text-on-surface-variant">
      <p><span className="text-primary font-medium">POST</span>{' '}<span className="text-on-surface">/api/orders</span></p>
      <p>Idempotency-Key: 9f2c-41ab</p>
      <p><span>←</span>{' '}<span className="text-primary font-medium">201</span>{' '}<span className="text-on-surface">Created</span><span> · 12ms</span><span className="inline-block w-[7px] h-[13px] bg-primary/80 ml-2 align-middle motion-safe:animate-pulse" /></p>
    </div>
  </div>
);

const NodesVisual = () => (
  <div className="rounded-xl border border-outline bg-surface-dim/60 px-4 py-3" aria-hidden="true">
    <svg viewBox="0 0 360 120" className="w-full h-auto" fill="none">
      <g stroke="var(--on-surface-variant)" strokeWidth="1" strokeDasharray="4 4" opacity="0.45">
        <path className="skills-dash" d="M78 60 H138" /><path className="skills-dash" d="M222 60 C250 60 250 28 278 28" /><path className="skills-dash" d="M222 60 C250 60 250 92 278 92" />
      </g>
      {[
        { x: 8, y: 44, w: 70, label: 'Client' },
        { x: 138, y: 44, w: 84, label: 'Linux', primary: true },
        { x: 278, y: 14, w: 74, label: 'App' },
        { x: 278, y: 78, w: 74, label: 'Datos' },
      ].map((node) => (
        <g key={node.label}>
          <rect x={node.x} y={node.y} width={node.w} height="32" rx="6" fill={node.primary ? 'var(--primary-container)' : 'var(--surface-bright)'} stroke={node.primary ? 'var(--primary)' : 'var(--blueprint-stroke)'} strokeWidth="1" />
          <text x={node.x + node.w / 2} y={node.y + 20} textAnchor="middle" fontFamily="'Fira Code', monospace" fontSize="11" fill={node.primary ? 'var(--on-primary-container)' : 'var(--on-surface-variant)'}>{node.label}</text>
        </g>
      ))}
      <circle cx="138" cy="60" r="3" fill="var(--primary)" />
    </svg>
  </div>
);

const PipelineVisual = () => (
  <div className="rounded-xl border border-outline bg-surface-dim/60 px-3 sm:px-5 py-5" aria-hidden="true">
    <div className="flex items-center">
      {['commit', 'lint', 'test', 'build', 'deploy'].map((step, index, steps) => {
        const last = index === steps.length - 1;
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center gap-2.5">
              <span className={`relative flex items-center justify-center w-6 h-6 rounded-full border ${last ? 'bg-primary border-primary text-on-primary' : 'bg-surface-bright border-outline text-on-surface-variant'}`}>
                {last && <span className="absolute inset-0 rounded-full bg-primary/40 motion-safe:animate-ping" />}
                <Check className="w-3 h-3 relative" strokeWidth={2.5} />
              </span>
              <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.03em] sm:tracking-[0.15em] text-on-surface-variant">{step}</span>
            </div>
            {!last && <span className="flex-1 h-px border-t border-dashed border-on-surface-variant/40 mx-0.5 sm:mx-1 -mt-5" />}
          </React.Fragment>
        );
      })}
    </div>
  </div>
);

const ChatVisual = () => (
  <div className="rounded-xl border border-outline bg-surface-dim/60 px-4 py-4 space-y-2.5" aria-hidden="true">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant"><span>webhook · whatsapp</span><span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary motion-safe:animate-pulse" />agente activo</span></div>
    <div className="w-fit max-w-[88%] rounded-lg rounded-bl-sm border border-outline bg-surface-bright px-3.5 py-2 text-[13px] text-on-surface-variant font-body">Hola, ¿tenés un turno mañana a las 17?</div>
    <div className="w-fit max-w-[88%] ml-auto rounded-lg rounded-br-sm bg-primary-container px-3.5 py-2 text-[13px] text-on-primary-container font-body">Sí, te reservé mañana a las 17 h. Te aviso por acá antes del turno.</div>
  </div>
);

const visuals = { terminal: TerminalVisual, nodes: NodesVisual, pipeline: PipelineVisual, chat: ChatVisual };
const Chip = ({ children }) => (
  <span className="relative inline-flex items-center gap-2 overflow-hidden rounded-md border border-outline bg-surface px-3 py-1.5 font-mono text-[13px] tracking-tight text-on-surface-variant transition-colors duration-300 hover:border-primary/40 hover:text-on-surface cursor-default">
    {children}
  </span>
);

const Corners = () => (
  <>
    <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-outline" />
    <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-outline" />
  </>
);

const weeklyActivity = [
  { day: 'Lun', count: 12 },
  { day: 'Mar', count: 18 },
  { day: 'Mié', count: 14 },
  { day: 'Jue', count: 21 },
  { day: 'Vie', count: 16 },
  { day: 'Sáb', count: 20 },
  { day: 'Dom', count: 24 },
];

const upcomingAppointments = [
  { time: '15:30', name: 'Lucía M.', status: 'Confirmado' },
  { time: '16:00', name: 'Mateo R.', status: 'Confirmado' },
  { time: '17:00', name: 'Sofía L.', status: 'Pendiente' },
];

const FrontendVisual = () => (
  <div className="relative w-full rounded-xl border border-outline bg-surface-dim/50 p-3 sm:p-4 space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
      <h4 className="font-headline text-base font-semibold text-on-surface">Panel de turnos</h4>
      <span className="font-label text-[9px] uppercase tracking-[0.14em] text-on-surface-variant">Vista de ejemplo · datos ficticios</span>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {[
        { label: 'Turnos de hoy', value: '24' },
        { label: 'Confirmados', value: '18' },
        { label: 'Pendientes', value: '6' },
      ].map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-outline/70 bg-surface-bright/70 px-3 py-2 sm:block">
          <span className="font-label text-[9px] uppercase tracking-[0.12em] text-on-surface-variant">{label}</span>
          <span className="font-mono text-lg font-semibold text-on-surface sm:block sm:mt-1">{value}</span>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <section className="md:col-span-7 min-w-0 rounded-lg border border-outline/70 bg-surface-bright/50 p-3">
        <h5 className="font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">Actividad semanal</h5>
        <div
          role="group"
          aria-label={`Actividad semanal: ${weeklyActivity.map(({ day, count }) => `${day} ${count}`).join(', ')} turnos; total 125, con 24 turnos hoy.`}
          className="mt-3 flex h-24 items-end gap-1.5"
        >
          {weeklyActivity.map(({ day, count }) => {
            const tooltipPosition = day === 'Lun' ? 'left-0' : day === 'Dom' ? 'right-0' : 'left-1/2 -translate-x-1/2';
            return (
              <div key={day} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1">
                <div
                  role="img"
                  aria-label={`${day}: ${count} turnos`}
                  tabIndex={0}
                  className="group/bar relative flex w-full max-w-5 items-end justify-center rounded-t-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute ${tooltipPosition} bottom-full z-10 mb-1 whitespace-nowrap rounded border border-outline bg-surface-bright px-2 py-1 font-mono text-[9px] text-on-surface opacity-0 shadow-sm transition-opacity pointer-events-none group-hover/bar:opacity-100 group-focus-visible/bar:opacity-100`}
                  >
                    {day} · {count} turnos
                  </span>
                  <span
                    aria-hidden="true"
                    className={`w-full rounded-t-sm transition-colors ${day === 'Dom' ? 'bg-primary' : 'bg-primary/20'} group-hover/bar:bg-primary group-focus-visible/bar:bg-primary`}
                    style={{ height: `${(count / 24) * 58}px` }}
                  />
                </div>
                <span className="font-mono text-[8px] text-on-surface-variant">{day}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="md:col-span-5 min-w-0 rounded-lg border border-outline/70 bg-surface-bright/50 p-3">
        <h5 className="font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant">Próximos turnos</h5>
        <ul className="mt-2 divide-y divide-outline/60">
          {upcomingAppointments.map(({ time, name, status }) => (
            <li key={time} className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-2 py-2 first:pt-1 last:pb-0">
              <span className="pt-0.5 font-mono text-[10px] text-on-surface-variant">{time}</span>
              <span className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-xs font-medium text-on-surface">{name}</span>
                <span className={`rounded px-1.5 py-0.5 font-label text-[8px] uppercase tracking-[0.08em] ${status === 'Confirmado' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-dim text-on-surface-variant'}`}>{status}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </div>
);

const TechStack = () => {
  return (
    <section id="process" className="py-32 bg-transparent border-b border-outline relative z-10 min-w-0 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-8">
        <style>{`@keyframes skills-dash { to { stroke-dashoffset: -16; } } .skills-dash { animation: skills-dash 1.2s linear infinite; } @media (prefers-reduced-motion: reduce) { .skills-dash { animation: none; } }`}</style>
        <AnimatedContent distance={40} className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10 lg:mb-16">
        <div className="space-y-6 max-w-3xl min-w-0">
          <span className="font-label text-xs uppercase tracking-widest text-primary inline-flex items-center gap-2"><span className="w-8 h-px bg-primary/30" />05 — Skills</span>
          <h2 className="font-headline text-[clamp(1.7rem,5.5vw,3.75rem)] font-bold leading-tight text-on-surface">Lo que construyo,<br /><span className="italic text-primary font-serif">despliego y opero</span></h2>
          <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl">Del endpoint a la infraestructura: sistemas completos pensados para producción.</p>
        </div>
        <div className="font-mono text-xs tracking-tight text-on-surface-variant border border-outline bg-surface-bright/70 backdrop-blur-sm rounded-md px-4 py-3 self-start lg:self-end"><span className="text-primary">{skills.length + 1}</span> áreas<span className="mx-2 text-outline">/</span><span className="text-primary">{totalTech}</span> tecnologías</div>
        </AnimatedContent>
        <div className="grid grid-cols-1 grid-flow-dense lg:grid-cols-12 gap-5">
        {skills.map((skill) => {
          const { id, index, icon: Icon, title, accent, description, items, span, visual } = skill;
          const Visual = visuals[visual];
          return (
            <AnimatedContent key={id} distance={40} className={`min-w-0 ${span}`}>
            <article
              className="group relative h-full overflow-hidden rounded-2xl border border-outline bg-surface-bright/80 backdrop-blur-sm p-5 sm:p-8 flex flex-col min-w-0"
            >
              <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
              <Corners />
              <div className="relative flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <span className="p-2.5 bg-surface-bright border border-outline/50 rounded-xl text-primary shadow-inner"><Icon className="w-4 h-4" /></span>
                <span className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-semibold">Área</span>
                <span className="flex-1 h-px bg-outline/60" />
                <span className="font-mono text-xs text-on-surface-variant">{index}</span>
              </div>
              <h3 className="relative font-headline text-2xl sm:text-3xl font-bold text-on-surface leading-tight">
                {title}{' '}<span className="italic font-serif font-normal text-primary">{accent}</span>
              </h3>
              <p className="relative mt-3 text-sm leading-relaxed text-on-surface-variant max-w-md">{description}</p>
              <div className="relative mt-7"><Visual /></div>
              <div className="relative mt-7 flex flex-wrap gap-2 pt-6 sm:pt-7 border-t border-dashed border-outline">
                {items.map((tech) => <Chip key={tech}>{tech}</Chip>)}
              </div>
            </article>
            </AnimatedContent>
          );
        })}
        <AnimatedContent distance={40} className="lg:col-span-12 min-w-0">
        <article className="group relative overflow-hidden rounded-2xl border border-outline bg-surface-bright/80 backdrop-blur-sm p-4 sm:p-6 flex flex-col gap-5 min-w-0">
          <Corners />
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-b border-outline/60 pb-5">
            <div className="flex items-center gap-4 shrink-0">
              <span className="p-2.5 bg-surface-bright border border-outline/50 rounded-xl text-primary shadow-inner"><Layout className="w-4 h-4" /></span>
              <h3 className="font-headline text-2xl font-bold text-on-surface"><span className="italic font-serif font-normal text-primary">Frontend</span></h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {frontend.map((tech) => <Chip key={tech}>{tech}</Chip>)}
            </div>
          </div>
          <FrontendVisual />
        </article>
        </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
