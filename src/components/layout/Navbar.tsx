import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { CharlieLogo } from '../ui/CharlieLogo';
import { ThemeToggle } from '../ui/ThemeToggle';
import { SITE_CONFIG } from '../../lib/config';

interface NavbarProps {
  onOpenSearch: () => void;
}

export function Navbar({ onOpenSearch }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorNav = (hash: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/${hash}`);
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 h-14 w-full border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-[#27272A] dark:bg-[#09090B]/90">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand mark + single-line wordmark */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md dark:text-zinc-50 whitespace-nowrap shrink-0"
        >
          <CharlieLogo size={24} />
          <span>Charlie</span>
        </Link>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          <button
            type="button"
            onClick={() => handleAnchorNav('#features')}
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Features
          </button>
          <button
            type="button"
            onClick={() => handleAnchorNav('#how-it-works')}
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </button>
          <Link
            to="/docs"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Documentation
          </Link>
          <button
            type="button"
            onClick={() => handleAnchorNav('#examples')}
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Examples
          </button>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            GitHub
          </a>
        </nav>

        {/* Zone 3: Utilities + Primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search documentation"
            className="hidden sm:inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-xs text-zinc-500 transition-colors duration-150 hover:border-zinc-300 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-200 whitespace-nowrap shrink-0"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search docs</span>
            <kbd className="ml-1 rounded border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
              ⌘K
            </kbd>
          </button>

          <ThemeToggle />

          <Link
            to="/docs/quick-start"
            className="hidden sm:inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white transition-colors duration-150 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 whitespace-nowrap shrink-0"
          >
            Get Started
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-700 md:hidden dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-200 shrink-0"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 py-4 md:hidden dark:border-[#27272A] dark:bg-[#09090B]">
          <div className="flex flex-col space-y-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-left text-sm text-zinc-600 dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-300"
            >
              <Search className="h-4 w-4" />
              <span>Search documentation...</span>
            </button>
            <button
              type="button"
              onClick={() => handleAnchorNav('#features')}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Features
            </button>
            <button
              type="button"
              onClick={() => handleAnchorNav('#how-it-works')}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              How It Works
            </button>
            <Link
              to="/docs"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Documentation
            </Link>
            <button
              type="button"
              onClick={() => handleAnchorNav('#examples')}
              className="rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Examples
            </button>
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              GitHub
            </a>
            <div className="pt-2">
              <Link
                to="/docs/quick-start"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-full items-center justify-center rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-zinc-950"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
