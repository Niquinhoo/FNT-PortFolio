import React, { useRef, useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { featuredProjects, sideProjects } from '../data/projectsData';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { createTimeline } from 'animejs';
import { Calendar, ShoppingCart, CloudRain, Rocket, Banknote, Dices, UserSearch } from 'lucide-react';
import MobileTimeline from './MobileTimeline';

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

const ProjectIcon = ({ title, hasHovered }) => {
  if (title.includes('Courtix')) {
    return <FootballIcon className="w-5 h-5 text-secondary group-hover:rotate-180 transition-transform duration-700" />;
  }
  if (title.includes('Citax')) {
    return <Calendar className="w-5 h-5 text-secondary group-hover:animate-[shake-calendar_0.5s_ease-in-out]" />;
  }
  if (title.includes('CalmaVM')) {
    return (
      <ShoppingCart 
        className={`w-5 h-5 text-secondary transition-all duration-700 ${hasHovered ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`} 
      />
    );
  }
  if (title.includes('WillItRain')) {
    return <CloudRain className="w-5 h-5 text-secondary transition-colors duration-300 group-hover:text-blue-400 group-hover:fill-blue-400/20" />;
  }
  if (title.includes('LaunchUI')) {
    return <Rocket className="w-5 h-5 text-secondary transition-all duration-300 group-hover:animate-[rocket-launch_1.5s_ease-in-out]" />;
  }
  if (title.includes('SplitIt')) {
    return <Banknote className="w-5 h-5 text-secondary transition-all duration-300 group-hover:animate-[rotate-360_0.7s_ease-in-out]" />;
  }
  if (title.includes('HPoker')) {
    return <Dices className="w-5 h-5 text-secondary group-hover:animate-[shake-chips_0.5s_ease-in-out]" />;
  }
  if (title.includes('VMImpostor')) {
    return <UserSearch className="w-5 h-5 text-secondary group-hover:scale-110 transition-transform duration-300" />;
  }

  // Fallback for side projects
  return <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform duration-300"></span>;
};

const BorderTrail = ({ radius = 24, isHovered }) => {
  if (!isHovered) return null;
  
  return (
    <>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500%] aspect-square z-0 pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 135deg, var(--primary) 180deg, transparent 180deg, transparent 315deg, var(--primary) 360deg)`
        }}
      />
      <div 
        className="absolute inset-[2px] bg-surface-container z-0 pointer-events-none" 
        style={{ borderRadius: `calc(${radius}px - 2px)` }}
      />
    </>
  );
};

const transforms = [
  { x: "-38vw", y: "12vh", rotate: -12, zIndex: 10, startX: "-4vw", startY: "2vh", startRotate: -3 },
  { x: "-19vw", y: "4vh", rotate: -6, zIndex: 20, startX: "-2vw", startY: "1vh", startRotate: -1.5 },
  { x: "0vw", y: "0vh", rotate: 0, zIndex: 30, startX: "0vw", startY: "0vh", startRotate: 0 },
  { x: "19vw", y: "4vh", rotate: 6, zIndex: 20, startX: "2vw", startY: "1vh", startRotate: 1.5 },
  { x: "38vw", y: "12vh", rotate: 12, zIndex: 10, startX: "4vw", startY: "2vh", startRotate: 3 },
];

const FeaturedCard = ({ project, index, scrollYProgress, onClick, selectedProjectId, activeTransitionId }) => {
  const config = transforms[index] || transforms[2];
  const x = useTransform(scrollYProgress, [0, 1], [config.startX, config.x]);
  const y = useTransform(scrollYProgress, [0, 1], [config.startY, config.y]);
  const rotate = useTransform(scrollYProgress, [0, 1], [config.startRotate, config.rotate]);
  const [hasHovered, setHasHovered] = useState(false);

  const isSelected = selectedProjectId === project.id;
  const getName = (base) => (activeTransitionId === project.id && !isSelected) ? `${base}-${project.id}` : 'none';

  return (
    <motion.div 
      className="absolute inset-0"
      style={{ 
        x, 
        y, 
        rotate, 
        zIndex: config.zIndex,
        transformOrigin: "center center" 
      }}
      whileHover={{ zIndex: 40, scale: 1.02 }}
      transition={{ 
        zIndex: { duration: 0 },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <div 
        onClick={() => onClick(project)}
        onMouseEnter={() => setHasHovered(true)}
        onMouseLeave={() => setHasHovered(false)}
        style={{ viewTransitionName: getName('project-card') }}
        className="w-full h-full bg-surface-container rounded-3xl flex flex-col group shadow-2xl cursor-pointer relative overflow-hidden border border-outline"
      >
        <BorderTrail radius={24} isHovered={hasHovered} />
        
        <div className="relative z-10 p-5 md:p-6 flex flex-col h-full">
          <div className="relative mb-6">
            <div 
              style={{ viewTransitionName: getName('project-image-container') }}
              className="w-full aspect-[4/3] overflow-hidden rounded-2xl bg-surface border border-outline relative"
            >
            {project.previewVideo ? (
              <video 
                style={{ viewTransitionName: getName('project-image') }}
                src={project.previewVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <img 
                style={{ viewTransitionName: getName('project-image') }}
                src={project.desktopImg} 
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            )}
          </div>
          <div className="absolute -bottom-3 right-4 w-10 h-10 md:w-12 md:h-12 bg-surface-container rounded-full border border-outline flex items-center justify-center shadow-lg overflow-hidden z-50">
            <ProjectIcon title={project.title} hasHovered={hasHovered} />
          </div>
        </div>
        
        <div className="px-2 flex flex-col flex-grow relative z-10">
          <span className="text-[10px] text-secondary font-label tracking-widest uppercase mb-3">0{index + 1} // {project.tags[0]}</span>
          <h4 
            style={{ viewTransitionName: getName('project-title') }}
            className="font-headline text-2xl md:text-3xl font-bold mb-3 text-on-surface leading-tight group-hover:text-secondary transition-colors"
          >
            {project.title.split(' | ')[0]}
          </h4>
          <div 
            style={{ viewTransitionName: getName('project-desc') }}
            className="flex-grow overflow-hidden"
          >
            <p className="text-on-surface-variant leading-relaxed text-xs md:text-sm line-clamp-3 md:line-clamp-4">{project.description}</p>
          </div>
          <div className="w-full h-[1px] bg-outline mt-auto mb-2"></div>
        </div>
        </div>
      </div>
    </motion.div>
  );
};

const SideProjectCard = ({ project, activeTransitionId, selectedProject, onClick }) => {
  const [hasHovered, setHasHovered] = useState(false);
  const isTransitioning = activeTransitionId === project.id && selectedProject?.id !== project.id;
  const getName = (base) => isTransitioning ? `${base}-${project.id}` : 'none';

  return (
    <div 
      onClick={() => onClick(project)}
      onMouseEnter={() => setHasHovered(true)}
      onMouseLeave={() => setHasHovered(false)}
      style={{ viewTransitionName: getName('project-card') }}
      className="border border-outline bg-surface-container rounded-2xl flex flex-col group hover:border-secondary cursor-pointer transition-all duration-300 shadow-md relative hover:z-40 hover:shadow-xl hover:shadow-secondary/10 hover:scale-[1.02] overflow-hidden"
    >
      <BorderTrail radius={16} isHovered={hasHovered} />
      
      <div className="relative z-10 p-6 flex flex-col h-full">
        <div className="relative mb-6">
          <div 
            style={{ viewTransitionName: getName('project-image-container') }}
            className="w-full aspect-video overflow-hidden rounded-xl bg-surface border border-outline relative"
          >
          {project.previewVideo ? (
            <video 
              style={{ viewTransitionName: getName('project-image') }}
              src={project.previewVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          ) : (
            <img 
              style={{ viewTransitionName: getName('project-image') }}
              src={project.desktopImg} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          )}
        </div>
        {/* Decorator for side projects */}
        <div className="absolute -bottom-3 right-4 w-10 h-10 md:w-12 md:h-12 bg-surface-container rounded-full border border-outline flex items-center justify-center shadow-lg overflow-hidden z-50">
          <ProjectIcon title={project.title} hasHovered={hasHovered} />
        </div>
      </div>
      <h4 
        style={{ viewTransitionName: getName('project-title') }}
        className="font-headline text-xl font-bold mb-3 text-on-surface group-hover:text-secondary transition-colors"
      >
        {project.title.split(' | ')[0]}
      </h4>
      <div 
        style={{ viewTransitionName: getName('project-desc') }}
        className="flex-grow mb-6"
      >
        <p className="text-on-surface-variant leading-relaxed text-sm">{project.description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, idx) => (
          <span key={idx} className="bg-surface border border-outline text-secondary px-2 py-1 font-label text-[9px] uppercase tracking-wider rounded-sm">
            {tag}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const textRef = useRef(null);
  const animeTimeline = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalReady, setIsModalReady] = useState(false);
  const [activeTransitionId, setActiveTransitionId] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const modalScrollRef = useRef(null);
  
  const scrollToTop = () => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollTo({ 
        top: modalScrollRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    animeTimeline.current = createTimeline({
      autoplay: false,
      duration: 1000,
      easing: 'linear'
    });

    animeTimeline.current
      .add({
        targets: bgRef.current,
        opacity: [0, 1],
        duration: 300,
      }, 0)
      .add({
        targets: textRef.current,
        translateY: ['-50%', '0%'],
        scale: [0.8, 3],
        opacity: [0, 0.15],
        duration: 1000,
      }, 0);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (animeTimeline.current) {
      animeTimeline.current.seek(animeTimeline.current.duration * latest);
    }
  });

  const handleSelectProject = (project) => {
    if (!document.startViewTransition) {
      setSelectedProject(project);
      setIsModalReady(true);
      return;
    }

    flushSync(() => {
      setActiveTransitionId(project.id);
    });

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setSelectedProject(project);
        setCurrentGalleryIndex(0);
        setIsModalReady(false); // Mount transparent
      });
    });

    // As soon as the transition starts (the half-second animation), we begin the blur
    transition.ready.then(() => {
      setIsModalReady(true);
    });

    transition.finished.finally(() => {
      setActiveTransitionId(null);
    });
  };

  const handleCloseModal = () => {
    if (!document.startViewTransition) {
      setSelectedProject(null);
      setIsModalReady(false);
      return;
    }

    // Force remove the blur instantly and keep the active ID for the close transition
    flushSync(() => {
      setIsModalReady(false);
      setActiveTransitionId(selectedProject.id);
    });

    // Wait slightly for the browser to paint the unblurred state before snapshotting
    setTimeout(() => {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setSelectedProject(null);
        });
      });

      transition.finished.finally(() => {
        setActiveTransitionId(null);
      });
    }, 30);
  };

  useEffect(() => {
    if (selectedProject) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0px';
    };
  }, [selectedProject]);

  return (
    <section className="bg-transparent relative z-10">
      {/* The Scroll Animation Section */}
      <div ref={containerRef} className="relative h-[400vh] w-full border-b border-outline hidden md:block">
        <div id="work" className="absolute top-[300vh]" />
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          
          {/* Animated Background */}
          <div 
            ref={bgRef}
            className="absolute inset-0 w-full h-full bg-primary opacity-0 pointer-events-none flex items-center justify-center overflow-hidden z-0"
          >
            <div 
              ref={textRef}
              className="font-headline font-black text-white whitespace-nowrap opacity-0"
              style={{ fontSize: '15vw', transformOrigin: 'center center' }}
            >
              PROYECTOS
            </div>
          </div>

          <div className="absolute top-24 w-full px-8 max-w-7xl mx-auto left-0 right-0 z-40 pointer-events-none">
            <span className="font-label text-xs uppercase tracking-widest text-secondary">02 — Producción</span>
            <h3 className="font-headline text-5xl font-bold mt-2 text-on-surface">Soluciones que llegaron a producción</h3>
          </div>

          <div className="relative w-[80vw] max-w-[320px] md:max-w-[380px] h-[480px] md:h-[560px] mt-12 md:mt-16">
            {featuredProjects.map((project, index) => (
              <FeaturedCard 
                key={project.id} 
                project={project} 
                index={index} 
                scrollYProgress={scrollYProgress} 
                selectedProjectId={selectedProject?.id}
                activeTransitionId={activeTransitionId}
                onClick={handleSelectProject}
              />
            ))}
          </div>

          <motion.div 
            className="absolute bottom-12 text-secondary font-label text-[10px] uppercase tracking-widest flex flex-col items-center gap-2"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          >
            <span>Scroll to unfold</span>
            <div className="w-[1px] h-6 bg-secondary/50 animate-bounce"></div>
          </motion.div>

        </div>
            </div>

      <MobileTimeline onProjectClick={handleSelectProject} />

      {/* Side Projects Section */
}
      <div className="py-32 border-b border-outline">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16">
            <span className="font-label text-xs uppercase tracking-widest text-secondary">03 — Creative Lab & Side Proyects</span>
            <h3 className="font-headline text-4xl font-bold mt-2 text-on-surface">Juegos y Herramientas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sideProjects.map((project) => (
              <SideProjectCard 
                key={project.id}
                project={project}
                activeTransitionId={activeTransitionId}
                selectedProject={selectedProject}
                onClick={handleSelectProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal - Rendered Conditionally without AnimatePresence */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className={`fixed inset-0 z-0 transition-all duration-700 ease-in-out ${isModalReady ? 'backdrop-blur-md bg-background/80' : 'backdrop-blur-none bg-background/0'}`}
          />
          
          <div
            style={{ viewTransitionName: `project-card-${selectedProject.id}` }}
            className="w-full max-w-[95vw] xl:max-w-[1400px] bg-surface-container border border-outline rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[400px] md:min-h-[500px] max-h-[90vh] md:max-h-[85vh] relative z-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left/Center Section: Text */}
            <div className="w-full lg:w-[40%] xl:w-[35%] relative group/scroll overflow-hidden border-r border-outline">
              {/* Scroll Nav Buttons - Centered and visible on hover */}
              <button 
                onClick={scrollToTop}
                className="hidden md:flex absolute top-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-surface-container/40 backdrop-blur-md border border-outline items-center justify-center text-secondary opacity-0 group-hover/scroll:opacity-100 hover:bg-secondary hover:text-white transition-all shadow-lg cursor-pointer"
                title="Volver arriba"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </button>

              <button 
                onClick={scrollToBottom}
                className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full bg-surface-container/40 backdrop-blur-md border border-outline items-center justify-center text-secondary opacity-0 group-hover/scroll:opacity-100 hover:bg-secondary hover:text-white transition-all shadow-lg cursor-pointer"
                title="Ir abajo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>

              <div 
                ref={modalScrollRef}
                className="w-full h-full p-5 md:p-8 lg:p-16 flex flex-col overflow-y-auto no-scrollbar"
              >
              <button 
                onClick={handleCloseModal}
                className="self-start mb-6 md:mb-12 flex items-center gap-2 md:gap-3 text-secondary hover:text-on-surface transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-secondary flex items-center justify-center group-hover:border-on-surface transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </span>
                <span className="hidden sm:inline font-label text-xs uppercase tracking-widest">Regresar a proyectos</span>
              </button>
              
              <span className="text-secondary font-label tracking-widest uppercase mb-3 md:mb-4 text-[10px] md:text-sm">{selectedProject.tags[0]}</span>
              <h2 
                style={{ viewTransitionName: `project-title-${selectedProject.id}` }}
                className="font-headline text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-8 text-on-surface leading-tight"
              >
                {selectedProject.title}
              </h2>
              
              <div 
                style={{ viewTransitionName: `project-desc-${selectedProject.id}` }}
                className="mb-6 md:mb-12"
              >
                <h4 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">Descripción</h4>
                <p className="text-on-surface-variant leading-relaxed text-sm md:text-lg">{selectedProject.description}</p>
              </div>

              {selectedProject.problemSolved && (
                <div className="mb-6 md:mb-12">
                  <h4 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">El Problema Resuelto</h4>
                  <p className="text-on-surface-variant leading-relaxed text-sm md:text-lg">{selectedProject.problemSolved}</p>
                </div>
              )}
              
              <div className="mt-auto pt-5 md:pt-8 border-t border-outline">
                <h4 className="font-label text-xs uppercase tracking-widest text-secondary mb-3 md:mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="bg-surface border border-outline text-secondary px-3 py-1.5 md:px-4 md:py-2 font-label text-[10px] md:text-xs uppercase tracking-wider rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section: Media */}
            <div className="w-full lg:w-[60%] xl:w-[65%] bg-surface relative min-h-[200px] md:min-h-[300px] border-t lg:border-t-0 lg:border-l border-outline p-2 md:p-4 lg:p-8 flex items-center justify-center">
              <div 
                style={{ viewTransitionName: `project-image-container-${selectedProject.id}` }}
                className="w-full h-full rounded-2xl overflow-hidden border border-outline relative group bg-surface-container flex items-center justify-center"
              >
                {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                  <>
                    <img 
                      style={{ viewTransitionName: `project-image-${selectedProject.id}` }}
                      src={selectedProject.gallery[currentGalleryIndex]} 
                      alt={`${selectedProject.title} gallery ${currentGalleryIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                    {/* Carousel Indicators */}
                    {selectedProject.gallery.length > 1 && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center gap-2 z-10 px-3 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/10">
                        {selectedProject.gallery.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentGalleryIndex(idx);
                            }}
                            className={`w-1.5 h-1.5 rounded-full transition-all ${
                              idx === currentGalleryIndex ? 'bg-secondary w-4' : 'bg-white/40 hover:bg-white'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Next/Prev Buttons */}
                    {selectedProject.gallery.length > 1 && (
                      <>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentGalleryIndex(prev => prev === 0 ? selectedProject.gallery.length - 1 : prev - 1);
                          }}
                          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-black/60"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentGalleryIndex(prev => prev === selectedProject.gallery.length - 1 ? 0 : prev + 1);
                          }}
                          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-black/60"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>
                      </>
                    )}
                  </>
                ) : selectedProject.previewVideo ? (
                  <video 
                    style={{ viewTransitionName: `project-image-${selectedProject.id}` }}
                    src={selectedProject.previewVideo} 
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    style={{ viewTransitionName: `project-image-${selectedProject.id}` }}
                    src={selectedProject.desktopImg} 
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
