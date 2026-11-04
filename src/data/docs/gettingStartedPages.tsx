import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Database,
  LayoutDashboard,
  ShoppingCart,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import { DocPageData } from '../docsTypes';
import { Callout } from '../../components/docs/Callout';
import { CodeBlock } from '../../components/docs/CodeBlock';
import { PackageManagerTabs, CodeTabs } from '../../components/docs/Tabs';
import { StepGuide } from '../../components/docs/StepGuide';
import { ExampleResponse } from '../../components/docs/ExampleResponse';

export const GETTING_STARTED_PAGES: DocPageData[] = [
  {
    slug: '',
    href: '/docs',
    title: 'Welcome to Charlie',
    description:
      'Everything you need to start analyzing business data and adding AI-powered insights to your application.',
    group: 'Getting Started',
    headings: [
      { id: 'explore-guides', title: 'Explore Charlie' },
      { id: 'learning-path', title: 'Recommended Learning Path' },
      { id: 'design-principles', title: 'How Charlie Is Structured' },
    ],
    searchKeywords: [
      'welcome',
      'home',
      'getting started',
      'learning path',
      'overview',
      'no database',
      'free',
    ],
    markdownSummary: `# Welcome to Charlie\n\nEverything you need to start analyzing business data and adding AI-powered insights to your application.\n\n> You can start using Charlie without a database or AI API key.\n\n## Recommended Learning Path\n1. Install Charlie\n2. Analyze sample orders\n3. Understand the results\n4. Connect your own data\n5. Add AI if needed`,
    render: () => (
      <div className="space-y-10">
        <Callout variant="tip" title="Zero-friction starting point">
          You can start using Charlie without a database or AI API key. Pass a plain
          TypeScript array of sample orders to compute revenue, Pareto rankings, and RFM
          customer segments locally in seconds.
        </Callout>

        <section id="explore-guides" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Explore Charlie
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Jump straight to the topic that matches what you are building today.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                title: 'Quick Start',
                desc: 'Install Charlie and calculate your first business metrics in under 5 minutes.',
                href: '/docs/quick-start',
                icon: Zap,
              },
              {
                title: 'Understand Orders',
                desc: 'Learn how CharlieOrder represents purchases, statuses, and minor-unit amounts.',
                href: '/docs/datasets/orders',
                icon: ShoppingCart,
              },
              {
                title: 'Understand Customers',
                desc: 'Structure customer records cleanly while respecting user privacy.',
                href: '/docs/datasets/customers',
                icon: Users,
              },
              {
                title: 'Connect Your Database',
                desc: 'Map existing SQL or NoSQL fields with Adapters—no column renames needed.',
                href: '/docs/adapters/overview',
                icon: Database,
              },
              {
                title: 'Add AI Recommendations',
                desc: 'Use OpenAI, Gemini, Claude, or the offline Mock Provider for plain-English advice.',
                href: '/docs/ai/recommendations',
                icon: Sparkles,
              },
              {
                title: 'Build a Dashboard',
                desc: 'Integrate Charlie outputs cleanly into Next.js, React, NestJS, or Laravel apps.',
                href: '/docs/frameworks/nextjs',
                icon: LayoutDashboard,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 transition-colors duration-150 hover:border-emerald-500/50 hover:bg-zinc-50/70 dark:border-[#27272A] dark:bg-[#111114] dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B]"
                >
                  <div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-emerald-600 dark:border-zinc-700 dark:bg-[#18181B] dark:text-emerald-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="mt-3.5 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 dark:text-zinc-100 dark:group-hover:text-emerald-400">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {card.desc}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-200">
                    Open guide <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="learning-path" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Recommended Learning Path
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            New to business analytics? Follow these five steps in sequence:
          </p>
          <ol className="mt-5 space-y-3">
            {[
              {
                step: '01',
                label: 'Install Charlie',
                detail: 'Add the TypeScript package from npm, pnpm, yarn, or bun.',
                href: '/docs/installation',
              },
              {
                step: '02',
                label: 'Analyze sample orders',
                detail: 'Run revenue and AOV calculations on a 3-item in-memory array.',
                href: '/docs/quick-start',
              },
              {
                step: '03',
                label: 'Understand the results',
                detail: 'Learn how Pareto 80/20 and RFM customer cohorts work.',
                href: '/docs/analytics/rfm',
              },
              {
                step: '04',
                label: 'Connect your own data',
                detail: 'Write a 6-line Data Adapter for your existing database rows.',
                href: '/docs/adapters/overview',
              },
              {
                step: '05',
                label: 'Add AI if needed',
                detail:
                  'Attach MockProvider for testing or an LLM provider for advisory summaries.',
                href: '/docs/ai/overview',
              },
            ].map((item) => (
              <li key={item.step}>
                <Link
                  href={item.href}
                  className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 transition-colors hover:border-emerald-500/40 dark:border-[#27272A] dark:bg-[#111114]/80"
                >
                  <span className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-0.5 tabular-nums">
                    {item.step}.
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                      {item.detail}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section id="design-principles" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            How Charlie Is Structured
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
            Charlie intentionally separates <strong>deterministic calculations</strong>{' '}
            from <strong>AI interpretation</strong>. Every dollar figure, percentage
            change, and customer cohort is computed using exact TypeScript math inside
            your own runtime. When you optionally enable an AI provider, Charlie sends
            only the structured summary snapshot—never asking an LLM to guess arithmetic.
          </p>
        </section>
      </div>
    ),
  },
  {
    slug: 'introduction',
    href: '/docs/introduction',
    title: 'Introduction',
    description:
      'What Charlie the Business Advisor is, who it is built for, and what problems it solves.',
    group: 'Getting Started',
    headings: [
      { id: 'what-is-charlie', title: 'What Is Charlie?' },
      { id: 'why-developers-use-it', title: 'Why Developers Use Charlie' },
      { id: 'what-charlie-is-not', title: 'What Charlie Is Not' },
    ],
    searchKeywords: [
      'introduction',
      'what is charlie',
      'open source',
      'overview',
      'architecture',
    ],
    markdownSummary: `# Introduction\n\nCharlie the Business Advisor is a free, open-source TypeScript toolkit that helps developers add deterministic business intelligence and optional AI-powered advice to existing applications.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-is-charlie" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Is Charlie?
          </h2>
          <p>
            <strong>Charlie the Business Advisor</strong> is a completely free,
            open-source TypeScript toolkit designed for developers building SaaS
            platforms, e-commerce back offices, booking tools, invoicing apps, and
            internal admin dashboards.
          </p>
          <p>
            Most business applications already store orders and customers in a database,
            yet showing merchants meaningful answers—such as which 20% of products drive
            80% of revenue, or which loyal buyers are slipping away—usually requires
            writing repetitive analytics boilerplate from scratch. Charlie packages those
            calculations into clean, strongly typed functions.
          </p>
        </section>

        <section id="why-developers-use-it" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Why Developers Use Charlie
          </h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Exact minor-unit math:</strong> Represents money in integer minor
              units (such as cents or kobo) so floating-point precision bugs never corrupt
              financial totals.
            </li>
            <li>
              <strong>Schema-agnostic adapters:</strong> Works with your existing SQL or
              NoSQL column names without forcing database migrations.
            </li>
            <li>
              <strong>Provider-agnostic AI layer:</strong> Plug in OpenAI, Google Gemini,
              Anthropic Claude, or use the built-in Mock Provider with zero API keys.
            </li>
            <li>
              <strong>Self-contained execution:</strong> Runs inside your Node.js or
              TypeScript service with no Charlie-hosted backend.
            </li>
          </ul>
        </section>

        <section id="what-charlie-is-not" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Charlie Is Not
          </h2>
          <Callout variant="note" title="Clear product boundaries">
            Charlie is an embeddable developer library—not a hosted BI SaaS, not an
            automatic database crawler, and not a magic revenue guarantee. You fetch
            records using your preferred ORM or query builder, pass them into Charlie,
            and render the resulting insights in your own UI.
          </Callout>
        </section>
      </div>
    ),
  },
  {
    slug: 'installation',
    href: '/docs/installation',
    title: 'Installation',
    description:
      'Install Charlie the Business Advisor in any Node.js or TypeScript project.',
    group: 'Getting Started',
    headings: [
      { id: 'requirements', title: 'System Requirements' },
      { id: 'install-package', title: 'Install the Package' },
      { id: 'verify-install', title: 'Verify Your Setup' },
    ],
    searchKeywords: ['install', 'npm', 'pnpm', 'yarn', 'bun', 'nodejs', 'typescript'],
    markdownSummary: `# Installation\n\n\`\`\`bash\nnpm install charlie-the-business-advisor\n\`\`\`\n\nRequires Node.js 18+ and TypeScript 5.0+ (recommended).`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="requirements" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            System Requirements
          </h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Node.js:</strong> Version 18.0 or newer (LTS recommended).
            </li>
            <li>
              <strong>TypeScript:</strong> Version 5.0+ recommended for full type
              inference (plain JavaScript ESM and CommonJS are also supported).
            </li>
            <li>
              <strong>Database / API keys:</strong> None required to install or run core
              analytics.
            </li>
          </ul>
        </section>

        <section id="install-package" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Install the Package
          </h2>
          <p>
            Run the installation command for your preferred package manager in your
            project root:
          </p>
          <PackageManagerTabs />

          <div className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-[#27272A] dark:bg-[#111114]/70">
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              Umbrella Package vs. Modular Scoped Packages
            </h3>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              The umbrella package <code className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">charlie-the-business-advisor</code> bundles all analytics, adapters, and AI integrations. If you prefer fine-grained modular dependencies, you can install individual packages under the <code className="font-mono text-[11px] text-emerald-700 dark:text-emerald-400">@charlie-the-ai</code> scope:
            </p>
            <ul className="mt-2 space-y-1 text-xs text-zinc-600 dark:text-zinc-400 pl-4 list-disc">
              <li><code className="font-mono text-[11px]">@charlie-the-ai/analytics-core</code> — Deterministic calculations only (revenue, Pareto, RFM, trends).</li>
              <li><code className="font-mono text-[11px]">@charlie-the-ai/analytics-adapters</code> — Schema mapping and data conversion helpers.</li>
              <li><code className="font-mono text-[11px]">@charlie-the-ai/advisor-ai</code> — Multi-provider AI orchestration and grounding validation.</li>
              <li><code className="font-mono text-[11px]">@charlie-the-ai/advisor-react</code> — React hooks (<code className="font-mono text-[11px]">useBusinessAnalytics</code>) and UI components.</li>
              <li><code className="font-mono text-[11px]">@charlie-the-ai/advisor-types</code> — Canonical TypeScript types and schemas.</li>
            </ul>
          </div>
        </section>

        <section id="verify-install" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Verify Your Setup
          </h2>
          <p>
            Import <code className="font-mono text-xs">createCharlie</code> in a test
            script to confirm module resolution and TypeScript types:
          </p>
          <CodeTabs
            illustrativeLabel="Illustrative SDK Example"
            items={[
              {
                id: 'ts',
                label: 'TypeScript',
                language: 'typescript',
                filename: 'verify.ts',
                code: `import { createCharlie } from 'charlie-the-business-advisor';

const charlie = createCharlie({ currency: 'USD' });
console.log('Charlie initialized for currency:', charlie.config.currency);`,
              },
              {
                id: 'js',
                label: 'JavaScript (ESM)',
                language: 'javascript',
                filename: 'verify.mjs',
                code: `import { createCharlie } from 'charlie-the-business-advisor';

const charlie = createCharlie({ currency: 'USD' });
console.log('Charlie initialized for currency:', charlie.config.currency);`,
              },
            ]}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'quick-start',
    href: '/docs/quick-start',
    title: 'Quick Start',
    description:
      'Analyze sample orders, understand the returned numbers, and generate your first simulated advisory insight in 5 minutes.',
    group: 'Getting Started',
    headings: [
      { id: 'what-we-are-building', title: 'What We Are Doing & Why' },
      { id: 'step-by-step', title: 'Step-by-Step Tutorial' },
      { id: 'expected-output', title: 'Expected Result & Meaning' },
      { id: 'next-steps', title: 'What Should I Do Next?' },
    ],
    searchKeywords: [
      'quick start',
      'tutorial',
      'beginner',
      'first analytics',
      'sample orders',
    ],
    markdownSummary: `# Quick Start\n\nAnalyze your first set of orders and generate a simulated recommendation without needing a database or API key.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="what-we-are-building" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What We Are Doing &amp; Why
          </h2>
          <p>
            In this guide, we will pass three sample customer orders into Charlie to
            compute net revenue, average order value, and a simulated advisory note. You
            only need Node.js installed—no database connection or paid AI key is needed.
          </p>
        </section>

        <section id="step-by-step" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Step-by-Step Tutorial
          </h2>
          <StepGuide
            steps={[
              {
                title: 'Install Charlie',
                description: 'Add Charlie to a new or existing Node.js project.',
                content: <PackageManagerTabs />,
              },
              {
                title: 'Create sample orders in minor units',
                description:
                  'Notice how $120.00 is written as 12000 (cents). Using whole integers avoids decimal rounding bugs.',
                content: (
                  <CodeBlock
                    language="typescript"
                    filename="quick-start.ts"
                    showLineNumbers
                    illustrativeLabel="Illustrative SDK Example"
                    code={`import {
  createCharlie,
  MockProvider,
  CharlieOrder,
} from 'charlie-the-business-advisor';

const sampleOrders: CharlieOrder[] = [
  {
    id: 'ord_001',
    customerId: 'cus_alice',
    totalMinor: 12000, // $120.00
    currency: 'USD',
    status: 'paid',
    createdAt: '2026-10-10T09:30:00Z',
  },
  {
    id: 'ord_002',
    customerId: 'cus_bob',
    totalMinor: 8500, // $85.00
    currency: 'USD',
    status: 'paid',
    createdAt: '2026-10-14T15:10:00Z',
  },
  {
    id: 'ord_003',
    customerId: 'cus_alice',
    totalMinor: 15500, // $155.00
    currency: 'USD',
    status: 'paid',
    createdAt: '2026-10-25T11:45:00Z',
  },
];`}
                  />
                ),
              },
              {
                title: 'Run analytics and request a mock recommendation',
                description:
                  'Initialize Charlie with MockProvider so you can inspect the full advisory structure offline.',
                content: (
                  <CodeBlock
                    language="typescript"
                    filename="quick-start.ts (continued)"
                    illustrativeLabel="Illustrative SDK Example"
                    code={`async function run() {
  const charlie = createCharlie({
    currency: 'USD',
    aiProvider: new MockProvider(),
  });

  const snapshot = charlie.analytics.createSnapshot({ orders: sampleOrders });
  const advice = await charlie.advisor.recommend(snapshot);

  console.log({ revenue: snapshot.revenue, advice });
}

run();`}
                  />
                ),
              },
            ]}
          />
        </section>

        <section id="expected-output" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Expected Result &amp; Meaning
          </h2>
          <ExampleResponse
            title="Console Output (JSON)"
            note="Simulated MockProvider Output"
            json={`{
  "revenue": {
    "currency": "USD",
    "netRevenueMinor": 36000,
    "netRevenueFormatted": "$360.00",
    "paidOrderCount": 3,
    "averageOrderValueMinor": 12000,
    "averageOrderValueFormatted": "$120.00"
  },
  "advice": {
    "isSimulated": true,
    "provider": "mock",
    "recommendations": [
      {
        "priority": "medium",
        "title": "Simulated: Strong repeat purchase share from top buyer",
        "evidence": "Customer cus_alice accounts for 76.4% ($275.00) of sample revenue."
      }
    ]
  }
}`}
            explanations={[
              {
                field: 'netRevenueMinor (36000)',
                meaning:
                  'Exact sum of paid orders in cents ($120 + $85 + $155 = $360.00).',
              },
              {
                field: 'averageOrderValueFormatted',
                meaning:
                  'Human-ready currency string ($360.00 ÷ 3 paid orders = $120.00).',
              },
              {
                field: 'advice.isSimulated (true)',
                meaning:
                  'Confirms this response came from MockProvider for local testing rather than a live LLM.',
              },
            ]}
          />
        </section>

        <section id="next-steps" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            What Should I Do Next?
          </h2>
          <p>
            Now that you have run your first snapshot, learn how{' '}
            <Link
              href="/docs/adapters/overview"
              className="font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
            >
              Data Adapters
            </Link>{' '}
            map your real database columns into <code className="font-mono text-xs">CharlieOrder</code>{' '}
            records, or explore{' '}
            <Link
              href="/docs/analytics/rfm"
              className="font-medium text-emerald-700 underline underline-offset-4 dark:text-emerald-400"
            >
              RFM Customer Segmentation
            </Link>
            .
          </p>
        </section>
      </div>
    ),
  },
  {
    slug: 'core-concepts',
    href: '/docs/core-concepts',
    title: 'Core Concepts',
    description:
      'Understand the four foundational building blocks behind Charlie: Datasets, Adapters, Deterministic Analytics, and Snapshots.',
    group: 'Core Concepts',
    headings: [
      { id: 'minor-currency-units', title: '1. Minor Currency Units' },
      { id: 'adapters-pattern', title: '2. Non-Invasive Data Adapters' },
      { id: 'snapshots', title: '3. Business Snapshots' },
      { id: 'optional-ai-layer', title: '4. Grounded Optional AI' },
    ],
    searchKeywords: [
      'core concepts',
      'minor units',
      'cents',
      'kobo',
      'snapshots',
      'deterministic',
    ],
    markdownSummary: `# Core Concepts\n\n1. **Minor Currency Units**: Integer amounts prevent floating-point rounding errors.\n2. **Data Adapters**: Map your existing columns cleanly.\n3. **Snapshots**: Portable JSON summaries of business health.\n4. **Grounded Optional AI**: LLMs interpret verified snapshots rather than raw rows.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="minor-currency-units" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            1. Minor Currency Units
          </h2>
          <p>
            In JavaScript, <code className="font-mono text-xs">0.1 + 0.2</code> evaluates
            to <code className="font-mono text-xs">0.30000000000000004</code>. Over
            thousands of orders, floating-point math introduces penny discrepancies.
          </p>
          <p>
            Following the same convention as Stripe and modern payment ledgers, Charlie
            stores and computes monetary amounts in <strong>integer minor units</strong>:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>USD / EUR / GBP:</strong> <code className="font-mono text-xs">$75.00</code>{' '}
              → <code className="font-mono text-xs">7500</code> cents
            </li>
            <li>
              <strong>NGN:</strong> <code className="font-mono text-xs">₦7,500.00</code>{' '}
              → <code className="font-mono text-xs">750000</code> kobo
            </li>
            <li>
              <strong>Zero-decimal currencies (e.g., JPY):</strong>{' '}
              <code className="font-mono text-xs">¥1,500</code> →{' '}
              <code className="font-mono text-xs">1500</code>
            </li>
          </ul>
        </section>

        <section id="adapters-pattern" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            2. Non-Invasive Data Adapters
          </h2>
          <p>
            Every application names fields differently (<code className="font-mono text-xs">order_total</code>,{' '}
            <code className="font-mono text-xs">amount_paid</code>,{' '}
            <code className="font-mono text-xs">grandTotal</code>). Instead of asking you
            to alter your database, Charlie Adapters translate your existing objects into{' '}
            <code className="font-mono text-xs">CharlieOrder</code> and{' '}
            <code className="font-mono text-xs">CharlieCustomer</code> interfaces in
            memory.
          </p>
        </section>

        <section id="snapshots" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            3. Business Snapshots
          </h2>
          <p>
            A <strong>Business Snapshot</strong> combines revenue totals, period trends,
            Pareto rankings, and RFM customer cohorts into a single serializable JSON
            document. You can cache snapshots in Redis, return them from REST/GraphQL
            endpoints, or pass them into an AI Advisor.
          </p>
        </section>

        <section id="optional-ai-layer" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            4. Grounded Optional AI
          </h2>
          <Callout variant="important" title="Privacy & accuracy by design">
            When you call <code className="font-mono text-xs">charlie.advisor.recommend(snapshot)</code>,
            Charlie sends aggregate metrics—not raw customer emails, phone numbers, or
            street addresses—to your configured AI provider.
          </Callout>
        </section>
      </div>
    ),
  },
];
