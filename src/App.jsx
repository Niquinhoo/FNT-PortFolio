import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Archive from './components/Archive';
import TechStack from './components/TechStack';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <Navbar />
      <Hero />
      <Projects />
      <Archive />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
