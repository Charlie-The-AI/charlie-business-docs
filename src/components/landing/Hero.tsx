import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Lightbulb,
  Terminal,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SITE_CONFIG } from '../../lib/config';

const HERO_TREND_DATA = [
  { month: 'May', revenue: 18400 },
  { month: 'Jun', revenue: 21200 },
  { month: 'Jul', revenue: 19850 },
  { month: 'Aug', revenue: 24600 },
  { month: 'Sep', revenue: 29450 },
  { month: 'Oct', revenue: 35420 },
];

const HERO_TOP_PRODUCTS = [
  { name: 'Annual Team Workspace Plan', orders: 412, share: '41.8%', revenue: '$62,240' },
  { name: 'Automated Invoicing Add-on', orders: 589, share: '26.4%', revenue: '$39,310' },
  { name: 'Priority Onboarding Package', orders: 194, share: '16.2%', revenue: '$24,125' },
];

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = SITE_CONFIG.installCommands.npm;

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = installCmd;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white pt-14 pb-20 sm:pt-20 sm:pb-28 dark:border-[#27272A] dark:bg-[#09090B]">
      {/* Subtle architectural radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.10),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.13),transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Proposition */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            <span>100% Free &amp; Open Source</span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">TypeScript Toolkit</span>
            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
              ·
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">MIT Licensed</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-zinc-950 dark:text-[#FAFAFA] [text-wrap:balance]">
            Your business data has a story.{' '}
            <span className="text-emerald-600 dark:text-emerald-400">
              Let Charlie tell it.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-[#A1A1AA] [text-wrap:balance]">
            Add business analytics and AI-powered insights to your applications.
            Understand revenue, customers, sales trends, and growth opportunities with a
            free, open-source toolkit.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/docs/quick-start"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 whitespace-nowrap shrink-0"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white px-5 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#18181B] dark:text-zinc-100 dark:hover:bg-zinc-800 whitespace-nowrap shrink-0"
            >
              <span>View on GitHub</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            </a>
          </div>

          {/* Install Command Bar */}
          <div className="mx-auto mt-6 inline-flex max-w-full items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 dark:border-[#27272A] dark:bg-[#111114]">
            <Terminal className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <code className="overflow-x-auto font-mono text-xs sm:text-[13px] text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
              {installCmd}
            </code>
            <button
              type="button"
              onClick={handleCopyInstall}
              aria-label={copied ? 'Copied install command' : 'Copy install command'}
              className="ml-1 inline-flex h-7 items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 text-xs font-medium text-zinc-600 transition-colors duration-150 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-zinc-800 dark:bg-[#18181B] dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hero Visual: Polished Product Demonstration Preview */}
        <div className="mt-14 sm:mt-16">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/60 dark:border-[#27272A] dark:bg-[#111114]">
            {/* Window Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-3.5 dark:border-[#27272A] dark:bg-[#18181B]/70">
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Merchant Performance Snapshot
                </span>
                <span aria-hidden="true">·</span>
                <span>Q3–Q4 Sample Dataset</span>
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                Illustrative UI built on Charlie analytics output
              </div>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-1 divide-y divide-zinc-200 border-b border-zinc-200 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-[#27272A] dark:border-[#27272A] dark:bg-[#09090B]">
              <div className="p-5 sm:p-6">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Total Revenue (6 Months)
                </p>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 tabular-nums">
                    $148,920.00
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 tabular-nums">
                    <TrendingUp className="h-3.5 w-3.5" />
                    +20.3% MoM
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Completed Orders
                </p>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 tabular-nums">
                    1,842
                  </p>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                    96.4% fulfillment rate
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  Average Order Value
                </p>
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <p className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 tabular-nums">
                    $80.85
                  </p>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                    +$6.40 vs prior period
                  </span>
                </div>
              </div>
            </div>

            {/* Chart + Top Products & AI Recommendation Grid */}
            <div className="grid grid-cols-1 divide-y divide-zinc-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0 dark:divide-[#27272A]">
              {/* Left 7 cols: Revenue Trend Chart */}
              <div className="p-5 sm:p-6 lg:col-span-7 bg-white dark:bg-[#09090B]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Monthly Net Revenue Trend
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Computed from normalized CharlieOrder minor-unit totals
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                    USD ($)
                  </span>
                </div>

                <div className="h-60 w-full" aria-label="Monthly revenue trend area chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={HERO_TREND_DATA}
                      margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="heroEmeraldFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.28} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="rgba(161, 161, 170, 0.18)"
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717A', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#71717A', fontSize: 12 }}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value) => [
                          `$${Number(value ?? 0).toLocaleString()}`,
                          'Net Revenue',
                        ]}
                        contentStyle={{
                          backgroundColor: '#18181B',
                          borderColor: '#27272A',
                          borderRadius: '8px',
                          color: '#FAFAFA',
                          fontSize: '12px',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={2.2}
                        fillOpacity={1}
                        fill="url(#heroEmeraldFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Right 5 cols: Top Products + AI Recommendation */}
              <div className="flex flex-col justify-between divide-y divide-zinc-200 bg-white lg:col-span-5 dark:divide-[#27272A] dark:bg-[#09090B]">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      Top-Performing Products (Pareto 80/20)
                    </h2>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      84.4% of revenue
                    </span>
                  </div>
                  <div className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800/80">
                    {HERO_TOP_PRODUCTS.map((prod) => (
                      <div
                        key={prod.name}
                        className="flex items-center justify-between gap-3 py-2.5 text-xs"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium text-zinc-800 dark:text-zinc-200">
                            {prod.name}
                          </p>
                          <p className="text-zinc-500 dark:text-zinc-500 tabular-nums">
                            {prod.orders} orders · {prod.share} share
                          </p>
                        </div>
                        <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums shrink-0">
                          {prod.revenue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Recommendation Preview */}
                <div className="bg-zinc-50/80 p-5 sm:p-6 dark:bg-[#111114]">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                          AI Advisory Insight
                        </span>
                        <span aria-hidden="true" className="text-zinc-400">
                          ·
                        </span>
                        <span className="text-zinc-500 dark:text-zinc-400">
                          Evidence-backed
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                        Top 18% of customers ("Champions" in RFM) generated 61% of October
                        revenue, while 47 high-spend accounts have not reordered in 45+
                        days. Triggering a targeted renewal check-in for those 47 accounts
                        addresses $14,200 in historical quarterly spend.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
