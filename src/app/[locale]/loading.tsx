"use client";

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black">
      <svg 
        viewBox="0 0 630 630" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32 md:w-48 md:h-48"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .animated-logo path {
            --fill-color: white;
            fill: var(--fill-color);
            stroke: var(--fill-color);
            stroke-width: 4;
            stroke-linejoin: round;
            fill-opacity: 0;
            stroke-dasharray: var(--length);
            stroke-dashoffset: var(--length);
            animation: 
                draw 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards, 
                fillIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }

          /* Right diagonal shape */
          .animated-logo path:nth-of-type(1) {
            --length: 1320;
            animation-delay: 0.25s, 1s;
          }

          /* Left vertical stem */
          .animated-logo path:nth-of-type(2) {
            --length: 1300;
            animation-delay: 0.15s, 0.9s;
          }

          /* Top left triangle */
          .animated-logo path:nth-of-type(3) {
            --length: 330;
            animation-delay: 0s, 0.8s;
          }

          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }

          @keyframes fillIn {
            to { fill-opacity: 1; }
          }

          /* Accessibility: skip animations for users who prefer reduced motion */
          @media (prefers-reduced-motion: reduce) {
            .animated-logo path {
                animation: none !important;
                fill-opacity: 1 !important;
                stroke-dashoffset: 0 !important;
            }
          }
        `}} />
        
        <g className="animated-logo">
          <path d="M293.049 342.99L453.036 41.5113H577L293.049 582V342.99Z"/>
          <path d="M168.313 582L168.313 41.511H276.779L276.778 582L168.313 582Z"/>
          <path d="M49 41H152.043V127.913L49 41Z"/>
        </g>
      </svg>
    </div>
  );
}