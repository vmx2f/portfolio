'use client';

import { useState, useRef, useEffect } from 'react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  divider?: boolean;
}

interface MenuProps {
  items: MenuItem[];
  trigger: React.ReactNode;
  position?: 'left' | 'right';
}

export function Dropdown({ items, trigger, position = 'right' }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className={`absolute ${
            position === 'right' ? 'right-0' : 'left-0'
          } mt-1 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black/5 focus:outline-none z-50`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <div key={index}>
                {item.divider ? (
                  <div className="my-1 h-px bg-white/10" />
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    className="group flex w-full items-center gap-2 rounded-md px-4 py-2 text-sm text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                  >
                    <span className="w-5 text-white/50 group-hover:text-white">
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.shortcut && (
                      <span className="text-xs text-white/50 group-hover:text-white/70">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

