'use client';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export default function CursorFollower() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const lastMoveTime = useRef(Date.now());
  const idleTimer = useRef<number | undefined>(undefined);
  
  // Create motion values for smooth animation
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring config for main cursor (inner dot) - snappy and precise
  const mainSpringConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, mainSpringConfig);
  const cursorYSpring = useSpring(cursorY, mainSpringConfig);
  
  // Spring config for trailing circle - slightly delayed and more fluid
  const trailSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };
  const trailXSpring = useSpring(cursorXSpring, trailSpringConfig);
  const trailYSpring = useSpring(cursorYSpring, trailSpringConfig);

  // Update cursor position
  const updateCursorPosition = (x: number, y: number) => {
    cursorX.set(x);
    cursorY.set(y);
    lastMoveTime.current = Date.now();
    
    // Reset idle timer
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(checkIdle, 100);
    
    if (!isVisible) setIsVisible(true);
  };
  
  const checkIdle = () => {
    const timeSinceLastMove = Date.now() - lastMoveTime.current;
    if (timeSinceLastMove > 1000) {
      setIsVisible(false);
    } else {
      idleTimer.current = window.setTimeout(checkIdle, 100);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseEnter = () => {
    setIsVisible(true);
    lastMoveTime.current = Date.now();
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
  };

  // Initial setup and cleanup
  useEffect(() => {
    // Initialize cursor position (center screen) but keep invisible until movement
    const initPosition = () => {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      cursorX.set(x);
      cursorY.set(y);
      trailXSpring.set(x);
      trailYSpring.set(y);
    };
    
    initPosition();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Size constants in pixels for precise positioning
  const cursorSize = 12;   // 12px (inner dot)
  const trailSize = 52;    // 52px (outer circle)
  const halfCursor = cursorSize / 2;
  const halfTrail = trailSize / 2;

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden hidden md:block">
      {/* Outer circle (trailing) */}
      <motion.div
        className={[
          'absolute w-[52px] h-[52px] rounded-full border-3 border-theme-color',
          'pointer-events-none transition-opacity duration-200 ease-out',
          isVisible ? 'opacity-50' : 'opacity-0'
        ].join(' ')}
        style={{
          x: useMotionTemplate`calc(${trailXSpring}px - ${halfTrail}px)`,
          y: useMotionTemplate`calc(${trailYSpring}px - ${halfTrail}px)`,
          left: 0,
          top: 0,
        }}
      />
      
      {/* Inner dot (leading) */}
      <motion.div
        ref={cursorRef}
        className={[
          'absolute w-3 h-3 rounded-full pointer-events-none',
          'bg-theme-color transition-opacity duration-200 ease-out',
          isVisible ? 'opacity-100' : 'opacity-0'
        ].join(' ')}
        style={{
          x: useMotionTemplate`calc(${cursorXSpring}px - ${halfCursor}px)`,
          y: useMotionTemplate`calc(${cursorYSpring}px - ${halfCursor}px)`,
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}