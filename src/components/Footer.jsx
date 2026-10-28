import React from 'react';
import AnimatedContent from './AnimatedContent';

const Footer = () => {
  return (
    <footer className="bg-surface-container py-24 px-8 border-t border-outline">
      <AnimatedContent distance={40} threshold={0} className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="font-headline font-bold text-primary text-2xl tracking-tighter">Facundo Nicolás Triberti</div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {[
            { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nicolas-triberti-224651247/' },
            { name: 'GitHub', url: 'https://github.com/Niquinhoo' },
            { name: 'Portfolio', url: 'https://niquinhoo.github.io/FNT-PortFolio/' },
            { name: 'Email', url: 'mailto:nicotrib699@gmail.com' }
          ].map(link => (
            <a 
              key={link.name}
              className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-all duration-300 relative group" 
              href={link.url}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="font-label text-[10px] md:text-xs uppercase tracking-[0.3em] text-on-surface-variant/60 text-center md:text-right">
          © 2026 Facundo Nicolás Triberti.
        </div>
      </AnimatedContent>
    </footer>
  );
};

export default Footer;

