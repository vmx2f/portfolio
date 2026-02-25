'use client';

import Projects from "@/_components/sections/projects";
import { useExtracted } from 'next-intl';

export default function HomePage() {
  const t = useExtracted('home');

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <section id="projects" className="absolute inset-0 w-full h-full flex items-center justify-center opacity-100 z-10">
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
