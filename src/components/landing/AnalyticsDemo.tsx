'use client';

import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Lightbulb } from 'lucide-react';

type RangeKey = '7d' | '30d' | '90d';

interface DemoDataset {
  label: string;
  netRevenue: string;
  revenueDelta: string;
  totalOrders: string;
  avgOrderValue: string;
  repeatCustomerRate: string;
  chart: { period: string; revenue: number; orders: number }[];
  topProducts: { name: string; units: number; revenue: string; share: string }[];
  segments: { segment: string; customers: number; shareOfRevenue: string; description: string }[];
  aiRecommendation: {
    headline: string;
    detail: string;
    metricBasis: string;
  };
}

const DEMO_DATASETS: Record<RangeKey, DemoDataset> = {
  '7d': {
    label: 'Last 7 Days',
    netRevenue: '$14,820.00',
    revenueDelta: '+8.4% vs prior 7d',
    totalOrders: '186',
    avgOrderValue: '$79.68',
    repeatCustomerRate: '42.5%',
    chart: [
      { period: 'Thu', revenue: 1890, orders: 24 },
      { period: 'Fri', revenue: 2340, orders: 29 },
      { period: 'Sat', revenue: 1620, orders: 21 },
      { period: 'Sun', revenue: 1490, orders: 19 },
      { period: 'Mon', revenue: 2510, orders: 31 },
      { period: 'Tue', revenue: 2380, orders: 30 },
      { period: 'Wed', revenue: 2590, orders: 32 },
    ],
    topProducts: [
      { name: 'Pro Merchant Analytics Seat', units: 64, revenue: '$6,400', share: '43.2%' },
      { name: 'Automated Tax Ledger Sync', units: 78, revenue: '$4,680', share: '31.6%' },
      { name: 'Custom Webhook Connector', units: 44, revenue: '$2,200', share: '14.8%' },
    ],
    segments: [
      { segment: 'Champions', customers: 28, shareOfRevenue: '51%', description: 'Bought within 7 days, 4+ lifetime orders' },
      { segment: 'Loyal Customers', customers: 51, shareOfRevenue: '29%', description: 'Consistent repeat purchasers' },
      { segment: 'New Buyers', customers: 74, shareOfRevenue: '14%', description: 'First purchase completed this week' },
      { segment: 'At-Risk', customers: 19, shareOfRevenue: '6%', description: 'Previously active, slowing cadence' },
    ],
    aiRecommendation: {
      headline: 'Capitalize on Monday–Wednesday B2B checkout surge',
      detail:
        'Weekday volume outpaced weekend revenue by 63% over the past 7 days, led by Pro Merchant Analytics Seats. Scheduling product onboarding emails for Monday 09:00 local time aligns with peak conversion.',
      metricBasis: 'Derived from 7-day daily trend & Pareto product concentration',
    },
  },
  '30d': {
    label: 'Last 30 Days',
    netRevenue: '$61,450.00',
    revenueDelta: '+14.2% vs prior 30d',
    totalOrders: '748',
    avgOrderValue: '$82.15',
    repeatCustomerRate: '46.8%',
    chart: [
      { period: 'Week 1', revenue: 13400, orders: 166 },
      { period: 'Week 2', revenue: 14850, orders: 181 },
      { period: 'Week 3', revenue: 15920, orders: 193 },
      { period: 'Week 4', revenue: 17280, orders: 208 },
    ],
    topProducts: [
      { name: 'Pro Merchant Analytics Seat', units: 268, revenue: '$26,800', share: '43.6%' },
      { name: 'Automated Tax Ledger Sync', units: 312, revenue: '$18,720', share: '30.5%' },
      { name: 'Custom Webhook Connector', units: 195, revenue: '$9,750', share: '15.9%' },
    ],
    segments: [
      { segment: 'Champions', customers: 94, shareOfRevenue: '56%', description: 'High spend, purchased in last 14 days' },
      { segment: 'Loyal Customers', customers: 162, shareOfRevenue: '26%', description: '3+ orders across 30-day window' },
      { segment: 'Promising / New', customers: 210, shareOfRevenue: '12%', description: '1st order with above-median AOV' },
      { segment: 'At-Risk', customers: 43, shareOfRevenue: '6%', description: 'No purchase in 25+ days after repeat streak' },
    ],
    aiRecommendation: {
      headline: 'Bundle Tax Ledger Sync with Pro Merchant Seats at checkout',
      detail:
        'Top 2 products account for 74.1% of 30-day net revenue, and 38% of Champions purchased both within 14 days. Offering a combined annual tier simplifies expansion.',
      metricBasis: 'Derived from 30-day Pareto 80/20 & RFM Champions cohort',
    },
  },
  '90d': {
    label: 'Last 90 Days',
    netRevenue: '$174,390.00',
    revenueDelta: '+22.7% vs prior 90d',
    totalOrders: '2,114',
    avgOrderValue: '$82.49',
    repeatCustomerRate: '51.2%',
    chart: [
      { period: 'Aug', revenue: 51200, orders: 632 },
      { period: 'Sep', revenue: 58740, orders: 711 },
      { period: 'Oct', revenue: 64450, orders: 771 },
    ],
    topProducts: [
      { name: 'Pro Merchant Analytics Seat', units: 760, revenue: '$76,000', share: '43.6%' },
      { name: 'Automated Tax Ledger Sync', units: 890, revenue: '$53,400', share: '30.6%' },
      { name: 'Custom Webhook Connector', units: 540, revenue: '$27,000', share: '15.5%' },
    ],
    segments: [
      { segment: 'Champions', customers: 188, shareOfRevenue: '59%', description: 'Top quintile across R, F, and M scores' },
      { segment: 'Loyal Customers', customers: 340, shareOfRevenue: '24%', description: 'Steady monthly reorder cadence' },
      { segment: 'Need Attention', customers: 126, shareOfRevenue: '11%', description: 'Above-average spend, 45–60d inactive' },
      { segment: 'Hibernating', customers: 95, shareOfRevenue: '6%', description: 'Single purchase 60+ days ago' },
    ],
    aiRecommendation: {
      headline: 'Prioritize retention outreach for 126 "Need Attention" accounts',
      detail:
        'Over a 90-day horizon, 126 previously high-value accounts crossed 45 days without reordering, representing $19,180 in historical revenue. Automated account review reminders target the highest recovery upside.',
      metricBasis: 'Derived from 90-day RFM recency decay & customer spend ledger',
    },
  },
};

