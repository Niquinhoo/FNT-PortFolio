import { useState } from 'react';
import { Bot, ChartNoAxesCombined, FlaskConical, ListChecks, Network, Pause, Play, Webhook, Workflow, Zap } from 'lucide-react';
import { FaAws } from 'react-icons/fa';
import { GrOracle } from 'react-icons/gr';
import {
  SiCloudflare, SiCloudflareworkers, SiDocker, SiExpress, SiGit, SiGithubactions, SiJavascript,
  SiLinux, SiMysql, SiNodedotjs, SiPostgresql, SiPrisma, SiReact,
  SiTailwindcss, SiTidb, SiTypescript, SiVite, SiVultr, SiWhatsapp
} from 'react-icons/si';
import { technologies } from '../data/technologies';
import LogoLoop from './LogoLoop';

const icons = {
  'Node.js': [SiNodedotjs, '#5FA04E'],
  TypeScript: [SiTypescript, '#3178C6'],
  JavaScript: [SiJavascript, '#F7DF1E'],
  Express: [SiExpress, '#888888'],
  'APIs REST': [Network],
  Prisma: [SiPrisma, '#5A67D8'],
  PostgreSQL: [SiPostgresql, '#4169E1'],
  MySQL: [SiMysql, '#4479A1'],
  TiDB: [SiTidb, '#ED1944'],
  'Cloudflare D1': [SiCloudflare, '#F38020'],
  'Cloudflare Workers': [SiCloudflareworkers, '#F38020'],
  'Cloudflare R2': [SiCloudflare, '#F38020'],
  Docker: [SiDocker, '#2496ED'],
  Linux: [SiLinux, '#FCC624'],
  'AWS EC2/S3': [FaAws, '#FF9900'],
  'VULTR Cloud Compute': [SiVultr, '#007BFC'],
  'Oracle OCI': [GrOracle, '#F80000'],
  Git: [SiGit, '#F05032'],
  'GitHub Actions': [SiGithubactions, '#2088FF'],
  'CI/CD': [Workflow],
  Testing: [FlaskConical],
  Linting: [ListChecks],
  Observabilidad: [ChartNoAxesCombined],
  Webhooks: [Webhook],
  'WhatsApp APIs': [SiWhatsapp, '#25D366'],
  'Modelos de IA': [Bot],
  Automatizaciones: [Zap],
  React: [SiReact, '#61DAFB'],
  Vite: [SiVite, '#646CFF'],
  'Tailwind CSS': [SiTailwindcss, '#06B6D4']
};

const logos = Object.values(technologies).flat().map((title) => {
  const [Icon, hoverColor] = icons[title];
  return { title, node: <Icon size="1em" aria-hidden="true" />, hoverColor };
});

const TechnologyLoop = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className="border-b border-outline bg-surface-bright/40 py-8" aria-label="Tecnologías">
      <div className="flex w-full items-center justify-between gap-4 px-8 pb-5">
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Tecnologías</span>
        <button
          type="button"
          onClick={() => setIsPlaying((playing) => !playing)}
          aria-label={isPlaying ? 'Pausar movimiento de tecnologías' : 'Reanudar movimiento de tecnologías'}
          className="inline-flex items-center gap-2 rounded-sm font-label text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          {isPlaying ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
          {isPlaying ? 'Pausar' : 'Reanudar'}
        </button>
      </div>
      <LogoLoop
        logos={logos}
        speed={isPlaying ? 60 : 0}
        direction="left"
        logoHeight={38}
        gap={52}
        hoverSpeed={0}
        scaleOnHover
        labels="below"
        intro={false}
        fadeOutWidth={0.08}
        ariaLabel="Tecnologías y herramientas"
      />
    </section>
  );
};

export default TechnologyLoop;
