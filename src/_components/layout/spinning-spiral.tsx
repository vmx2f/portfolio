'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SpinningSpiral() {
  const spiralRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!spiralRef.current) return;
    
    gsap.to(spiralRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      if (spiralRef.current) {
        gsap.killTweensOf(spiralRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={spiralRef}
      className="absolute top-130 -left-10 md:top-140 md:left-16 w-24 h-24 pointer-events-none text-theme-color opacity-80 hover:opacity-100 transition-opacity duration-300 z-20"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 584 556" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path 
          d="M575.014,292.226c-3.447,-160.199 -136.108,-287.271 -296.306,-283.825c-152.57,3.283 -273.592,129.626 -270.309,282.197c3.11,144.54 122.804,259.192 267.344,256.082c136.51,-2.937 244.793,-115.982 241.855,-252.492c-2.764,-128.48 -109.159,-230.393 -237.639,-227.629c-120.45,2.592 -215.993,102.337 -213.402,222.787c2.419,112.42 95.514,201.594 207.934,199.175c104.39,-2.246 187.194,-88.692 184.948,-193.082c-2.073,-96.36 -81.869,-172.795 -178.229,-170.721c-88.33,1.901 -158.395,75.047 -156.495,163.377c1.728,80.3 68.224,143.996 148.525,142.268c72.27,-1.555 129.596,-61.402 128.041,-133.672c-1.382,-64.24 -54.58,-115.196 -118.82,-113.814c-56.21,1.209 -100.797,47.757 -99.588,103.967c1.037,48.18 40.935,86.397 89.115,85.361c40.15,-0.864 71.998,-34.112 71.134,-74.262c-0.691,-32.12 -27.29,-57.598 -59.41,-56.907c-24.09,0.518 -43.199,20.467 -42.68,44.557c0.346,16.06 13.645,28.799 29.705,28.454c8.03,-0.173 14.4,-6.822 14.227,-14.852" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="16.67" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeMiterlimit="1.5"
        />
      </svg>
    </div>
  );
}
