import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, LockOpen, Package, ServerOff, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../../lib/config';

const OPEN_SOURCE_PILLARS = [
  {
    title: 'Completely free & MIT licensed',
    description:
      'Use Charlie in commercial SaaS products, client builds, and internal company dashboards with zero licensing fees.',
    icon: LockOpen,
  },
  {
    title: 'No Charlie-hosted backend',
    description:
      'Analytics execute locally inside your Node.js or TypeScript runtime. Your customer orders never transit a third-party Charlie server.',
    icon: ServerOff,
  },
  {
    title: 'No vendor lock-in',
    description:
      'Swap between OpenAI, Gemini, Claude, or run strictly deterministic math with no AI provider configured at all.',
    icon: ShieldCheck,
  },
  {
    title: 'Developer-controlled data',
    description:
      'Decide exactly which fields are mapped and whether aggregated snapshots are shared with an LLM.',
    icon: Package,
  },
];

export function FinalCTA() {
  return (
    <>
      {/* Section 9: Open Source */}
      <section className="border-b border-zinc-200 bg-zinc-50/70 py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#111114]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Open Source Philosophy
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
                Built for developers. Open to everyone.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                Business intelligence primitives shouldn&apos;t require shipping sensitive
                order tables to opaque SaaS black boxes. Inspect every formula, adapter,
                and prompt template directly in TypeScript.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={SITE_CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-[#27272A] dark:bg-[#18181B] dark:text-zinc-100 dark:hover:bg-zinc-800 whitespace-nowrap shrink-0"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                </a>
                <a
                  href={SITE_CONFIG.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-[#27272A] dark:bg-[#18181B] dark:text-zinc-100 dark:hover:bg-zinc-800 whitespace-nowrap shrink-0"
                >
                  <span>View on npm</span>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
              {OPEN_SOURCE_PILLARS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-[#27272A] dark:bg-[#18181B]/70"
                  >
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-emerald-600 dark:border-zinc-700 dark:bg-[#111114] dark:text-emerald-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Final CTA */}
      <section className="bg-white py-20 sm:py-24 dark:bg-[#09090B]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
            Ready to understand your business data?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
            Install Charlie, connect your data, and start discovering meaningful business
            insights.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/docs/quick-start"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 whitespace-nowrap shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/docs"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#18181B] dark:text-zinc-100 dark:hover:bg-zinc-800 whitespace-nowrap shrink-0"
            >
              Read the Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
