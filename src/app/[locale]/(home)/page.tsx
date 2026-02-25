'use client';

import { useState, useEffect } from 'react';
import Profile from "@/_components/sections/profile";
import Projects from "@/_components/sections/projects";
import { useExtracted } from 'next-intl';

export default function HomePage() {
  const t = useExtracted('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const threshold = window.innerHeight * 0.55;
      const progress = Math.min(window.scrollY / threshold, 1);
      setScrollProgress(progress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  return (
    <div className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen overflow-hidden">
        <section
          id="profile"
          className="absolute inset-0 z-10 flex h-full w-full items-center justify-center transition-opacity duration-100"
          style={{ opacity: 1 - scrollProgress }}
        >
          <div className="w-full max-w-4xl mx-4">
            <Profile />
          </div>
        </section>
      </div>
    </div>
  );
}
