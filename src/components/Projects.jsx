import { useEffect, useState } from 'react';
import { featuredProjects, sideProjects } from '../data/projectsData';
import { Calendar, ShoppingCart, CloudRain, Rocket, Banknote, Dices, UserSearch } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Folder from './Folder';
import ProjectPreview from './ProjectPreview';
import AnimatedContent from './AnimatedContent';

const FootballIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="12 6 8.5 9 10 13 14 13 15.5 9" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="8.5" y1="9" x2="2.5" y2="8" />
    <line x1="15.5" y1="9" x2="21.5" y2="8" />
    <line x1="10" y1="13" x2="7" y2="19" />
    <line x1="14" y1="13" x2="17" y2="19" />
  </svg>
);

const ProjectIcon = ({ title }) => {
  const iconClass = 'w-[1.5em] h-[1.5em] text-secondary';
  if (title.includes('Courtix')) {
    return <FootballIcon className={`${iconClass} group-hover:rotate-180 transition-transform duration-700`} />;
  }
  if (title.includes('Citax')) {
    return <Calendar className={`${iconClass} group-hover:animate-[shake-calendar_0.5s_ease-in-out]`} />;
  }
  if (title.includes('Calma')) {
    return <ShoppingCart className={`${iconClass} transition-all duration-700 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100`} />;
  }
  if (title.includes('WillItRain')) {
    return <CloudRain className={`${iconClass} transition-colors duration-300 group-hover:text-blue-400 group-hover:fill-blue-400/20`} />;
  }
  if (title.includes('LaunchUI')) {
    return <Rocket className={`${iconClass} transition-all duration-300 group-hover:animate-[rocket-launch_1.5s_ease-in-out]`} />;
  }
  if (title.includes('SplitIt')) {
    return <Banknote className={`${iconClass} transition-all duration-300 group-hover:animate-[rotate-360_0.7s_ease-in-out]`} />;
  }
  if (title.includes('HPoker')) {
    return <Dices className={`${iconClass} group-hover:animate-[shake-chips_0.5s_ease-in-out]`} />;
  }
  if (title.includes('VMImpostor')) {
    return <UserSearch className={`${iconClass} group-hover:scale-110 transition-transform duration-300`} />;
  }
  return <span className="w-[0.5em] h-[0.5em] rounded-full bg-secondary group-hover:scale-150 transition-transform duration-300" />;
};

// Sizes in em: the card's font-size follows the folder scale, so it fits at any folder size.
const ProjectCard = ({ project, kicker, detail }) => {
  const name = project.title.split(' | ')[0];

  if (detail) {
    return (
      <div className="w-full h-full p-[1em] flex flex-col bg-surface-container animate-[fade_300ms_ease-out]" style={{ fontSize: 'calc(6px * var(--folder-scale))' }}>
        <div className="shrink-0 lg:aspect-video max-lg:h-[7em] overflow-hidden rounded-[0.6em] bg-surface border border-outline">
          {project.previewVideo ? (
            <ProjectPreview src={project.previewVideo} poster={project.desktopImg} className="w-full h-full object-cover" />
          ) : (
            <img src={project.desktopImg} alt={name} draggable={false} className="w-full h-full object-cover" />
          )}
        </div>
        <span className="mt-[0.7em] text-[0.55em] max-lg:text-[0.65em] text-secondary font-label tracking-widest uppercase truncate">{kicker}</span>
        <h4 className="font-headline text-[1.25em] font-bold leading-tight text-on-surface">{name}</h4>
        <p className="mt-[0.4em] text-[0.72em] max-lg:text-[0.95em] leading-snug text-on-surface-variant">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-[0.3em]">
          {project.tags.slice(1, 4).map((tag) => (
            <span key={tag} className="bg-surface border border-outline text-secondary px-[0.5em] py-[0.15em] font-label text-[0.5em] max-lg:text-[0.62em] uppercase tracking-wider rounded-sm">
              {tag}
            </span>
          ))}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="ml-auto text-secondary font-label text-[0.65em] max-lg:text-[0.8em] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            >
              Visitar sitio ↗
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="group w-full h-full p-[0.9em] flex flex-col bg-surface-container" style={{ fontSize: 'calc(6px * var(--folder-scale))' }}>
      <h4 className="font-headline text-[1.7em] font-bold leading-tight text-on-surface truncate group-hover:text-secondary transition-colors">{name}</h4>
      <span className="mt-[0.1em] mb-[0.6em] text-[0.95em] max-lg:text-[1.15em] text-secondary font-label tracking-widest uppercase truncate">{kicker}</span>
      <div className="relative flex-1 min-h-0 overflow-hidden rounded-[0.6em] bg-surface border border-outline">
        <img src={project.desktopImg} alt="" draggable={false} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
        <span className="absolute bottom-[0.6em] right-[0.6em] w-[2.8em] h-[2.8em] bg-surface-container rounded-full border border-outline flex items-center justify-center shadow-lg overflow-hidden">
          <ProjectIcon title={project.title} />
        </span>
      </div>
    </div>
  );
};

const measureFolder = () => {
  const width = document.documentElement.clientWidth;
  // 224 x 196 are the Folder's unscaled extents; 48 and 160 leave room for page padding and the heading.
  return { size: Math.min(2.4, (width - 48) / 224, (window.innerHeight - 160) / 196), draggable: width >= 1024 };
};

const ProjectFolder = ({ label, projects, kickerOf }) => {
  const { isDark } = useTheme();
  const [fit, setFit] = useState(measureFolder);
  const [focused, setFocused] = useState(-1);

  useEffect(() => {
    const onResize = () => setFit(measureFolder());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="flex justify-center">
      <Folder
        label={label}
        // Folder parses these on a canvas, so CSS variables would not resolve: same values as index.css.
        color={isDark ? '#FF1A3D' : '#D90429'}
        paperColor={isDark ? '#151515' : '#FFFFFF'}
        theme={isDark ? 'dark' : 'light'}
        size={fit.size}
        layout="scatter"
        draggable={fit.draggable}
        onItemFocus={setFocused}
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} kicker={kickerOf(project, index)} detail={focused === index} />
        ))}
      </Folder>
    </div>
  );
};

const Projects = () => (
  <section className="bg-transparent relative z-20 overflow-x-clip">
    <div id="work" className="projects-anchor" aria-hidden="true" />

    <div className="py-24 md:py-32 border-b border-outline">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <AnimatedContent distance={40} className="mb-10 md:mb-16">
          <span className="font-label text-xs uppercase tracking-widest text-secondary">02 — Producción</span>
          <h3 className="font-headline text-3xl md:text-5xl font-bold mt-2 text-on-surface">Soluciones que llegaron a producción</h3>
        </AnimatedContent>
        <ProjectFolder
          label="Producción"
          projects={featuredProjects}
          kickerOf={(project, index) => `0${index + 1} // ${project.id === 1 ? 'Proyecto insignia' : project.tags[0]}`}
        />
      </div>
    </div>

    <div className="py-24 md:py-32 border-b border-outline">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <AnimatedContent distance={40} className="mb-10 md:mb-16">
          <span className="font-label text-xs uppercase tracking-widest text-secondary">03 — Creative Lab & Side Projects</span>
          <h3 className="font-headline text-3xl md:text-4xl font-bold mt-2 text-on-surface">Juegos y herramientas</h3>
        </AnimatedContent>
        <ProjectFolder
          label="Creative Lab"
          projects={sideProjects}
          kickerOf={(project) => project.tags[0]}
        />
      </div>
    </div>
  </section>
);

export default Projects;
