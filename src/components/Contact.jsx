import React from 'react';

const Contact = () => {
  return (
    <section className="py-32 max-w-4xl mx-auto px-8 text-center bg-surface" id="contact">
      <span className="font-label text-xs uppercase tracking-widest text-primary mb-4 block">Let's Talk</span>
      <h3 className="font-headline text-5xl md:text-6xl font-bold mb-12 text-on-surface">Building something new?</h3>
      
      <form className="space-y-12 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="group relative">
            <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
            <input className="w-full bg-transparent border-none border-b border-outline px-0 py-4 focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-none" placeholder="Your name" type="text"/>
          </div>
          <div className="group relative">
            <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Email</label>
            <input className="w-full bg-transparent border-none border-b border-outline px-0 py-4 focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-none" placeholder="hello@example.com" type="email"/>
          </div>
        </div>
        
        <div className="group relative">
          <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-2">Message</label>
          <textarea className="w-full bg-transparent border-none border-b border-outline px-0 py-4 focus:ring-0 focus:border-primary transition-all duration-300 placeholder:text-on-surface-variant/50 text-on-surface rounded-none" placeholder="Tell me about your project..." rows="4"></textarea>
        </div>
        
        <div className="pt-8 text-center">
          <button className="bg-primary text-on-primary px-12 py-4 font-label uppercase tracking-widest text-sm hover:bg-primary/90 transition-all duration-300 rounded-sm" type="submit">
            Send Message
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;
