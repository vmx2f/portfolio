import React from 'react';
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";

type IconLibrary = 'si' | 'fa';

const iconLibs = {
  si: SiIcons,
  fa: FaIcons,
} as const;

export const getIcon = (iconName: string) => {
  const lib = iconName.substring(0, 2).toLowerCase() as IconLibrary;
  const Icon = iconLibs[lib]?.[iconName as keyof (typeof iconLibs)[typeof lib]] as React.ComponentType<{ className?: string }>;
  return Icon ? <Icon /> : null;
};

export const iconMap: { [key: string]: { component: string; className?: string } } = {
  // Web
  'Next': { component: 'SiNextdotjs' },
  'React': { component: 'SiReact' },
  'TypeScript': { component: 'SiTypescript' },
  'JavaScript': { component: 'SiJavascript' },
  'Tailwind CSS': { component: 'SiTailwindcss' },
  'HTML5': { component: 'SiHtml5' },
  'CSS3': { component: 'SiCss3' },
  'Angular': { component: 'SiAngular' },
  'Bootstrap': { component: 'SiBootstrap' },
  
  // Design
  'Figma': { component: 'SiFigma' },
  'Affinity Studio': { component: 'SiAffinity' },
  'Photoshop': { component: 'SiAdobephotoshop' },
  'Illustrator': { component: 'SiAdobeillustrator' },
  'Canva': { component: 'SiCanva' },
  'Krita': { component: 'SiKrita' },
  'Blender': { component: 'SiBlender' },
  
  // Mobile
  'React Native': { component: 'SiReact' },
  'Flutter': { component: 'SiFlutter' },
  
  // Backend
  'Python': { component: 'SiPython' },
  'Java': { component: 'FaJava' },
  'C#': { component: 'SiDotnet' },
  
  // Databases
  'MySQL': { component: 'SiMysql' },
  'PostgreSQL': { component: 'SiPostgresql' },
  
  // DevOps
  'Docker': { component: 'SiDocker' },
  'Git': { component: 'SiGit' },
  'GitHub': { component: 'SiGithub' },
  'Linux': { component: 'SiLinux' },
  'PowerShell': { component: 'FaTerminal' },
  
  // Game Dev
  'Unity': { component: 'SiUnity' },
  'Godot': { component: 'SiGodotengine' },
};

export const getTechIcon = (techName: string, className: string = '') => {
  const icon = iconMap[techName];
  if (!icon) return null;
  
  const IconComponent = getIcon(icon.component);
  return IconComponent ? 
    React.cloneElement(IconComponent, { 
      className: `${icon.className || ''} ${className}`.trim() 
    }) : 
    null;
};

export default {
  getIcon,
  iconMap,
  getTechIcon
};
