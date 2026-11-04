import React from 'react';
import { DocPageData } from '../docsTypes';
import { CodeBlock } from '../../components/docs/CodeBlock';
import { ExampleResponse } from '../../components/docs/ExampleResponse';
import { Callout } from '../../components/docs/Callout';

export const ANALYTICS_PAGES: DocPageData[] = [
  {
    slug: 'analytics/revenue',
    href: '/docs/analytics/revenue',
    title: 'Revenue Metrics',
    description:
      'Calculate gross revenue, net revenue after refunds, paid order volume, and average order value (AOV).',
    group: 'Analytics',
    headings: [
      { id: 'what-revenue-calculates', title: 'What We Are Calculating' },
      { id: 'usage-example', title: 'Code Example' },
      { id: 'revenue-output', title: 'Understanding the Output' },
    ],
    searchKeywords: ['revenue', 'AOV', 'average order value', 'gross', 'net', 'refunds'],
    markdownSummary: `# Revenue Metrics\n\nCalculate exact gross revenue, net revenue after refunds, order counts, and average order value (AOV).`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-revenue-calculates" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What We Are Calculating
          </h2>
          <p>
            Revenue analytics turn a raw list of orders into reliable headline KPIs:
            total gross sales, refunded value, net revenue kept by the business, and the
            average amount spent per completed order (AOV).
          </p>
        </section>

        <section id="usage-example" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Code Example
          </h2>
          <CodeBlock
            language="typescript"
            filename="revenue.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`import { createCharlie } from 'charlie-the-business-advisor';

const charlie = createCharlie({ currency: 'USD' });
const metrics = charlie.analytics.calculateRevenue(orders);`}
          />
        </section>

        <section id="revenue-output" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Understanding the Output
          </h2>
          <ExampleResponse
            title="RevenueResult"
            json={`{
  "currency": "USD",
  "grossRevenueMinor": 845000,
  "refundedMinor": 25000,
  "netRevenueMinor": 820000,
  "netRevenueFormatted": "$8,200.00",
  "paidOrderCount": 100,
  "averageOrderValueMinor": 8200,
  "averageOrderValueFormatted": "$82.00"
}`}
            explanations={[
              {
                field: 'grossRevenueMinor',
                meaning: 'Total of all paid orders before partial or full refunds ($8,450.00).',
              },
              {
                field: 'netRevenueMinor',
                meaning: 'Gross revenue minus refundedMinor ($8,200.00).',
              },
              {
                field: 'averageOrderValueMinor',
                meaning: 'Net revenue divided by paidOrderCount ($82.00 per order).',
              },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'analytics/pareto',
    href: '/docs/analytics/pareto',
    title: 'Pareto (80/20) Analysis',
    description:
      'Discover which small percentage of products or customers generates the majority of your business revenue.',
    group: 'Analytics',
    headings: [
      { id: 'what-is-pareto', title: 'What Is the 80/20 Rule?' },
      { id: 'running-pareto', title: 'Running Pareto Analysis' },
      { id: 'pareto-result', title: 'Interpreting Vital Few vs. Long Tail' },
    ],
    searchKeywords: ['pareto', '80/20', 'top products', 'top customers', 'concentration'],
    markdownSummary: `# Pareto (80/20) Analysis\n\nIdentify the vital few customers or products contributing 80% of total revenue.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-is-pareto" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Is the 80/20 Rule?
          </h2>
          <p>
            In many businesses, roughly 20% of products—or 20% of repeat clients—generate
            close to 80% of revenue. Knowing the exact ratio helps founders protect stock
            levels on bestsellers and spot dangerous revenue concentration early.
          </p>
        </section>

        <section id="running-pareto" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Running Pareto Analysis
          </h2>
          <CodeBlock
            language="typescript"
            filename="pareto.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const customerPareto = charlie.analytics.calculatePareto(orders, {
  groupBy: 'customer',
  thresholdPercent: 80,
});`}
          />
        </section>

        <section id="pareto-result" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Interpreting Vital Few vs. Long Tail
          </h2>
          <ExampleResponse
            title="ParetoResult"
            json={`{
  "groupBy": "customer",
  "thresholdPercent": 80,
  "totalEntities": 120,
  "vitalFewCount": 22,
  "vitalFewEntitySharePercent": 18.3,
  "vitalFewRevenueSharePercent": 80.4,
  "topContributors": [
    { "id": "cus_09", "revenueMinor": 94000, "cumulativeSharePercent": 11.5 }
  ]
}`}
            explanations={[
              {
                field: 'vitalFewCount (22)',
                meaning: 'Out of 120 total buyers, just 22 customers account for 80.4% of revenue.',
              },
              {
                field: 'vitalFewEntitySharePercent (18.3%)',
                meaning: '18.3% of your customer base drives over four-fifths of total sales.',
              },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'analytics/rfm',
    href: '/docs/analytics/rfm',
    title: 'Understanding Your Customers with RFM',
    description:
      'RFM helps you understand which customers buy frequently, which spend the most, and which have not purchased recently.',
    group: 'Analytics',
    headings: [
      { id: 'three-dimensions', title: 'The Three RFM Signals' },
      { id: 'sample-customer-table', title: 'Sample Customer Table' },
      { id: 'rfm-code', title: 'Running RFM in Charlie' },
      { id: 'rfm-output', title: 'Example Output & Next Actions' },
    ],
    searchKeywords: [
      'rfm',
      'recency',
      'frequency',
      'monetary',
      'champions',
      'at-risk',
      'segmentation',
    ],
    markdownSummary: `# Understanding Your Customers with RFM\n\nRFM helps you understand which customers buy frequently, which spend the most, and which haven't purchased recently.\n\n- **Recency**: When did they last buy?\n- **Frequency**: How often do they buy?\n- **Monetary**: How much do they spend?`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p className="text-base text-zinc-700 dark:text-zinc-300">
          RFM helps you understand which customers buy frequently, which spend the most,
          and which haven&apos;t purchased recently.
        </p>

        <section id="three-dimensions" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            The Three RFM Signals
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                letter: 'R',
                title: 'Recency',
                question: 'When did they last buy?',
                detail:
                  'A customer who bought 3 days ago is much more likely to buy again soon than someone whose last order was 8 months ago.',
              },
              {
                letter: 'F',
                title: 'Frequency',
                question: 'How often do they buy?',
                detail:
                  'Separates one-time gift shoppers from loyal repeat buyers who rely on your product every month.',
              },
              {
                letter: 'M',
                title: 'Monetary',
                question: 'How much do they spend?',
                detail:
                  'Highlights high-value accounts whose retention has the largest impact on overall revenue.',
              },
            ].map((card) => (
              <div
                key={card.letter}
                className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-5 dark:border-[#27272A] dark:bg-[#111114]"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  {card.letter}
                </span>
                <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {card.title}
                </h3>
                <p className="mt-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  {card.question}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {card.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="sample-customer-table" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Sample Customer Table
          </h2>
          <p>
            Here is how Charlie evaluates three different buyers based on their order
            history:
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-[#27272A]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-800 dark:text-zinc-200">
                    Last Purchase
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-800 dark:text-zinc-200">
                    Total Orders
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-800 dark:text-zinc-200">
                    Total Spend
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Assigned Segment
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-[#27272A] dark:bg-[#09090B]">
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800 dark:text-zinc-200">
                    cus_amina
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">4 days ago</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">9</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">$1,420.00</td>
                  <td className="px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">
                    Champions
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800 dark:text-zinc-200">
                    cus_david
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">62 days ago</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">7</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">$980.00</td>
                  <td className="px-4 py-3 font-semibold text-amber-700 dark:text-amber-400">
                    At-Risk
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-zinc-800 dark:text-zinc-200">
                    cus_sofia
                  </td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">2 days ago</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">1</td>
                  <td className="px-4 py-3 text-right font-mono tabular-nums">$95.00</td>
                  <td className="px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">
                    New Buyers
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="rfm-code" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Running RFM in Charlie
          </h2>
          <CodeBlock
            language="typescript"
            filename="rfm-analysis.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const rfm = charlie.analytics.calculateRFM(orders, {
  referenceDate: '2026-11-04T00:00:00Z',
});`}
          />
        </section>

        <section id="rfm-output" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Example Output &amp; Next Actions
          </h2>
          <ExampleResponse
            title="RFMResult"
            json={`{
  "referenceDate": "2026-11-04T00:00:00Z",
  "segments": {
    "Champions": { "count": 28, "revenueSharePercent": 51.4 },
    "At-Risk": { "count": 14, "revenueSharePercent": 16.2 },
    "New Buyers": { "count": 49, "revenueSharePercent": 12.8 }
  },
  "customers": [
    {
      "customerId": "cus_amina",
      "recencyDays": 4,
      "frequencyCount": 9,
      "monetaryMinor": 142000,
      "scores": { "r": 5, "f": 5, "m": 5 },
      "segment": "Champions"
    }
  ]
}`}
            explanations={[
              {
                field: 'scores ({ r: 5, f: 5, m: 5 })',
                meaning: 'Quintile score from 1 (lowest) to 5 (strongest) across each dimension.',
              },
              {
                field: 'At-Risk cohort',
                meaning:
                  'High historical buyers who have gone quiet—ideal candidates for a friendly personal check-in.',
              },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'analytics/trends',
    href: '/docs/analytics/trends',
    title: 'Sales Trends',
    description:
      'Group orders into daily, weekly, or monthly buckets and compute period-over-period growth rates.',
    group: 'Analytics',
    headings: [
      { id: 'granularity-buckets', title: 'Time Bucket Granularities' },
      { id: 'trends-example', title: 'Computing Period Growth' },
    ],
    searchKeywords: ['trends', 'time series', 'daily', 'weekly', 'monthly', 'MoM', 'growth'],
    markdownSummary: `# Sales Trends\n\nBucket revenue by day, week, or month and measure period-over-period momentum.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="granularity-buckets" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Time Bucket Granularities
          </h2>
          <p>
            Raw order totals only show a static sum. Sales Trends bucket orders by{' '}
            <code className="font-mono text-xs">'day'</code>,{' '}
            <code className="font-mono text-xs">'week'</code>, or{' '}
            <code className="font-mono text-xs">'month'</code> (filling empty dates with
            zeros so charts render continuous axes) and calculate exact percentage change
            against the preceding period.
          </p>
        </section>

        <section id="trends-example" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Computing Period Growth
          </h2>
          <CodeBlock
            language="typescript"
            filename="trends.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const trend = charlie.analytics.calculateTrends(orders, {
  interval: 'month',
  timezone: 'UTC',
});`}
          />
          <ExampleResponse
            title="TrendResult"
            json={`{
  "interval": "month",
  "direction": "upward",
  "latestGrowthPercent": 20.3,
  "series": [
    { "bucket": "2026-09", "netRevenueMinor": 2945000, "orderCount": 362 },
    { "bucket": "2026-10", "netRevenueMinor": 3542000, "orderCount": 428 }
  ]
}`}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'analytics/snapshots',
    href: '/docs/analytics/snapshots',
    title: 'Business Snapshots',
    description:
      'Generate a single structured JSON summary combining revenue, trends, Pareto concentration, and RFM segments.',
    group: 'Analytics',
    headings: [
      { id: 'why-snapshots', title: 'Why Generate a Snapshot?' },
      { id: 'snapshot-example', title: 'Creating & Caching a Snapshot' },
    ],
    searchKeywords: ['snapshot', 'summary', 'JSON', 'cache', 'dashboard payload'],
    markdownSummary: `# Business Snapshots\n\nCombine revenue, trends, Pareto, and RFM outputs into one portable JSON payload.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="why-snapshots" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Why Generate a Snapshot?
          </h2>
          <p>
            Instead of invoking four separate analytics methods for every dashboard load,{' '}
            <code className="font-mono text-xs">createSnapshot()</code> computes a unified,
            timestamped summary in a single pass. Snapshots also serve as the exact input
            contract for Charlie&apos;s optional AI Recommendation and Chat modules.
          </p>
        </section>

        <section id="snapshot-example" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Creating &amp; Caching a Snapshot
          </h2>
          <CodeBlock
            language="typescript"
            filename="snapshot.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const snapshot = charlie.analytics.createSnapshot({
  orders: normalizedOrders,
  customers: normalizedCustomers,
  trendInterval: 'week',
});

// Safe to serialize to JSON, store in Redis, or return from an API route
return Response.json(snapshot);`}
          />
          <Callout variant="tip" title="Cache snapshots for high-traffic dashboards">
            Because snapshots are plain JSON objects with no class instances attached,
            caching a merchant&apos;s snapshot for 5–15 minutes keeps dashboard loads
            instantaneous even on large order tables.
          </Callout>
        </section>
      </div>
    ),
  },
];
