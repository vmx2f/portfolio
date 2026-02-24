'use client'

import { useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'
import { getTechIcon } from '../layout/icon-mappings'

type Technology = {
  name: string
  url: string
}

type TechnologiesData = {
  [key: string]: Technology[] | string
  name: string
}

const GridItem = ({ 
  category, 
  onHoverStart, 
  onHoverEnd 
}: { 
  category: { key: string; name: string; technologies: Technology[] }, 
  onHoverStart: () => void, 
  onHoverEnd: () => void 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart();
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverEnd();
  };

  // Classes for the container (Fixed size, uses a min-h for grid consistency)
  const containerClasses = 'relative h-40 border border-subtle bg-main/20 hover:bg-theme-color/10 transition-all duration-300 ease-out cursor-pointer overflow-hidden';

  // Title translation logic
  const titleTransform = isHovered ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100';

  // List visibility logic
  const listOpacity = isHovered ? 'opacity-100' : 'opacity-0';

  return (
    <div>
      <div
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          className={`w-full h-full flex items-center align-middle transition-all duration-300 ease-out ${titleTransform}`}
        >
          <h3 className="text-xl font-medium text-theme-color/90 text-center w-full">
            {category.name}
          </h3>
        </div>
        
        {/* --- 2. Technologies List (Fades In) --- */}
        <div 
          className={`absolute top-0 left-0 w-full h-full p-4 flex flex-col items-center justify-center transition-opacity duration-300 ease-in ${listOpacity}`}
        >
          <h4 className="text-base font-semibold text-theme-color mb-2">{category.name}</h4>
          <div className="flex flex-wrap justify-center gap-1.5 overflow-y-auto max-h-24">
            {category.technologies.map((tech, idx) => (
              <a
                key={`${category.key}-${idx}`}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs px-2 py-1 bg-main/50 text-theme-color/80 rounded transition-colors duration-200 hover:bg-theme-color/20"
                title={tech.name}
              >
                <span className="flex-shrink-0">
                  {getTechIcon(tech.name, 'w-3.5 h-3.5 text-theme-color/90')}
                </span>
                <span className="whitespace-nowrap">{tech.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Technologies() {
  const { t } = useI18n<{ technologies: TechnologiesData }>()
  const technologies = t.technologies
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // Transform the technologies object into grid data
  const gridData = Object.entries(technologies)
    .filter(([key]) => key !== 'name')
    .map(([key, items]) => ({
      key,
      name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      technologies: Array.isArray(items) ? items : [],
    }));

  const handleHoverStart = (key: string) => {
    setHoveredItem(key);
  };

  const handleHoverEnd = () => {
    setHoveredItem(null);
  };

  return (
    <section className="w-full bg-main rounded-lg overflow-hidden" id="technologies">
      <div className="container">
        <div className="grid grid-cols-2">
          {gridData.map((category) => (
            <GridItem
              key={category.key}
              category={category}
              onHoverStart={() => handleHoverStart(category.key)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </div>
      </div>
    </section>
  )
}