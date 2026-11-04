import React, { useState } from 'react';
import { CodeBlock } from '../docs/CodeBlock';

interface SdkPreviewTab {
  id: 'analytics' | 'ai' | 'adapter';
  label: string;
  filename: string;
  description: string;
  code: string;
  outputFilename: string;
  outputJson: string;
}

const PREVIEW_TABS: SdkPreviewTab[] = [
  {
    id: 'analytics',
    label: 'Analytics Only',
    filename: 'analytics-summary.ts',
    description:
      'Compute revenue, AOV, and Pareto concentration without any external API keys or network requests.',
    code: `import { createCharlie, CharlieOrder } from 'charlie-the-business-advisor';

const orders: CharlieOrder[] = [
  { id: 'ord_101', customerId: 'cus_01', totalMinor: 12500, currency: 'USD', status: 'paid', createdAt: '2026-10-02T10:15:00Z' },
  { id: 'ord_102', customerId: 'cus_02', totalMinor: 4800,  currency: 'USD', status: 'paid', createdAt: '2026-10-05T14:22:00Z' },
  { id: 'ord_103', customerId: 'cus_01', totalMinor: 18900, currency: 'USD', status: 'paid', createdAt: '2026-10-18T09:05:00Z' },
];

const charlie = createCharlie({ currency: 'USD' });
const summary = charlie.analytics.calculateRevenue(orders);`,
    outputFilename: 'summary.json',
    outputJson: `{
  "currency": "USD",
  "grossRevenueMinor": 36200,
  "grossRevenueFormatted": "$362.00",
  "paidOrderCount": 3,
  "averageOrderValueMinor": 12067,
  "averageOrderValueFormatted": "$120.67"
}`,
  },
  {
    id: 'ai',
    label: 'With AI',
    filename: 'advisor-insights.ts',
    description:
      'Generate structured recommendations from a computed snapshot using OpenAI, Gemini, Claude, or MockProvider.',
    code: `import { createCharlie, GeminiProvider } from 'charlie-the-business-advisor';

const charlie = createCharlie({
  currency: 'USD',
  aiProvider: new GeminiProvider({
    apiKey: process.env.GEMINI_API_KEY!,
    model: 'gemini-2.5-flash',
  }),
});

const snapshot = charlie.analytics.createSnapshot({ orders, customers });
const advice = await charlie.advisor.recommend(snapshot, {
  focus: 'retention',
  maxRecommendations: 2,
});`,
    outputFilename: 'advice.json',
    outputJson: `{
  "provider": "gemini",
  "generatedAt": "2026-11-04T09:00:00Z",
  "recommendations": [
    {
      "priority": "high",
      "title": "Re-engage At-Risk repeat buyers",
      "evidence": "14 repeat customers have passed 45 days since last order ($6,420 prior spend).",
      "suggestedAction": "Send a personalized restock check-in before 60-day churn threshold."
    }
  ]
}`,
  },
  {
    id: 'adapter',
    label: 'Custom Data Mapping',
    filename: 'order-adapter.ts',
    description:
      'Map your existing database columns into CharlieOrder records without altering your database schema.',
    code: `import { createOrderAdapter } from 'charlie-the-business-advisor';

interface LegacyShopRow {
  order_no: string;
  buyer_id: number;
  amount_paid_dollars: number;
  order_state: 'COMPLETED' | 'CANCELLED';
  placed_on: Date;
}

const mapLegacyOrders = createOrderAdapter<LegacyShopRow>({
  id: (row) => row.order_no,
  customerId: (row) => String(row.buyer_id),
  totalMinor: (row) => Math.round(row.amount_paid_dollars * 100),
  currency: () => 'USD',
  status: (row) => (row.order_state === 'COMPLETED' ? 'paid' : 'cancelled'),
  createdAt: (row) => row.placed_on.toISOString(),
});

const normalizedOrders = mapLegacyOrders(rawDatabaseRows);`,
    outputFilename: 'normalizedOrders[0].json',
    outputJson: `{
  "id": "1001",
  "customerId": "25",
  "totalMinor": 750000,
  "currency": "USD",
  "status": "paid",
  "createdAt": "2026-10-29T16:40:00.000Z"
}`,
  },
];

export function CodePreview() {
  const [activeTabId, setActiveTabId] = useState<SdkPreviewTab['id']>('analytics');
  const current = PREVIEW_TABS.find((t) => t.id === activeTabId) ?? PREVIEW_TABS[0];

  return (
    <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#09090B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Developer Experience
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
              Clean TypeScript ergonomics with predictable JSON outputs
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
              Start with pure deterministic analytics, map legacy schemas in a few lines,
              and opt into AI advisory calls only where helpful.
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div
            role="tablist"
            aria-label="SDK code preview modes"
            className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-[#27272A] dark:bg-[#18181B]"
          >
            {PREVIEW_TABS.map((tab) => {
              const selected = tab.id === current.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    selected
                      ? 'bg-white text-zinc-950 shadow-xs dark:bg-[#09090B] dark:text-zinc-50'
                      : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
          {current.description}{' '}
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            (Illustrative example of the intended Charlie SDK interface.)
          </span>
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7">
            <CodeBlock
              code={current.code}
              language="typescript"
              filename={current.filename}
              showLineNumbers
              illustrativeLabel="Illustrative SDK Example"
              className="h-full"
            />
          </div>
          <div className="lg:col-span-5">
            <CodeBlock
              code={current.outputJson}
              language="json"
              filename={current.outputFilename}
              illustrativeLabel="Sample Result"
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