export function AnalyticsDemo() {
  const [range, setRange] = useState<RangeKey>('30d');
  const data = DEMO_DATASETS[range];

  return (
    <section
      id="examples"
      className="scroll-mt-16 border-b border-zinc-200 bg-white py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#09090B]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Interactive Demonstration
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
              Explore a live frontend preview of Charlie outputs
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
              Switch time horizons below to inspect how applications can render Charlie
              revenue statistics, Pareto rankings, RFM customer segments, and advisory
              cards using static local mock data.
            </p>
          </div>

          {/* Date Range Segmented Control */}
          <div
            role="group"
            aria-label="Select sample analytics date range"
            className="inline-flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-[#27272A] dark:bg-[#18181B]"
          >
            {(['7d', '30d', '90d'] as RangeKey[]).map((key) => {
              const isSelected = range === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRange(key)}
                  aria-pressed={isSelected}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isSelected
                      ? 'bg-white text-zinc-950 shadow-xs dark:bg-[#09090B] dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {DEMO_DATASETS[key].label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Dashboard Container */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-[#27272A] dark:bg-[#111114]">
          {/* 4 KPI Metrics */}
          <div className="grid grid-cols-2 divide-x divide-y divide-zinc-200 border-b border-zinc-200 sm:grid-cols-4 sm:divide-y-0 dark:divide-[#27272A] dark:border-[#27272A]">
            <div className="p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Net Revenue</p>
              <p className="mt-1.5 font-mono text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums">
                {data.netRevenue}
              </p>
              <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400 tabular-nums">
                {data.revenueDelta}
              </p>
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Paid Orders</p>
              <p className="mt-1.5 font-mono text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums">
                {data.totalOrders}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {data.label}
              </p>
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Average Order Value
              </p>
              <p className="mt-1.5 font-mono text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums">
                {data.avgOrderValue}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Exact minor-unit mean
              </p>
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Repeat Buyer Share
              </p>
              <p className="mt-1.5 font-mono text-xl sm:text-2xl font-semibold text-zinc-950 dark:text-zinc-50 tabular-nums">
                {data.repeatCustomerRate}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                2+ historical orders
              </p>
            </div>
          </div>

          {/* Chart + RFM Customer Segments */}
          <div className="grid grid-cols-1 divide-y divide-zinc-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0 dark:divide-[#27272A]">
            {/* Revenue Bar Chart */}
            <div className="p-5 sm:p-6 lg:col-span-7 bg-white dark:bg-[#09090B]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    Revenue Breakdown ({data.label})
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Local mock dataset — frontend demonstration only
                  </p>
                </div>
              </div>

              <div className="h-64 w-full" aria-label={`Revenue bar chart for ${data.label}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.chart}
                    margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(161, 161, 170, 0.18)"
                    />
                    <XAxis
                      dataKey="period"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#71717A', fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#71717A', fontSize: 12 }}
                      tickFormatter={(v) =>
                        v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [
                        `$${Number(value ?? 0).toLocaleString()}`,
                        'Revenue',
                      ]}
                      cursor={{ fill: 'rgba(161, 161, 170, 0.08)' }}
                      contentStyle={{
                        backgroundColor: '#18181B',
                        borderColor: '#27272A',
                        borderRadius: '8px',
                        color: '#FAFAFA',
                        fontSize: '12px',
                      }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#10B981"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={48}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* RFM Segments Table */}
            <div className="p-5 sm:p-6 lg:col-span-5 bg-white dark:bg-[#09090B]">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                RFM Customer Segments
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                Grouped by Recency, Frequency &amp; Monetary score
              </p>

              <div className="mt-4 divide-y divide-zinc-200 dark:divide-[#27272A]">
                {data.segments.map((seg) => (
                  <div key={seg.segment} className="py-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {seg.segment}
                      </span>
                      <span className="font-mono text-zinc-700 dark:text-zinc-300 tabular-nums">
                        {seg.customers} customers · {seg.shareOfRevenue} rev
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {seg.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Split: Top Products + Sample AI Recommendation */}
          <div className="grid grid-cols-1 divide-y divide-zinc-200 border-t border-zinc-200 lg:grid-cols-12 lg:divide-x lg:divide-y-0 dark:divide-[#27272A] dark:border-[#27272A]">
            <div className="p-5 sm:p-6 lg:col-span-7 bg-white dark:bg-[#09090B]">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Top Products in Selected Window
              </h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500 dark:border-[#27272A] dark:text-zinc-400">
                      <th className="pb-2 font-medium">Product</th>
                      <th className="pb-2 text-right font-medium">Units</th>
                      <th className="pb-2 text-right font-medium">Revenue</th>
                      <th className="pb-2 text-right font-medium">Share</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                    {data.topProducts.map((p) => (
                      <tr key={p.name}>
                        <td className="py-2.5 font-medium text-zinc-800 dark:text-zinc-200">
                          {p.name}
                        </td>
                        <td className="py-2.5 text-right font-mono text-zinc-600 dark:text-zinc-400 tabular-nums">
                          {p.units}
                        </td>
                        <td className="py-2.5 text-right font-mono font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
                          {p.revenue}
                        </td>
                        <td className="py-2.5 text-right font-mono text-emerald-700 dark:text-emerald-400 tabular-nums">
                          {p.share}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-5 sm:p-6 lg:col-span-5 bg-zinc-50/80 dark:bg-[#111114]">
              <div className="flex items-start gap-3">
                <Lightbulb className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    Example AI Recommendation ({data.label})
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {data.aiRecommendation.headline}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {data.aiRecommendation.detail}
                  </p>
                  <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
                    Basis: {data.aiRecommendation.metricBasis}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
