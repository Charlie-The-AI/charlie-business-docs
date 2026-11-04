import React from 'react';
import Link from 'next/link';
import { CharlieLogo } from '../ui/CharlieLogo';
import { SITE_CONFIG } from '../../lib/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-[#27272A] dark:bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
            >
              <CharlieLogo size={24} />
              <span>Charlie the Business Advisor</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A free, open-source TypeScript toolkit for calculating business revenue,
              customer behavior, Pareto distributions, RFM segmentation, and optional
              AI-assisted recommendations—with zero vendor lock-in.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Documentation
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/docs"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  Documentation Home
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/quick-start"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/adapters/overview"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  Data Adapters
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/api-reference"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Open Source
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  npm Package
                </a>
              </li>
              <li>
                <Link
                  href="/#examples"
                  className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
                >
                  Interactive Examples
                </Link>
              </li>
              <li>
                <span className="text-zinc-500 dark:text-zinc-500">
                  {SITE_CONFIG.license}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center dark:border-[#27272A] dark:text-zinc-500">
          <p>
            © {year} Charlie the Business Advisor contributors. Released under the{' '}
            {SITE_CONFIG.license}.
          </p>
          <div className="flex items-center gap-2">
            <span>Open-Source TypeScript Toolkit</span>
            <span aria-hidden="true">·</span>
            <span>No Hosted Backend Required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
