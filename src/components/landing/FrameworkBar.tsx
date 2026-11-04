import React from 'react';
import { Link } from 'react-router-dom';

const FRAMEWORKS = [
  {
    name: 'Node.js',
    monogram: 'JS',
    detail: 'Native ESM & CJS',
    href: '/docs/frameworks/nodejs',
  },
  {
    name: 'TypeScript',
    monogram: 'TS',
    detail: 'Strict type definitions',
    href: '/docs/quick-start',
  },
  {
    name: 'NestJS',
    monogram: 'NS',
    detail: 'Injectable services',
    href: '/docs/frameworks/nestjs',
  },
  {
    name: 'Next.js',
    monogram: 'NX',
    detail: 'Server Components & APIs',
    href: '/docs/frameworks/nextjs',
  },
  {
    name: 'React',
    monogram: 'RC',
    detail: 'Dashboard UI consumption',
    href: '/docs/frameworks/react',
  },
  {
    name: 'Laravel',
    monogram: 'LV',
    detail: 'Via Node.js runtime bridge',
    href: '/docs/frameworks/laravel',
  },
];

export function FrameworkBar() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/70 py-12 dark:border-[#27272A] dark:bg-[#111114]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Works across modern JavaScript &amp; backend stacks
            </h2>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Run Charlie directly in TypeScript/Node.js runtimes. Laravel applications
              integrate via a lightweight Node.js companion service rather than importing
              npm packages directly into PHP.
            </p>
          </div>
          <Link
            to="/docs/frameworks/nodejs"
            className="text-xs font-medium text-emerald-700 hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300 whitespace-nowrap shrink-0"
          >
            Explore framework guides →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {FRAMEWORKS.map((fw) => (
            <Link
              key={fw.name}
              to={fw.href}
              className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 transition-colors duration-150 hover:border-emerald-500/40 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#18181B]/70 dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B]"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 font-mono text-xs font-semibold text-zinc-800 group-hover:border-emerald-500/30 group-hover:text-emerald-600 dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-200 dark:group-hover:text-emerald-400">
                {fw.monogram}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {fw.name}
                </p>
                <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                  {fw.detail}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
