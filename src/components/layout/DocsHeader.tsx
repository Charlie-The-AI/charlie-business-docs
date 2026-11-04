'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { CharlieLogo } from '../ui/CharlieLogo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SITE_CONFIG } from '../../lib/config';
import { useSearch } from '../../lib/searchContext';

interface DocsHeaderProps {
  onOpenSearch?: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function DocsHeader({
  onOpenSearch,
  mobileMenuOpen,
  onToggleMobileMenu,
}: DocsHeaderProps) {
  const searchCtx = useSearch();
  const handleOpenSearch = onOpenSearch ?? searchCtx.openSearch;

  return (
    <header className="sticky top-0 z-40 h-14 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-[#27272A] dark:bg-[#09090B]/95">
      <div className="mx-auto flex h-full max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile drawer toggle + Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen
                ? 'Close documentation navigation'
                : 'Open documentation navigation'
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 lg:hidden dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md dark:text-zinc-50 whitespace-nowrap shrink-0"
          >
            <CharlieLogo size={24} />
            <span>Charlie</span>
          </Link>

          <span
            aria-hidden="true"
            className="hidden sm:inline text-zinc-300 dark:text-zinc-700"
          >
            /
          </span>
          <Link
            href="/docs"
            className="hidden sm:inline text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 whitespace-nowrap shrink-0"
          >
            Docs
          </Link>
        </div>

        {/* Center: Search trigger */}
        <div className="flex flex-1 justify-center max-w-md">
          <button
            type="button"
            onClick={handleOpenSearch}
            aria-label="Search documentation (Command or Control K)"
            className="flex h-9 w-full items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500 transition-colors duration-150 hover:border-zinc-300 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200"
          >
            <span className="inline-flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">Search documentation...</span>
            </span>
            <kbd className="hidden sm:inline-block rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500 shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right: Links + Theme Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="hidden md:inline text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 whitespace-nowrap shrink-0"
          >
            Overview
          </Link>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 whitespace-nowrap shrink-0"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
