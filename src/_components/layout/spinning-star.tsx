'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SpinningStar() {
  // Ref for the element being animated
  const starRef = useRef<HTMLDivElement>(null);
  // Ref to store the GSAP tween instance
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!starRef.current) return;
    
    // 1. Store the tween in a ref so we can access it later for timeScale
    tweenRef.current = gsap.to(starRef.current, {
      rotation: 360,
      duration: 15, // Normal duration
      repeat: -1,
      ease: 'none',
    });

    return () => {
      // 2. Kill the tween on unmount
      if (starRef.current) {
        gsap.killTweensOf(starRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    // 3. On mouse enter, increase the speed by setting timeScale to a higher value (e.g., 3x faster)
    if (tweenRef.current) {
      tweenRef.current.timeScale(3);
    }
  };

  const handleMouseLeave = () => {
    // 4. On mouse leave, return the speed to normal (timeScale of 1)
    if (tweenRef.current) {
      tweenRef.current.timeScale(1);
    }
  };

  return (
    // Wrap the spinning element in a div to attach event listeners
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Apply relevant positioning/styling to the wrapper
      className="absolute -right-5 md:top-10 md:right-20 w-24 h-24 z-20" 
    >
      <div 
        ref={starRef}
        // The spinning element should still have pointer-events-none so mouse events bubble up to the wrapper
        className="w-full h-full pointer-events-none text-theme-color opacity-80 hover:opacity-100 transition-opacity duration-300"
      >
        <svg 
          viewBox="0 0 667 626"
          className="w-full h-full fill-current"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M425.171,0l184.135,131.974l-92.068,125.008l148.968,47.749l-70.333,213.539l-148.968,-47.749l0,154.518l-227.603,0l0,-154.518l-148.968,47.749l-70.333,-213.539l148.968,-47.749l-92.068,-125.008l184.135,-131.974l92.068,125.008l92.068,-125.008Z" />
        </svg>
      </div>
    </div>
  );
}