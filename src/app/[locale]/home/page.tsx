'use client';

import { useState, useEffect } from 'react';
import Projects from "@/_components/sections/projects";
import Profile from "@/_components/sections/profile";
import SpinningStar from "@/_components/layout/spinning-star";
import SpinningSpiral from "@/_components/layout/spinning-spiral";
import { useExtracted } from 'next-intl';

const SECTIONS = ['profile', 'projects'] as const;
type Section = typeof SECTIONS[number];

export default function HomePage() {
  const t = useExtracted('home')
  const [currentSection, setCurrentSection] = useState<Section>('profile');

  // Handle section changes from dock navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const section = window.location.hash.substring(1) as Section;
        if (SECTIONS.includes(section)) {
          setCurrentSection(section);
        }
      }
    };

    // Initial check
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  const sectionStyle = (section: Section) =>
    `absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-300 ${currentSection === section ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
    }`;

  return (
    <div className="relative h-screen w-full overflow-hidden">

      <SpinningStar />
      <SpinningSpiral />

      <section id="profile" className={sectionStyle('profile')}>
        <div className="w-full max-w-4xl mx-4">
          <Profile />
        </div>
      </section>

      <section id="projects" className={sectionStyle('projects')}>
        <div className="w-full max-w-4xl mx-4 mt-5 md:mt-10 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl lg:text-6xl mb-5 sticky top-0 z-20 bg-main/80 backdrop-blur-sm w-full py-4">
            {t("Projects")}
          </h2>
          <Projects />
        </div>
      </section>
    </div>
  );
}