import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import PillNav from './PillNav';
import { useTheme } from '../context/ThemeContext';

const items = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Proyectos', href: '#work' },
  { label: 'Habilidades', href: '#process' },
  { label: 'Contacto', href: '#contact' }
];

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const { isDark } = useTheme();
  const [activeHref, setActiveHref] = useState(null);
  const progressPercent = useTransform(scrollYProgress, [0, 0.9], ['0%', '100%']);

  useEffect(() => {
    let frame = 0;
    const sections = items.map(({ href }) => {
      const target = document.querySelector(href);
      return { href, section: href === '#work' ? target?.closest('section') : target };
    }).filter(({ section }) => section);

    const update = () => {
      frame = 0;
      const referenceY = window.innerHeight * 0.3;
      let next = null;
      sections.forEach(({ href, section }) => {
        if (section.getBoundingClientRect().top <= referenceY) next = href;
      });
      setActiveHref(current => current === next ? current : next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
    sections.forEach(({ section }) => observer?.observe(section));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    window.addEventListener('pageshow', schedule);
    schedule();

    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
      window.removeEventListener('pageshow', schedule);
    };
  }, []);

  return (
    <Motion.header
      className="portfolio-navbar fixed top-4 left-1/2 -translate-x-1/2 flex w-fit max-w-[calc(100vw-1rem)] items-center justify-center rounded-full px-2 py-2 z-[9999]"
    >
      <div className="relative z-10 flex w-fit max-w-full items-center justify-center">
        <div className="portfolio-navbar__pillnav min-w-0 max-w-full flex-[0_1_auto]">
          <PillNav
            className="w-fit max-w-full"
            logo={(
              <span className="flex h-full w-full min-w-0 items-center justify-center whitespace-nowrap font-headline text-[19.5px] font-bold leading-none tracking-[-0.08em]">
                <span className="inline-flex w-max shrink-0 items-center justify-center"><span className={isDark ? 'text-white' : 'text-black'}>FN</span><span className="text-primary">T</span></span>
              </span>
            )}
            logoAlt="Inicio — FNT"
            logoHref="#"
            items={items}
            theme={isDark ? 'dark' : 'light'}
            layout="split"
            itemStyle="pill"
            hoverEffect="fill"
            indicator="dot"
            surface="glass"
            size="lg"
            activeHref={activeHref}
            highlightColor={isDark ? '#F4F4F5' : '#18181B'}
            highlightTextColor={isDark ? '#121016' : '#FFFFFF'}
            collapse="auto"
            ariaLabel="Navegación principal"
            style={{
              '--progress': progressPercent,
              '--pn-pill': isDark ? '#FF1A3D' : '#D90429',
              '--pn-pill-ink': '#FFFFFF',
              '--pn-h': '54px',
              '--pn-pad': '4.5px',
              '--pn-inner': '45px',
              '--pn-x': '18px',
              '--pn-font': '19.5px',
              '--pn-gap': '9px',
              '--pn-mark': '27px'
            }}
          />
        </div>
      </div>
    </Motion.header>
  );
};

export default Navbar;
