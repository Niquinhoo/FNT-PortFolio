import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, stagger } from 'animejs';

const BlueprintBackground = ({ isGlobal = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animate dashed lines flowing
    animate('.blueprint-path', {
      strokeDashoffset: [100, 0],
      easing: 'linear',
      duration: 3000,
      loop: true
    });

    // Pulse glowing nodes
    animate('.glowing-node', {
      opacity: [0.3, 1],
      scale: [0.8, 1.2],
      easing: 'easeInOutSine',
      duration: 1500,
      delay: stagger(200),
      direction: 'alternate',
      loop: true
    });

    // Float floating cursor
    animate('.floating-cursor', {
      x: [0, -20, 50, 0],
      y: [0, 30, -40, 0],
      easing: 'easeInOutQuad',
      duration: 4000,
      loop: true
    });

    // Animate Bezier handles rotating
    animate('.bezier-handle', {
      rotate: [0, 15, -15, 0],
      easing: 'easeInOutSine',
      duration: 5000,
      loop: true
    });

    // Animate Toggle Switch
    animate('.toggle-circle', {
      translateX: [0, 20, 0],
      easing: 'easeInOutExpo',
      duration: 2000,
      loop: true
    });

    // Animate Layers sliding
    animate('.layer-item', {
      translateY: (el, i) => [0, -10 * i, 0],
      opacity: [0.5, 1, 0.5],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: stagger(300),
      loop: true
    });

  }, []);

  return (
    <div ref={containerRef} className={`${isGlobal ? 'fixed' : 'absolute'} inset-0 overflow-hidden pointer-events-none z-0 opacity-60`}>
      
      {/* Noise Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.35] mix-blend-multiply pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-70" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D6CFC4" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
        
      <svg className="absolute inset-0 w-full h-full opacity-80" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        {/* Wireframe Elements */}
        <g stroke="#B8AE9D" strokeWidth="1" fill="none">
          {/* Top Left Layout */}
          <rect x="100" y="150" width="150" height="250" rx="4" />
          <line x1="100" y1="200" x2="250" y2="200" />
          <rect x="120" y="220" width="110" height="20" />
          <rect x="120" y="250" width="80" height="20" />
          
          {/* Top Right UI */}
          <rect x="750" y="100" width="150" height="150" rx="4" />
          <rect x="770" y="130" width="30" height="30" fill="#D90429" opacity="0.8" />
          <line x1="820" y1="140" x2="880" y2="140" />
          <line x1="820" y1="160" x2="860" y2="160" />
          
          {/* Right Sidebar UI */}
          <rect x="700" y="300" width="200" height="200" rx="4" />
          <circle cx="730" cy="330" r="20" />
          <line x1="750" y1="330" x2="850" y2="330" />
          <rect x="720" y="380" width="160" height="80" rx="20" />
          
          {/* Bottom Left Flowchart */}
          <rect x="150" y="700" width="100" height="60" />
          <rect x="150" y="800" width="100" height="60" />
          <rect x="150" y="900" width="100" height="60" />

          {/* New UX Elements: Color Palette */}
          <circle cx="850" cy="850" r="15" fill="#D90429" opacity="0.4" />
          <circle cx="890" cy="850" r="15" fill="#8D021F" opacity="0.4" />
          <circle cx="930" cy="850" r="15" fill="#B8AE9D" opacity="0.4" />
          
          {/* Layer Stack */}
          <g className="layer-stack" transform="translate(800, 700)">
            <rect className="layer-item" x="0" y="20" width="60" height="30" rx="2" stroke="#B8AE9D" />
            <rect className="layer-item" x="0" y="10" width="60" height="30" rx="2" stroke="#B8AE9D" />
            <rect className="layer-item" x="0" y="0" width="60" height="30" rx="2" stroke="#B8AE9D" />
          </g>

          {/* Toggle Switch */}
          <g transform="translate(450, 150)">
             <rect x="0" y="0" width="50" height="26" rx="13" stroke="#B8AE9D" />
             <circle className="toggle-circle" cx="13" cy="13" r="8" fill="#D90429" opacity="0.6" />
          </g>
        </g>

        {/* Bezier Curve & Handles */}
        <g className="bezier-handle-group" transform="translate(400, 750)">
          <path d="M 0 50 Q 50 -50 100 50" stroke="#B8AE9D" strokeWidth="1" fill="none" />
          <line x1="0" y1="50" x2="20" y2="0" stroke="#B8AE9D" strokeDasharray="2,2" className="bezier-handle" style={{transformOrigin: '0px 50px'}} />
          <line x1="100" y1="50" x2="80" y2="0" stroke="#B8AE9D" strokeDasharray="2,2" className="bezier-handle" style={{transformOrigin: '100px 50px'}} />
          <rect x="-3" y="47" width="6" height="6" fill="#B8AE9D" />
          <rect x="97" y="47" width="6" height="6" fill="#B8AE9D" />
          <circle cx="20" cy="0" r="3" fill="#D90429" className="bezier-handle" style={{transformOrigin: '0px 50px'}} />
          <circle cx="80" cy="0" r="3" fill="#D90429" className="bezier-handle" style={{transformOrigin: '100px 50px'}} />
        </g>

        {/* Connecting Paths (Animated) */}
        <g stroke="#A3A3A3" strokeWidth="1" fill="none" strokeDasharray="5,5">
          <path className="blueprint-path" d="M 250 250 Q 300 250 300 400 T 400 400" />
          <path className="blueprint-path" d="M 600 200 Q 650 200 750 200" />
          <path className="blueprint-path" d="M 600 800 Q 650 800 700 750 T 750 600" />
          <path className="blueprint-path" d="M 250 730 Q 350 730 350 600" />
          <path className="blueprint-path" d="M 250 830 Q 400 830 400 900" />
        </g>
        
        {/* Solid Red Connection */}
        <g stroke="#D90429" strokeWidth="1.5" fill="none" opacity="0.6">
           <path className="blueprint-path" d="M 750 150 L 650 150 L 650 300 L 700 300" />
        </g>

      </svg>

      {/* Heat Map Blobs (Destellos rojos) */}
      <div className="absolute top-[35%] left-[20%] w-40 h-40 bg-[#D90429] rounded-full mix-blend-multiply blur-[80px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-[25%] left-[45%] w-56 h-32 bg-[#D90429] rounded-full mix-blend-multiply blur-[90px] opacity-10 pointer-events-none"></div>
      <div className="absolute top-[25%] right-[20%] w-24 h-24 bg-[#D90429] rounded-full mix-blend-multiply blur-[70px] opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[25%] w-20 h-20 bg-[#D90429] rounded-full mix-blend-multiply blur-[60px] opacity-10 pointer-events-none"></div>
      
      {/* Floating Hand Cursor */}
      <div className="absolute top-[35%] left-[25%] floating-cursor z-10 opacity-70">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D90429" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
          <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
          <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
          <path d="M18 11a2 2 0 1 1 4 0v3.5a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8v-3.5a2 2 0 1 1 4 0" />
          <path d="M6 11v1" />
        </svg>
        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl -z-10"></div>
      </div>
      
    </div>
  );
};

export default BlueprintBackground;
