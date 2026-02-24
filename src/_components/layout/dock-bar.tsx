import { motion, MotionValue, useMotionValue, useSpring, useTransform, type SpringOptions, AnimatePresence } from 'motion/react';
import React, {  cloneElement, useEffect, useRef, useState } from 'react';

export type DockItemData = {
  icon?: React.ReactNode;
  label: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(baseItemSize, spring);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };

  // Always use div as container to prevent nested buttons
  const containerRef = useRef<HTMLDivElement>(null);
  const hasChildren = React.Children.count(children) > 0;
  const isInteractive = !!onClick;

  return (
    <motion.div
      ref={containerRef}
      style={{
        width: baseItemSize,
        height: baseItemSize,
        scale: useTransform(size, [baseItemSize, magnification], [1, magnification / baseItemSize]),
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={isInteractive ? handleClick : undefined}
      role={isInteractive ? 'button' : 'group'}
      tabIndex={isInteractive ? 0 : -1}
      onKeyDown={isInteractive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      } : undefined}
      className={`relative inline-flex items-center justify-center rounded-full align-middle bg-main/90 backdrop-blur-sm hover:bg-main/40 transition-all duration-200 ease-out ${className} ${isInteractive ? 'cursor-pointer' : 'cursor-default'}`}
      aria-label={isInteractive && typeof children === 'string' ? String(children) : undefined}
    >
      {hasChildren ? (
        <>
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) return child;

            // Skip adding onClick to buttons to prevent nesting
            if (child.type === 'button' || (child as any).type?.displayName?.includes('Button')) {
              return child;
            }

            // For non-button children, clone with hover state if needed
            return cloneElement(child, { isHovered } as any);
          })}
        </>
      ) : (
        <span className="sr-only">{children}</span>
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (!isHovered) return;

    const handleHoverChange = (latest: number) => {
      setIsVisible(latest > 0);
    };

    const unsubscribe = isHovered.on('change', handleHoverChange);
    return () => unsubscribe();
  }, [isHovered]);

  if (!isMounted || !children) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={`${className} absolute -top-12 left-1/2 w-fit whitespace-nowrap rounded-md bg-theme-color/20 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white shadow-lg z-50`}
          role="tooltip"
          style={{
            x: '-50%',
            transformOrigin: 'bottom center',
            textShadow: '0 1px 2px rgba(0,0,0,0.5)'
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center align-middle ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  // Dock expansion animation values
  const dockWidth = useSpring(0, spring);
  const dockPadding = useSpring(8, spring);
  const height = useSpring(panelHeight, spring);

  // Filter out separators to calculate correct width
  const visibleItems = items.filter(item => item.label !== 'separator');
  const itemCount = visibleItems.length;
  const separatorCount = items.length - itemCount;
  

  return (
    <motion.div
      className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <motion.nav
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
          // Expand dock on hover
          dockWidth.set(40);
          dockPadding.set(16);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
          // Collapse dock when mouse leaves
          dockWidth.set(0);
          dockPadding.set(8);
        }}
        className={`${className} flex items-center gap-1 rounded-2xl bg-main/30 backdrop-blur-lg relative px-3 pointer-events-auto mb-4`}
        style={{
          height: panelHeight,
          minWidth: `calc(${itemCount * baseItemSize}px + ${(itemCount - 1) * 12}px + ${separatorCount * 12}px)`,
          width: 'auto',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => {
          // Check if this is a separator
          if (item.label === 'separator') {
            return (
              <div
                key={`separator-${index}`}
                className="h-8 w-px bg-white/20 mx-1"
              />
            );
          }

          return (
            <DockItem
              key={index}
              onClick={item.onClick}
              className={`${item.className || ''} mx-1`}
              mouseX={mouseX}
              spring={spring}
              distance={distance}
              magnification={magnification}
              baseItemSize={baseItemSize}
            >
              <DockIcon className="text-theme-color">{item.icon}</DockIcon>
              <DockLabel>{item.label}</DockLabel>
            </DockItem>
          );
        })}
      </motion.nav>
    </motion.div>
  );
}
