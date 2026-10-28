import { motion as Motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-start justify-end px-6 sm:px-12 pb-20 sm:pb-32 lg:pb-40 bg-[#FDFBF7]/10 dark:bg-[#0a0a0a]/10 backdrop-blur-sm overflow-hidden font-sans transition-colors duration-700"
    >
      {/* ── THEME TOGGLE ── */}
      <div className="absolute top-[10%] right-[5%] sm:right-[10%] z-20">
        <button
          onClick={toggleTheme}
          className="relative w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-56 lg:h-56 flex flex-col items-center justify-center group rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FDFBF7] dark:focus-visible:ring-offset-[#0a0a0a]"
          aria-label="Toggle theme"
          aria-pressed={isDark}
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
          
          <svg 
            className="theme-toggle-svg text-[#E67E22] dark:text-[#FDFBF7] drop-shadow-2xl transition-colors duration-500" 
            width="100%" 
            height="100%" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transformOrigin: 'center', transform: isDark ? 'rotate(-20deg)' : 'rotate(0deg)' }}
          >
            <mask id="moon-mask">
              <rect x="0" y="0" width="24" height="24" fill="white" />
              <circle className="moon-mask-circle" cx={isDark ? 16 : 24} cy={isDark ? 6 : 0} r="8" fill="black" />
            </mask>
            <circle className="sun-core" cx="12" cy="12" r={isDark ? 9 : 5} mask="url(#moon-mask)" fill="currentColor" />
            <g className="sun-rays" stroke="currentColor" style={{ transformOrigin: 'center', opacity: isDark ? 0 : 1, transform: isDark ? 'rotate(45deg)' : 'rotate(0deg)' }}>
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </g>
          </svg>

          {/* Label text */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
            {/* <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gray-400 group-hover:text-[#D90429] transition-colors">
              {isDark ? 'embrace the night' : 'let there be light'}
            </span> */}
          </div>
        </button>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 w-full max-w-7xl">



        {/* Name */}
        <Motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[2rem] min-[420px]:text-[2.8rem] min-[520px]:text-[3.5rem] sm:text-[clamp(3rem,calc(10vw-12px),8rem)] leading-[0.95] sm:leading-[0.85] tracking-tight text-[#111] dark:text-[#FDFBF7] mb-4 sm:mb-8 break-words"
        >
          <span className="block sm:inline">Nicolás</span>{' '}
          <span className="block sm:inline italic font-normal text-[#D90429]">Triberti</span>
        </Motion.h1>

        {/* Separator */}
        <Motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-px bg-gray-300 mb-8"
        />

        {/* Description */}
        <Motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-inter text-gray-500 max-w-md text-sm sm:text-base leading-relaxed mb-12"
        >
          Full Stack Developer · Backend · Cloud Infrastructure · DevOps / CI/CD — Argentina
        </Motion.p>

        {/* CTA row */}
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-8"
        >
          {/* Download CV */}
          {/* <a
            href="/cv.pdf"
            download
            className="group inline-flex items-center gap-3 font-inter text-[10px] font-bold tracking-[0.22em] uppercase text-gray-700 hover:text-[#D90429] transition-colors duration-200"
          >
            Download CV
            <svg
              className="w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a> */}

          {/* Explore work */}
          <a
            href="#work"
            className="group inline-flex items-center gap-3 font-inter text-[10px] font-bold tracking-[0.22em] uppercase text-gray-700 hover:text-[#D90429] transition-colors duration-200"
          >
            Explore Work
            <div className="w-14 h-px bg-gray-300 group-hover:bg-[#D90429] transition-colors duration-200" />
          </a>

          {/* Social */}
          {/* <div className="flex gap-6 font-inter text-[10px] font-bold tracking-[0.22em] uppercase text-gray-700">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D90429] transition-colors duration-200">LinkedIn</a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#D90429] transition-colors duration-200">GitHub</a>
          </div> */}
        </Motion.div>

      </div>

      {/* ── SCROLL INDICATOR ── */}
      <Motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-6 sm:left-12"
      >
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </Motion.div>
    </section>
  );
};

export default Hero;
