import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { featuredProjects } from '../data/projectsData';

const timelineOrder = ['CalmaVM', 'WillItRain', 'Courtix', 'Citax', 'LaunchUI'];

const timelineProjects = timelineOrder
  .map(name => featuredProjects.find(p => p.title.includes(name)))
  .filter(Boolean);

const TimelineNode = ({ project, index, onClick }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-5 pb-16 last:pb-0"
    >
      {/* Timeline column */}
      <div className="flex flex-col items-center pt-1">
        <div className="w-[18px] h-[18px] rounded-full border-[3px] border-primary bg-surface z-10 shrink-0" />
        {index < timelineProjects.length - 1 && (
          <div className="w-[2px] flex-1 bg-primary/20 mt-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          onClick={() => onClick(project)}
          className="bg-surface-container border border-outline rounded-2xl overflow-hidden hover:border-primary transition-all shadow-md active:scale-[0.98]"
        >
          <div className="aspect-video overflow-hidden bg-surface">
            {project.previewVideo ? (
              <video src={project.previewVideo} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            ) : (
              <img src={project.desktopImg} alt={project.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="p-4">
            <span className="text-[10px] text-secondary font-label tracking-widest uppercase">
              0{index + 1} // {project.tags[0]}
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
    </motion.div>
  );
};

const MobileTimeline = ({ onProjectClick }) => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, margin: '-40px' });

  return (
    <div ref={sectionRef} className="md:hidden bg-surface py-16 border-b border-outline">
      <div className="max-w-lg mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span className="font-label text-xs uppercase tracking-widest text-secondary">
            02 — Producción
          </span>
          <h3 className="font-headline text-3xl font-bold mt-2 text-on-surface leading-tight">
            Soluciones que llegaron a producción
          </h3>
        </motion.div>

        {timelineProjects.map((project, index) => (
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
