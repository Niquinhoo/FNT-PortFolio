import React from 'react';

const Archive = () => {
  return (
    <section className="py-32 max-w-7xl mx-auto px-8 bg-surface" id="archive">
      <div className="mb-16">
        <span className="font-label text-xs uppercase tracking-widest text-primary">02 — Archive</span>
        <h3 className="font-headline text-5xl font-bold mt-2 text-on-surface">Explorations & Tools</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Grid Item 1 */}
        <div className="bg-surface-container border border-outline p-10 transition-all duration-500 rounded-sm">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Open Source</span>
          <h5 className="font-headline text-2xl font-bold mt-4 mb-4 text-on-surface">Fluid Motion Library</h5>
          <p className="text-on-surface-variant font-light leading-relaxed">A lightweight React library for creating weight-based transitions and fluid layout shifts.</p>
          <div className="mt-8">
            <a className="text-xs uppercase tracking-widest font-bold border-b border-primary/30 pb-1 hover:border-primary transition-colors text-on-surface" href="#">View Github</a>
          </div>
        </div>

        {/* Grid Item 2 */}
        <div className="bg-surface-container border border-outline p-10 transition-all duration-500 rounded-sm">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Internal Tool</span>
          <h5 className="font-headline text-2xl font-bold mt-4 mb-4 text-on-surface">Prism Code Editor</h5>
          <p className="text-on-surface-variant font-light leading-relaxed">Custom browser-based markdown editor with integrated live preview for technical writers.</p>
          <div className="mt-8">
            <a className="text-xs uppercase tracking-widest font-bold border-b border-primary/30 pb-1 hover:border-primary transition-colors text-on-surface" href="#">Private Repo</a>
          </div>
        </div>

        {/* Grid Item 3 */}
        <div className="bg-surface-container border border-outline p-10 transition-all duration-500 rounded-sm">
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Experiment</span>
          <h5 className="font-headline text-2xl font-bold mt-4 mb-4 text-on-surface">Neural Canvas</h5>
          <p className="text-on-surface-variant font-light leading-relaxed">Generative art playground using Three.js and stable diffusion for unique texture mapping.</p>
          <div className="mt-8">
            <a className="text-xs uppercase tracking-widest font-bold border-b border-primary/30 pb-1 hover:border-primary transition-colors text-on-surface" href="#">Live Demo</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Archive;
