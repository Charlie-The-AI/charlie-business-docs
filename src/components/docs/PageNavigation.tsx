import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export interface NavPageLink {
  title: string;
  href: string;
  group?: string;
}

interface PageNavigationProps {
  prev?: NavPageLink;
  next?: NavPageLink;
}

export function PageNavigation({ prev, next }: PageNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Documentation pagination"
      className="mt-14 grid grid-cols-1 gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-[#27272A]"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 transition-colors duration-150 hover:border-emerald-500/50 hover:bg-zinc-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#111114] dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B]"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
            Previous
          </span>
          <span className="mt-1.5 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end rounded-xl border border-zinc-200 bg-white p-4 text-right transition-colors duration-150 hover:border-emerald-500/50 hover:bg-zinc-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#111114] dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B]"
        >
          <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            Next
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1.5 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </nav>
  );
}
