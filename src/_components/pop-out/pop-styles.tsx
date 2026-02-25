'use client';

import { ACCENT_COLORS, useTheme } from '../contexts/theme-context'
import Popover from '../layout/pop-over';
import { Paintbrush } from 'lucide-react';
import { useExtracted } from 'next-intl';

export default function PopStyles() {
  const t = useExtracted('commons');
  const { isDarkMode, toggleDarkMode, selectedAccent, setAccent } = useTheme()

  return (
    <Popover
      mode="click"
      position="right-top"
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
          <span className="text-secondary-text text-xs mb-3 px-2 block">{t('Light/dark mode')}</span>
          <div onClick={toggleDarkMode}
            className="display-mode-button mb-2 w-full cursor-pointer py-2 bg-primary-text rounded-3xl text-main"
            aria-label="Toggle Dark Mode">
            {isDarkMode ?
              <div className='flex justify-center items-center gap-2'>
                ⚆
                <p className='text-xs font-bold'>{t('Light mode')}</p>
              </div>
              :
              <div className='flex justify-center items-center gap-2'>
                ✶
                <p className='text-xs font-bold'>{t('Dark mode')}</p>
              </div>
            }
          </div>
          <span className="text-secondary-text text-xs mb-1 px-2 block">{t('Accent color')}</span>
          <div className="grid grid-cols-5 gap-1">
            {Object.entries(ACCENT_COLORS).map(([name, hex]) => (
              <button
                key={name}
                onClick={() => setAccent(name as keyof typeof ACCENT_COLORS)}
                style={{ backgroundColor: hex }}
                className={`
              w-4 h-4 rounded-sm transition-all duration-200
              flex items-center justify-center
              border ${selectedAccent === name ? 'border-primary-text' : 'border-transparent'}
              hover:opacity-80
            `}
                aria-label={`Set ${name} accent`}
              />
            ))}
          </div>
        </div>
      </div>
    </Popover>
  )
}
