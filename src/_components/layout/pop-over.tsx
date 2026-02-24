'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

interface PopoverProps {
  trigger: ReactNode | ((props: { onClick: (e: React.MouseEvent) => void }) => ReactNode);
  children: ReactNode;
  mode?: 'hover' | 'click';
  position?: 'right-top' | 'left-top' | 'right-bottom' | 'left-bottom' | 'top-center' | 'top-right' | 'bottom-center';
  onOpenChange?: (isOpen: boolean) => void;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  mode = 'hover',
  position = 'right-top',
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTriggerEnter = () => {
    if (mode === 'hover') {
      setIsOpen(true);
    }
  };

  const handleTriggerLeave = () => {
    if (mode === 'hover') {
      setIsOpen(false);
    }
  };

  const handleTriggerClick = (event: React.MouseEvent) => {
    if (mode === 'click') {
      event.stopPropagation(); // Chaos prevention
      setIsOpen((prev) => !prev);
    }
  };

  // Notify parent of state changes
  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  // Animation effect
  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.fromTo(contentRef.current,
          {
            y: 10,
            opacity: 0,
            scale: 0.98
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(0.4)'
          }
        );
      } else {
        gsap.to(contentRef.current, {
          y: 10,
          opacity: 0,
          scale: 0.98,
          duration: 0.2,
          ease: 'power2.in'
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mode === 'click' && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mode]);

  const getPositionClasses = () => {
    switch (position) {
      case 'left-top': return 'bottom-full left-0 mb-2';
      case 'left-bottom': return 'top-full left-0 mt-2';
      case 'right-top': return 'bottom-full right-0 mb-2';
      case 'right-bottom': return 'top-full right-0 mt-2';
      case 'top-center': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'top-right': return 'bottom-full right-0 mb-2';
      case 'bottom-center': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      default: return 'top-full right-0 mt-2';
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={handleTriggerEnter}
      onMouseLeave={handleTriggerLeave}
      onClick={handleTriggerClick}
    >
      {typeof trigger === 'function'
        ? trigger({
          onClick: (e: React.MouseEvent) => {
            e.stopPropagation();
            handleTriggerClick(e);
          }
        })
        : trigger}
      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute
            ${getPositionClasses()}
            bg-primary rounded-lg z-50 min-w-max`
          }
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;