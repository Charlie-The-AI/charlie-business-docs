import React from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Camera,
  Lightbulb,
  MessageSquareText,
  PieChart,
  TrendingUp,
  Users,
} from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  wide?: boolean;
}

const FEATURES: FeatureItem[] = [
  {
    title: 'Business Analytics',
    description:
      'Calculate gross and net revenue, completed order counts, average order value, and refund ratios using exact integer minor units to avoid floating-point rounding bugs.',
    href: '/docs/analytics/revenue',
    icon: BarChart3,
    wide: true,
  },
  {
    title: 'Customer Intelligence',
    description:
      'Understand repeat buyer rates, purchase intervals, and customer lifetime spend from your existing order records.',
    href: '/docs/datasets/customers',
    icon: Users,
  },
  {
    title: 'Pareto Analysis (80/20)',
    description:
      'Identify the exact vital few customers or products generating 80% of your revenue so teams focus effort where it matters.',
    href: '/docs/analytics/pareto',
    icon: PieChart,
  },
  {
    title: 'RFM Segmentation',
    description:
      'Automatically group buyers by Recency, Frequency, and Monetary value into clear cohorts such as Champions, Loyal, and At-Risk.',
    href: '/docs/analytics/rfm',
    icon: Activity,
    wide: true,
  },
  {
    title: 'Sales Trends',
    description:
      'Compare daily, weekly, or monthly performance windows to spot momentum shifts, seasonality, and period-over-period growth.',
    href: '/docs/analytics/trends',
    icon: TrendingUp,
  },
  {
    title: 'Business Snapshots',
    description:
      'Compile a deterministic, structured JSON summary of overall business health ready for dashboards, scheduled reports, or AI context.',
    href: '/docs/analytics/snapshots',
    icon: Camera,
  },
  {
    title: 'AI Recommendations',
    description:
      'Feed computed snapshots—not raw sensitive tables—into your chosen LLM provider to receive structured, evidence-cited suggestions.',
    href: '/docs/ai/recommendations',
    icon: Lightbulb,
  },
  {
    title: 'AI Business Chat',
    description:
      'Let founders, store owners, or operators ask natural-language questions grounded in deterministic business metrics.',
    href: '/docs/ai/chat',
    icon: MessageSquareText,
  },
];

export function FeatureGrid() {
  return (
    <section
      id="features"
      className="scroll-mt-16 border-b border-zinc-200 bg-white py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#09090B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            Capabilities
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
            Deterministic analytics first. Optional AI reasoning when you want it.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
            Charlie separates exact mathematical calculations from language-model
            interpretation—so revenue numbers are always reproducible and never
            hallucinated.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.title}
                to={feature.href}
                className={`group flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/40 p-6 transition-colors duration-150 hover:border-emerald-500/40 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#18181B]/60 dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B] ${
                  feature.wide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-emerald-600 dark:border-zinc-700/80 dark:bg-[#111114] dark:text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-900 group-hover:text-emerald-700 dark:text-zinc-100 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-5 text-xs font-medium text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                  Read documentation →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
