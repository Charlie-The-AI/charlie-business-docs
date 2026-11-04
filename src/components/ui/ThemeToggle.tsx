'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../lib/theme';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-[#111114] dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100 shrink-0 ${className}`}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
