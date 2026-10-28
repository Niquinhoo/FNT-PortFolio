import { featuredProjects } from '../data/projectsData';
import ProjectPreview from './ProjectPreview';
import AnimatedContent from './AnimatedContent';

const TimelineNode = ({ project, index, onClick }) => {
  return (
    <AnimatedContent
      distance={40}
      className="flex gap-5 pb-16 last:pb-0"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center pt-1">
        <div className="w-[18px] h-[18px] rounded-full border-[3px] border-primary bg-surface z-10 shrink-0" />
        {index < featuredProjects.length - 1 && (
          <div className="w-[2px] flex-1 bg-primary/20 mt-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          role="button"
          tabIndex={0}
          aria-label={`Ver proyecto ${project.title.split(' | ')[0]}`}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onClick(project);
            }
          }}
          onClick={() => onClick(project)}
          className="bg-surface-container border border-outline rounded-2xl overflow-hidden hover:border-primary transition-all shadow-md active:scale-[0.98]"
        >
          <div className="aspect-video overflow-hidden bg-surface">
            {project.previewVideo ? (
              <ProjectPreview src={project.previewVideo} poster={project.desktopImg} className="w-full h-full object-cover" />
            ) : (
              <img src={project.desktopImg} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-4">
            <span className="text-[10px] text-secondary font-label tracking-widest uppercase">
              0{index + 1} // {project.id === 1 ? 'Proyecto insignia' : project.tags[0]}
            </span>
            <h4 className="font-headline text-lg font-bold mt-1 mb-1.5 text-on-surface">
              {project.title.split(' | ')[0]}
            </h4>
            <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.slice(1, 4).map((tag, i) => (
                <span key={i} className="text-[8px] font-label uppercase tracking-wider text-secondary border border-outline px-1.5 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedContent>
  );
};

const MobileTimeline = ({ onProjectClick }) => {
  return (
    <div className="md:hidden bg-surface py-16 border-b border-outline">
      <div className="max-w-lg mx-auto px-6">
        <AnimatedContent distance={40} className="mb-10">
          <span className="font-label text-xs uppercase tracking-widest text-secondary">
            02 — Producción
          </span>
          <h3 className="font-headline text-3xl font-bold mt-2 text-on-surface leading-tight">
            Soluciones que llegaron a producción
          </h3>
        </AnimatedContent>

        {featuredProjects.map((project, index) => (
          <TimelineNode
            key={project.id}
            project={project}
            index={index}
            onClick={onProjectClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileTimeline;
