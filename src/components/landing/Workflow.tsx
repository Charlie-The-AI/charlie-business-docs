import React from 'react';
import {
  ArrowDown,
  BarChart3,
  Cpu,
  Database,
  FileSpreadsheet,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Connect your business data',
    description:
      'Query orders and customers from PostgreSQL, MySQL, MongoDB, Prisma, Drizzle, Stripe exports, or CSV files inside your own backend.',
  },
  {
    number: '02',
    title: 'Map your existing database fields',
    description:
      'Use a lightweight Data Adapter so you never have to rename columns or alter production schemas to match Charlie.',
  },
  {
    number: '03',
    title: 'Run business analytics',
    description:
      'Compute exact revenue totals, Pareto 80/20 rankings, RFM customer segments, and period trends locally in milliseconds.',
  },
  {
    number: '04',
    title: 'Optionally generate AI recommendations',
    description:
      'Pass the aggregated Business Snapshot to OpenAI, Gemini, Claude—or use the offline Mock Provider during development.',
  },
  {
    number: '05',
    title: 'Display insights in your application',
    description:
      'Render clean JSON outputs in your React admin panels, merchant portals, scheduled email digests, or conversational UI.',
  },
];

const PIPELINE_NODES = [
  {
    label: 'Your Database',
    sublabel: 'Postgres, MySQL, ORM, or JSON',
    icon: Database,
    accent: false,
  },
  {
    label: 'Data Adapter',
    sublabel: 'Maps custom fields & minor units',
    icon: FileSpreadsheet,
    accent: false,
  },
  {
    label: 'Charlie Analytics',
    sublabel: 'Revenue, Pareto, RFM & Trends',
    icon: BarChart3,
    accent: true,
  },
  {
    label: 'Business Insights',
    sublabel: 'Typed JSON Snapshot',
    icon: Cpu,
    accent: false,
  },
  {
    label: 'Optional AI Advice',
    sublabel: 'OpenAI, Gemini, Claude, or Mock',
    icon: Sparkles,
    accent: false,
  },
  {
    label: 'Your Application',
    sublabel: 'Dashboards, APIs & Reports',
    icon: LayoutDashboard,
    accent: false,
  },
];

export function Workflow() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 border-b border-zinc-200 bg-zinc-50/70 py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#111114]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left 7 columns: 5-Step Plain-English Explanation */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              How Charlie Works
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
              From raw database rows to clear business guidance in five steps
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
              Charlie runs entirely inside your application process. Your raw records stay
              under your control—no external analytics warehouse or hosted proxy required.
            </p>

            <div className="mt-10 space-y-6">
              {WORKFLOW_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-[#27272A] dark:bg-[#18181B]/70"
                >
                  <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-0.5 tabular-nums shrink-0">
                    {step.number}.
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 columns: Visual Architecture Flow Diagram */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-[#27272A] dark:bg-[#09090B]">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  Data Flow Architecture
                </h3>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  In-process execution
                </span>
              </div>

              <div className="flex flex-col items-center">
                {PIPELINE_NODES.map((node, index) => {
                  const Icon = node.icon;
                  return (
                    <React.Fragment key={node.label}>
                      <div
                        className={`flex w-full items-center gap-3.5 rounded-xl border px-4 py-3.5 ${
                          node.accent
                            ? 'border-emerald-500/50 bg-emerald-50/60 dark:border-emerald-500/40 dark:bg-emerald-950/25'
                            : 'border-zinc-200 bg-zinc-50/70 dark:border-[#27272A] dark:bg-[#18181B]/80'
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                            node.accent
                              ? 'border-emerald-500/40 bg-emerald-500 text-zinc-950'
                              : 'border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-300'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            {node.label}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400">
                            {node.sublabel}
                          </p>
                        </div>
                      </div>

                      {index < PIPELINE_NODES.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="flex h-7 items-center justify-center text-zinc-400 dark:text-zinc-600"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
