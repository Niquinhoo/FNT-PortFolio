import React from 'react';

const TechStack = () => {
  return (
    <section className="py-32 bg-transparent border-b border-outline relative z-10" id="process">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="font-label text-xs uppercase tracking-widest text-secondary">03 — Foundation</span>
          <h3 className="font-headline text-5xl font-bold mt-2 text-on-surface">The Technical Philosophy</h3>
          <p className="mt-6 text-on-surface-variant text-lg leading-relaxed max-w-md">
            I believe in building software that feels like physical craft. Each layer of the stack is handled with precision, from the database schema to the micro-interactions.
          </p>
        </div>
        
        <div className="space-y-12">
          {/* Frontend */}
          <div className="border-b border-outline pb-8">
            <h6 className="font-label text-xs uppercase tracking-[0.2em] mb-4 text-primary">Frontend</h6>
            <div className="flex flex-wrap gap-4">
              <span className="font-headline text-2xl text-on-surface">React</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">TypeScript</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Next.js</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Tailwind CSS</span>
            </div>
          </div>

          {/* Backend */}
          <div className="border-b border-outline pb-8">
            <h6 className="font-label text-xs uppercase tracking-[0.2em] mb-4 text-primary">Backend</h6>
            <div className="flex flex-wrap gap-4">
              <span className="font-headline text-2xl text-on-surface">Node.js</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Python</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Go</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">PostgreSQL</span>
            </div>
          </div>

          {/* Infrastructure */}
          <div>
            <h6 className="font-label text-xs uppercase tracking-[0.2em] mb-4 text-primary">Infrastructure</h6>
            <div className="flex flex-wrap gap-4">
              <span className="font-headline text-2xl text-on-surface">AWS</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Docker</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Kubernetes</span>
              <span className="font-headline text-2xl text-on-surface-variant">/</span>
              <span className="font-headline text-2xl text-on-surface">Terraform</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
