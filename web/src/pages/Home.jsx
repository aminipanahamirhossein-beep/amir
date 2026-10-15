import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutSection from '../components/AboutSection.jsx';
import ContactCTA from '../components/ContactCTA.jsx';
import FeaturedProjects from '../components/FeaturedProjects.jsx';
import HeroSection from '../components/HeroSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import { scrollToSection } from '../lib/scroll.js';

export default function Home() {
  const { hash } = useLocation();

  // Deep links such as /#services (from another route) land on the section.
  useEffect(() => {
    if (hash) scrollToSection(hash.replace('#', ''));
  }, [hash]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedProjects />
      <ServicesSection />
      <ContactCTA />
    </>
  );
}
