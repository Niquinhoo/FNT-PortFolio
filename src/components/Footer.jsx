import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface-container py-24 px-8 border-t border-outline">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="font-headline font-bold text-primary text-2xl tracking-tighter">FNT</div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
          {[
            { name: 'LinkedIn', url: '#' },
            { name: 'GitHub', url: '#' },
            { name: 'X / Twitter', url: '#' },
            { name: 'Email', url: 'mailto:hola@nicolas.dev' }
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
          © 2024 Nicolás Triberti. <br className="md:hidden" /> Crafted with precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

