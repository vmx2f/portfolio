"use client";

import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';

interface Point {
  x: number;
  y: number;
}

interface SquigglyLineProps {
  className?: string;
  count?: number;
  colors?: string[];
  minSegments?: number;
  maxSegments?: number;
  speed?: number;
}

export default function SquigglyLine({
  className = '',
  count = 3,
  colors: customColors,
  minSegments = 4,
  maxSegments = 8,
  speed = 20,
}: SquigglyLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRefs = useRef<gsap.core.Tween[]>([]);

  // Helper function to generate random number in range
  const getRandom = (min: number, max: number, isInt = true) => {
    const rand = Math.random() * (max - min) + min;
    return isInt ? Math.floor(rand) : rand;
  };

  // Use theme color with Tailwind opacity classes
  const lineColors = useMemo(() => {
    if (customColors && customColors.length > 0) return customColors;

    // Use the theme color CSS variable
    const baseColor = 'var(--dynamic-accent-color)';

    // Return multiple instances of the base color - we'll use CSS opacity in the render
    return Array(5).fill(baseColor);
  }, [customColors]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    // Clear previous animations
    animationRefs.current.forEach(anim => anim.kill());
    animationRefs.current = [];

    const { width, height } = container.getBoundingClientRect();
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.style.opacity = '1';
    svg.style.zIndex = '0';

    // Clear previous SVG
    container.innerHTML = '';
    container.appendChild(svg);

    // Create squiggly lines
    for (let i = 0; i < count; i++) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const segments = getRandom(minSegments, maxSegments);
      const color = lineColors[getRandom(0, lineColors.length - 1)];

      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '1');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');

      // Initial path data
      let d = '';
      const points = [];

      // Generate random points
      for (let j = 0; j <= segments; j++) {
        const x = (width / segments) * j;
        const y = getRandom(height * 0.2, height * 0.8, false);
        points.push({ x, y } as Point);
      }

      // Create smooth curve through points
      d = `M ${points[0].x},${points[0].y} C`;
      for (let j = 1; j < points.length; j++) {
        const p = points[j];
        const prev = points[j - 1];
        const cp1x = (prev.x + p.x) / 2;
        const cp2x = (prev.x + p.x) / 2;
        d += ` ${cp1x},${prev.y} ${cp2x},${p.y} ${p.x},${p.y}`;
      }

      path.setAttribute('d', d);
      svg.appendChild(path);

      // Animate the path
      const duration = getRandom(speed * 0.8, speed * 1.2, false);
      const delay = getRandom(0, 5, false);

      const animation = gsap.to(path, {
        attr: {
          d: (function () {
            // Create a new path with slightly different y-values
            let newD = `M ${points[0].x},${points[0].y} C`;
            for (let j = 1; j < points.length; j++) {
              const p = points[j];
              const prev = points[j - 1];
              const cp1x = (prev.x + p.x) / 2;
              const cp2x = (prev.x + p.x) / 2;
              // Add some randomness to the y-values
              const yOffset = getRandom(-height * 0.1, height * 0.1, false);
              newD += ` ${cp1x},${prev.y + yOffset} ${cp2x},${p.y + yOffset} ${p.x},${p.y + yOffset}`;
            }
            return newD;
          })()
        },
        duration: duration,
        delay: delay,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        repeatRefresh: true
      });

      animationRefs.current.push(animation);
    }

    return () => {
      animationRefs.current.forEach(anim => anim.kill());
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [count, lineColors, minSegments, maxSegments, speed]);

  // Handle mouse movement speed change
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = () => {
      // Speed up animations
      animationRefs.current.forEach(anim => {
        gsap.to(anim, {
          timeScale: 5,
          duration: 0.5,
          overwrite: 'auto'
        });
      });

      // Clear existing timeout
      clearTimeout(timeoutId);

      // Set timeout to slow down when movement stops
      timeoutId = setTimeout(() => {
        animationRefs.current.forEach(anim => {
          gsap.to(anim, {
            timeScale: 1,
            duration: 1,
            overwrite: 'auto'
          });
        });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none text-theme-color ${className}`}
      aria-hidden="true"
    />
  );
}
