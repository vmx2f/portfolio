'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, mounted, onClose]);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Store the original body overflow value
  const bodyOverflowRef = useRef('');

  useEffect(() => {
    if (!mounted) return;

    // Store the current body overflow value
    bodyOverflowRef.current = document.body.style.overflow;

    const ctx = gsap.context(() => {
      if (isOpen) {
        // Show modal
        document.body.style.overflow = 'hidden';
        
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.3,
            ease: 'power2.out'
          }
        );

        gsap.fromTo(contentRef.current,
          { 
            y: 20, 
            opacity: 0,
            scale: 0.98
          },
          { 
            y: 0, 
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(0.4)',
            delay: 0.1
          }
        );
      } else {
        // Hide modal
        const tl = gsap.timeline({
          onComplete: () => {
            // Reset to the original overflow value
            document.body.style.overflow = bodyOverflowRef.current;
          }
        });

        tl.to(contentRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.98,
          duration: 0.2,
          ease: 'power2.in'
        });

        tl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // Ensure overflow is reset even if animation is interrupted
            document.body.style.overflow = bodyOverflowRef.current;
          }
        }, '-=0.15');
      }
    });

    // Cleanup function to ensure overflow is reset if component unmounts
    return () => {
      ctx.revert();
      document.body.style.overflow = bodyOverflowRef.current;
    };
  }, [isOpen, mounted]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          opacity: 0 
        }}
      />

      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-3xl bg-main/90 border-theme-color/50 border rounded-lg mx-2 sm:mx-5 text-theme-color p-8 shadow-2xl overflow-visible"
        style={{
          opacity: 0,
          transform: 'translateY(20px)'
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 z-20 p-2 rounded-full border border-subtle bg-theme-color/10 hover:bg-theme-color/50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-theme-color" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {children}
      </div>
    </div>,
    document.body
  );
}