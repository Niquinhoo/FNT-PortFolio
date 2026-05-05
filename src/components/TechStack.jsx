import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Server, 
  Database, 
  Cpu, 
  Workflow, 
  Terminal,
  Circle
} from 'lucide-react';

const TechStack = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  const stackData = [
    {
      id: "ui-ux",
      category: "UI/UX",
      icon: <Layout className="w-4 h-4" />,
      items: ["React", "React Native", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    },
    {
      id: "api",
      category: "Api",
      icon: <Server className="w-4 h-4" />,
      items: ["Node.js", "Express.js", "Python", "Java"]
    },
    {
      id: "data",
      category: "Data",
      icon: <Database className="w-4 h-4" />,
      items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase"]
    },
    {
      id: "infra",
      category: "Infraestructura",
      icon: <Cpu className="w-4 h-4" />,
      items: ["AWS", "Docker", "Cloudflare", "GitHub Actions"]
    },
    {
      id: "auto",
      category: "Automatización",
      icon: <Workflow className="w-4 h-4" />,
      items: ["Whatsapp-API", "Langgraph", "n8n", "Openclaw", "Hermes", "Agentic LLMs"]
    }
  ];

  return (
    <section className="py-32 bg-transparent border-b border-outline relative z-10" id="process">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Columna Izquierda: Filosofía (Sticky) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:sticky md:top-32 md:h-fit"
        >
          <span className="font-label text-xs uppercase tracking-widest text-secondary inline-flex items-center gap-2">
            <span className="w-8 h-[1px] bg-secondary/30"></span>
            03 — Bases
          </span>
          <h3 className="font-headline text-5xl font-bold mt-6 text-on-surface leading-tight">
            Filosofía <br />
            <span className="text-primary italic font-serif">Técnica</span>
          </h3>
          <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-md">
            Creo en la construcción de software que se sienta como una artesanía física. Cada capa del stack se maneja con precisión, desde el esquema de la base de datos hasta las micro-interacciones.
          </p>
          
          <div className="mt-12 p-6 border border-outline/50 bg-surface-dim/30 backdrop-blur-sm rounded-2xl relative overflow-hidden group max-w-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors duration-500"></div>
            <Terminal className="w-5 h-5 text-primary mb-4" />
            <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface mb-2">Rigor Técnico</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              El código limpio no es negociable. Priorizo la escalabilidad, el rendimiento y la mantenibilidad en cada línea escrita.
            </p>
          </div>
        </motion.div>
        
        {/* Columna Derecha: Stack (Blueprint Style) */}
        <div className="space-y-16">
          {stackData.map((section) => (
            <div key={section.id} className="relative">
              <div className="flex items-center gap-4 mb-10 relative">
                <span className="p-2.5 bg-surface-bright border border-outline/50 rounded-xl text-primary relative z-10 shadow-inner">
                  {section.icon}
                </span>
                <h6 className="font-label text-sm uppercase tracking-[0.2em] text-on-surface font-semibold">
                  {section.category}
                </h6>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-outline/30 z-0"></div>
              </div>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 gap-x-1 gap-y-1 pl-4 border-l-2 border-dashed border-outline/20"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {section.items.map((tech) => (
                  <motion.div key={tech} variants={itemVariants} className="group relative">
                    <div className="relative py-4 px-5 overflow-hidden cursor-default">
                      <div className="absolute inset-0 bg-surface-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 border border-outline/50"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top z-10"></div>
                      <div className="relative z-10 flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 font-mono tracking-tight">
                          {tech}
                        </span>
                        <Circle className="w-1.5 h-1.5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0" fill="currentColor"/>
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-outline/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-5 right-5 h-[1px] bg-outline/10"></div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
