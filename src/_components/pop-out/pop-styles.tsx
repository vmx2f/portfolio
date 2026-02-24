'use client';

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import { ACCENT_COLORS } from '../../contexts/theme-context'
import Popover from '../layout/pop-over';
import { Paintbrush } from 'lucide-react';

export default function PopStyles() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const [selectedAccent, setSelectedAccent] = useState('')
  const [isStylesOpen, setIsStylesOpen] = useState(false);

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <Image
      src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjAiIGhlaWdodD0iMCIgcj0iMiIgeT0iMiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRkZGRkIiBzdHJva2Utd2lkdGg9IjAiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
      width={36}
      height={36}
      sizes="36x36"
      alt="Loading Light/Dark Toggle"
      priority={false}
      title="Loading Light/Dark Toggle"
    />
  )

  return (
    <Popover
      mode="click"
      position="right-top"
      onOpenChange={setIsStylesOpen}
      trigger={({ onClick }) => (
        <div
          className="flex items-center justify-center w-full h-full rounded-full hover:bg-theme-color/10"
          onClick={onClick}
        >
          <Paintbrush size={20} />
        </div>
      )}
    >
      <div className="p-4 bg-main/90 backdrop-blur-lg rounded-lg shadow-lg border border-subtle/50 mb-4">
        <div className="p-4 rounded-md relative">
          <span className="text-secondary-text text-xs mb-3 px-2 block">Light/Dark Mode</span>
          <div onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="display-mode-button mb-2 w-full cursor-pointer py-2 bg-primary-text rounded-3xl text-main"
            aria-label="Toggle Dark Mode">
            {resolvedTheme === 'dark' ?
              <div className='flex justify-center items-center gap-2'>
                ⚆
                <p className='text-xs font-bold'>Light mode</p>
              </div>
              :
              <div className='flex justify-center items-center gap-2'>
                ✶
                <p className='text-xs font-bold'>Dark mode</p>
              </div>
            }
          </div>
          <span className="text-secondary-text text-xs mb-1 px-2 block">Accent Color</span>
          <div className="grid grid-cols-5 gap-1">
            {Object.entries(ACCENT_COLORS).map(([name, hex]) => (
              <button
                key={name}
                onClick={() => setSelectedAccent(name as keyof typeof ACCENT_COLORS)}
                className={`
              w-4 h-4 rounded-sm transition-all duration-200
              flex items-center justify-center
              ${selectedAccent === name ? 'border-accent' : 'border-transparent'}
              hover:opacity-80
            `}
              />
            ))}
          </div>
        </div>
      </div>
    </Popover>





  )
}