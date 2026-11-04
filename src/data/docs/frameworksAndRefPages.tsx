import React from 'react';
import { DocPageData } from '../docsTypes';
import { CodeBlock } from '../../components/docs/CodeBlock';
import { Callout } from '../../components/docs/Callout';
import { ApiTable } from '../../components/docs/ApiTable';
import { PackageManagerTabs } from '../../components/docs/Tabs';

function renderFrameworkGuide(opts: {
  framework: string;
  overview: string;
  folderTree: string;
  codeLanguage: 'typescript' | 'php';
  codeFilename: string;
  code: string;
  companionCode?: { filename: string; language: 'typescript' | 'php'; code: string };
  securityNote: string;
  commonMistakes: string[];
}) {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      <section id="overview" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">Overview</h2>
        <p>{opts.overview}</p>
      </section>

      <section id="installation" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Installation
        </h2>
        <PackageManagerTabs />
      </section>

      <section id="folder-structure" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Recommended Folder Structure
        </h2>
        <CodeBlock language="text" filename="Project Layout" code={opts.folderTree} />
      </section>

      <section id="example-integration" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Example Integration &amp; Sample Data
        </h2>
        <CodeBlock
          language={opts.codeLanguage}
          filename={opts.codeFilename}
          showLineNumbers
          illustrativeLabel="Illustrative Integration Example"
          code={opts.code}
        />
        {opts.companionCode && (
          <CodeBlock
            language={opts.companionCode.language}
            filename={opts.companionCode.filename}
            showLineNumbers
            illustrativeLabel="Companion Service Example"
            code={opts.companionCode.code}
          />
        )}
      </section>

      <section id="expected-result" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Expected Result
        </h2>
        <CodeBlock
          language="json"
          filename="HTTP 200 JSON Response"
          code={`{
  "currency": "USD",
  "netRevenueFormatted": "$240.00",
  "paidOrderCount": 2,
  "rfmChampionsCount": 1
}`}
        />
      </section>

      <section id="security" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Security Considerations
        </h2>
        <Callout variant="important" title={`${opts.framework} security checklist`}>
          {opts.securityNote}
        </Callout>
      </section>

      <section id="common-mistakes" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Common Mistakes
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {opts.commonMistakes.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const FRAMEWORK_HEADINGS = [
  { id: 'overview', title: 'Overview' },
  { id: 'installation', title: 'Installation' },
  { id: 'folder-structure', title: 'Recommended Folder Structure' },
  { id: 'example-integration', title: 'Example Integration' },
  { id: 'expected-result', title: 'Expected Result' },
  { id: 'security', title: 'Security Considerations' },
  { id: 'common-mistakes', title: 'Common Mistakes' },
];

export const FRAMEWORKS_AND_REF_PAGES: DocPageData[] = [
  {
    slug: 'frameworks/nodejs',
    href: '/docs/frameworks/nodejs',
    title: 'Node.js Guide',
    description:
      'Use Charlie inside Express, Fastify, Hono, background workers, or scheduled CLI scripts.',
    group: 'Framework Guides',
    headings: FRAMEWORK_HEADINGS,
    searchKeywords: ['nodejs', 'express', 'fastify', 'backend', 'server'],
    markdownSummary: `# Node.js Guide\n\nIntegrate Charlie directly into Express, Fastify, or standalone Node.js worker scripts.`,
    render: () =>
      renderFrameworkGuide({
        framework: 'Node.js',
        overview:
          'Node.js is Charlie’s native runtime. You can run analytics inside Express/Fastify HTTP endpoints, BullMQ background jobs, or nightly cron reporting scripts.',
        folderTree: `src/
├── analytics/
│   ├── charlie.ts          # Singleton Charlie instance & provider config
│   └── orderAdapter.ts     # Maps SQL rows -> CharlieOrder[]
├── routes/
│   └── dashboard.ts        # GET /api/merchant/snapshot
└── server.ts`,
        codeLanguage: 'typescript',
        codeFilename: 'src/routes/dashboard.ts',
        code: `import express from 'express';
import { createCharlie, CharlieOrder } from 'charlie-the-business-advisor';

const router = express.Router();
const charlie = createCharlie({ currency: 'USD' });

router.get('/api/merchant/snapshot', async (req, res) => {
  const sampleOrders: CharlieOrder[] = [
    { id: '1', customerId: 'c1', totalMinor: 15000, currency: 'USD', status: 'paid', createdAt: '2026-10-20T10:00:00Z' },
    { id: '2', customerId: 'c1', totalMinor: 9000,  currency: 'USD', status: 'paid', createdAt: '2026-10-28T12:00:00Z' },
  ];

  const snapshot = charlie.analytics.createSnapshot({ orders: sampleOrders });
  res.json({
    currency: snapshot.revenue.currency,
    netRevenueFormatted: snapshot.revenue.netRevenueFormatted,
    paidOrderCount: snapshot.revenue.paidOrderCount,
    rfmChampionsCount: snapshot.rfm.segments.Champions?.count ?? 0,
  });
});`,
        securityNote:
          'Always scope database queries by the authenticated tenant/merchant ID before passing orders into Charlie so tenants never see cross-account analytics.',
        commonMistakes: [
          'Loading millions of historical orders into memory unpaginated instead of querying the desired date window (e.g., last 90 or 365 days).',
          'Re-running LLM recommendations on every HTTP request without short-TTL caching.',
        ],
      }),
  },
  {
    slug: 'frameworks/nestjs',
    href: '/docs/frameworks/nestjs',
    title: 'NestJS Guide',
    description:
      'Wrap Charlie as an injectable NestJS provider for clean dependency injection and unit testing.',
    group: 'Framework Guides',
    headings: FRAMEWORK_HEADINGS,
    searchKeywords: ['nestjs', 'injectable', 'module', 'dependency injection', 'service'],
    markdownSummary: `# NestJS Guide\n\nRegister Charlie inside an \`@Injectable()\` NestJS service and swap \`MockProvider\` effortlessly in Jest tests.`,
    render: () =>
      renderFrameworkGuide({
        framework: 'NestJS',
        overview:
          'Charlie fits naturally into NestJS modular architecture. Encapsulate Charlie inside an @Injectable() AnalyticsService and inject ConfigService for optional AI provider credentials.',
        folderTree: `src/
├── advisor/
│   ├── advisor.module.ts
│   ├── advisor.service.ts
│   └── advisor.controller.ts
└── app.module.ts`,
        codeLanguage: 'typescript',
        codeFilename: 'src/advisor/advisor.service.ts',
        code: `import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCharlie, OpenAIProvider, MockProvider, CharlieOrder } from 'charlie-the-business-advisor';

@Injectable()
export class AdvisorService {
  private charlie;

  constructor(private config: ConfigService) {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    this.charlie = createCharlie({
      currency: 'USD',
      aiProvider: apiKey ? new OpenAIProvider({ apiKey }) : new MockProvider(),
    });
  }

  getMerchantSummary(orders: CharlieOrder[]) {
    return this.charlie.analytics.createSnapshot({ orders });
  }
}`,
        securityNote:
          'Protect your AdvisorController endpoints with NestJS AuthGuards and validate tenant ownership on every request.',
        commonMistakes: [
          'Instantiating a new AI provider client on every method call instead of once in the service constructor.',
          'Returning raw database entities directly without running them through your OrderAdapter.',
        ],
      }),
  },
  {
    slug: 'frameworks/nextjs',
    href: '/docs/frameworks/nextjs',
    title: 'Next.js Guide',
    description:
      'Run Charlie inside Next.js Server Components, Server Actions, and App Router Route Handlers.',
    group: 'Framework Guides',
    headings: FRAMEWORK_HEADINGS,
    searchKeywords: [
      'nextjs',
      'app router',
      'server components',
      'client components',
      'route handlers',
    ],
    markdownSummary: `# Next.js Guide\n\nExecute database adapters and AI providers in Server Components or Route Handlers, and pass serializable JSON props to Client Components for charts.`,
    render: () =>
      renderFrameworkGuide({
        framework: 'Next.js',
        overview:
          'In Next.js App Router, run Charlie inside Server Components or Route Handlers (app/api/*/route.ts) where database connections and secret AI keys live safely, then pass the plain JSON Snapshot to Client Components ("use client") for interactive charts.',
        folderTree: `app/
├── dashboard/
│   ├── page.tsx            # Server Component (runs Charlie)
│   └── RevenueChart.tsx    # Client Component ("use client" UI)
└── api/
    └── ask-charlie/
        └── route.ts        # Server Route Handler for AI chat`,
        codeLanguage: 'typescript',
        codeFilename: 'app/dashboard/page.tsx',
        code: `// Server Component — runs exclusively on the server
import { createCharlie, CharlieOrder } from 'charlie-the-business-advisor';
import { RevenueChart } from './RevenueChart';

export default async function DashboardPage() {
  const orders: CharlieOrder[] = [
    { id: '101', customerId: 'c1', totalMinor: 15000, currency: 'USD', status: 'paid', createdAt: '2026-10-12T09:00:00Z' },
    { id: '102', customerId: 'c2', totalMinor: 9000,  currency: 'USD', status: 'paid', createdAt: '2026-10-25T16:30:00Z' },
  ];

  const charlie = createCharlie({ currency: 'USD' });
  const snapshot = charlie.analytics.createSnapshot({ orders });

  return <RevenueChart snapshot={snapshot} />;
}`,
        securityNote:
          'Never prefix AI provider keys with NEXT_PUBLIC_. Keep OPENAI_API_KEY, GEMINI_API_KEY, and ANTHROPIC_API_KEY strictly server-only.',
        commonMistakes: [
          'Importing server-side database queries or AI provider secrets inside a file marked with "use client".',
          'Forgetting to cache expensive AI recommendation calls with unstable_cache or Route Handler revalidation.',
        ],
      }),
  },
  {
    slug: 'frameworks/react',
    href: '/docs/frameworks/react',
    title: 'React SPA Guide',
    description:
      'Render Charlie analytics in React Single-Page Applications while keeping AI API keys strictly on your backend.',
    group: 'Framework Guides',
    headings: FRAMEWORK_HEADINGS,
    searchKeywords: ['react', 'vite', 'spa', 'browser security', 'api keys'],
    markdownSummary: `# React Guide\n\nUse Charlie's deterministic analytics or consume backend Snapshot JSON in React. Never embed secret AI API keys in browser code.`,
    render: () =>
      renderFrameworkGuide({
        framework: 'React',
        overview:
          'In a client-side React SPA, use the official @charlie-the-ai/advisor-react package for turn-key hooks (useBusinessAnalytics, useAdvisorChat) and pre-built accessible visualization components (RevenueCard, ParetoChart, CustomerSegments, MetricBadge), or run math-only analytics with charlie-the-business-advisor. Secret AI API keys must NEVER be placed in browser code.',
        folderTree: `src/
├── components/
│   └── DashboardOverview.tsx
├── providers/
│   └── CharlieAppProvider.tsx
└── App.tsx`,
        codeLanguage: 'typescript',
        codeFilename: 'src/components/DashboardOverview.tsx',
        code: `import React from 'react';
import {
  useBusinessAnalytics,
  RevenueCard,
  ParetoChart,
  CustomerSegments,
  MetricBadge,
} from '@charlie-the-ai/advisor-react';
import type { Order } from '@charlie-the-ai/advisor-types';

export function DashboardOverview({ orders }: { orders: Order[] }) {
  // Turn-key React hook for deterministic metrics computation
  const { sales, pareto, customers, hasData } = useBusinessAnalytics(orders, {
    currency: 'USD',
    paretoThresholdPercentage: 80,
  });

  if (!hasData || !sales) {
    return <div>No order data available for analysis.</div>;
  }

  return (
    <div className="space-y-6">
      {/* Metric KPI Badges */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricBadge
          label="Net Revenue"
          value={sales.netRevenueFormatted}
          changePercentage={sales.periodComparison?.netRevenueChangePercentage}
        />
        <MetricBadge
          label="Total Orders"
          value={sales.totalOrders.toLocaleString()}
          changePercentage={sales.periodComparison?.ordersChangePercentage}
        />
        <MetricBadge
          label="Average Order Value"
          value={sales.averageOrderValueFormatted}
        />
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pareto && (
          <ParetoChart
            contributors={pareto.contributors}
            targetThresholdPercentage={80}
          />
        )}
        {customers && <CustomerSegments segments={customers.segments} />}
      </div>
    </div>
  );
}`,
        securityNote:
          'CRITICAL: Never pass OPENAI_API_KEY, GEMINI_API_KEY, or ANTHROPIC_API_KEY into browser React components or client env vars. Anyone inspecting browser network traffic could steal your key. Always proxy AI advisory calls through your backend.',
        commonMistakes: [
          'Putting AI API keys in .env with a VITE_ or NEXT_PUBLIC_ prefix (which bundles secrets publicly into client JavaScript).',
          'Running heavy analytics inside render without useMemo when order arrays are large (useBusinessAnalytics memoizes internally).',
        ],
      }),
  },
  {
    slug: 'frameworks/laravel',
    href: '/docs/frameworks/laravel',
    title: 'Laravel Integration Guide',
    description:
      'Connect Laravel PHP applications to Charlie using an internal Node.js runtime microservice.',
    group: 'Framework Guides',
    headings: FRAMEWORK_HEADINGS,
    searchKeywords: ['laravel', 'php', 'microservice', 'sidecar', 'nodejs runtime'],
    markdownSummary: `# Laravel Integration Guide\n\nBecause Charlie is a TypeScript/npm package, PHP cannot import it directly. Integrate Laravel cleanly via a lightweight internal Node.js HTTP service.`,
    render: () =>
      renderFrameworkGuide({
        framework: 'Laravel',
        overview:
          'Charlie is distributed as a TypeScript/JavaScript package on npm, so PHP cannot import it directly inside Composer. Laravel teams integrate Charlie by running a tiny internal Node.js sidecar service (or serverless function) and calling it from Laravel via Http::post().',
        folderTree: `project-root/
├── laravel-app/
│   └── app/Services/CharlieBridgeService.php
└── charlie-node-service/         # Internal Node.js runtime
    ├── package.json
    └── server.ts`,
        codeLanguage: 'php',
        codeFilename: 'laravel-app/app/Services/CharlieBridgeService.php',
        code: `<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Http;

class CharlieBridgeService
{
    public function analyzeOrders(array $eloquentOrders): array
    {
        $response = Http::timeout(10)
            ->withToken(config('services.charlie_sidecar.secret'))
            ->post(config('services.charlie_sidecar.url') . '/snapshot', [
                'currency' => 'USD',
                'orders' => $eloquentOrders,
            ]);

        $response->throw();
        return $response->json();
    }
}`,
        companionCode: {
          filename: 'charlie-node-service/server.ts',
          language: 'typescript',
          code: `import express from 'express';
import { createCharlie, createLaravelOrderAdapter } from 'charlie-the-business-advisor';

const app = express();
app.use(express.json({ limit: '5mb' }));

const laravelAdapter = createLaravelOrderAdapter('USD');
const charlie = createCharlie({ defaultCurrency: 'USD' });

app.post('/snapshot', (req, res) => {
  const { orders } = laravelAdapter.normalizeBatch(req.body.orders ?? []);
  const snapshot = charlie.analyze({ orders });
  res.json(snapshot);
});

app.listen(4100);`,
        },
        securityNote:
          'Bind the internal Node.js sidecar to a private VPC/Docker network (127.0.0.1 or internal service mesh) and verify a shared bearer token between Laravel and the Node service.',
        commonMistakes: [
          'Attempting to run npm install inside PHP without a Node.js runtime process.',
          'Exposing the internal Node sidecar port publicly to the internet without authentication.',
        ],
      }),
  },
  {
    slug: 'api-reference',
    href: '/docs/api-reference',
    title: 'SDK API Reference',
    description:
      'Authoritative reference for Charlie constructor options, high-level analytics methods, AI advisory, React components, and CLI commands.',
    group: 'API Reference',
    headings: [
      { id: 'create-charlie-config', title: 'Charlie Client & Configuration' },
      { id: 'analytics-methods', title: 'Core Analytics Methods' },
      { id: 'ai-advisory-methods', title: 'AI Advisory & Chat Methods' },
      { id: 'adapters-and-money', title: 'Adapters & Money Helper' },
      { id: 'react-components-hooks', title: 'React Hooks & Visual Components' },
      { id: 'developer-cli', title: 'Developer CLI Commands' },
    ],
    searchKeywords: [
      'api reference',
      'createCharlie',
      'Charlie',
      'analyze',
      'advise',
      'chat',
      'sales',
      'pareto',
      'customers',
      'products',
      'trends',
      'money',
      'adapters',
      'hooks',
      'components',
      'cli',
    ],
    markdownSummary: `# SDK API Reference\n\nAuthoritative reference for the unified Charlie client, deterministic analytics engine, multi-provider AI advisor, React components, and developer CLI.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <Callout variant="tip" title="Unified Charlie Ecosystem">
          All primitives below can be imported directly from the top-level{' '}
          <code className="font-mono text-xs">charlie-the-business-advisor</code> package or their
          specialized modular packages (<code className="font-mono text-xs">@charlie-the-ai/analytics-core</code>,{' '}
          <code className="font-mono text-xs">@charlie-the-ai/advisor-ai</code>,{' '}
          <code className="font-mono text-xs">@charlie-the-ai/advisor-react</code>).
        </Callout>

        <section id="create-charlie-config" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Charlie Client &amp; Configuration
          </h2>
          <p className="mb-4">
            Initialize Charlie via <code className="font-mono text-xs">createCharlie(config)</code> or{' '}
            <code className="font-mono text-xs">new Charlie(config)</code>:
          </p>
          <ApiTable
            rows={[
              {
                property: 'defaultCurrency',
                type: 'CurrencyCode',
                required: false,
                defaultValue: "'NGN'",
                description: 'Default ISO 4217 currency code (e.g., "USD", "EUR", "NGN", "GBP").',
              },
              {
                property: 'businessId',
                type: 'string',
                required: false,
                defaultValue: "'default_business'",
                description: 'Identifier for the business entity generating snapshots.',
              },
              {
                property: 'ai',
                type: 'ProviderConfig | CharlieAiProvider',
                required: false,
                defaultValue: 'MockProvider (offline)',
                description:
                  'AI provider instance (OpenAIProvider, GeminiProvider, AnthropicProvider, MockProvider) or auto-resolved from process.env.',
              },
            ]}
          />
        </section>

        <section id="analytics-methods" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Core Analytics Methods
          </h2>
          <p className="mb-4">
            Deterministic, 100% offline mathematical analytics with zero AI hallucinations:
          </p>
          <ApiTable
            rows={[
              {
                property: 'analyze(options)',
                type: '(options: AnalyzeOptions) => AnalyticsSnapshot',
                required: true,
                description:
                  'Generates a comprehensive, hash-verified snapshot covering sales, Pareto, RFM cohorts, and trends in a single pass.',
              },
              {
                property: 'sales(orders, currency?)',
                type: '(orders, currency?) => SalesSummary',
                required: true,
                description:
                  'Computes gross revenue, refunds, net revenue, order volume, AOV, and periodic breakdowns.',
              },
              {
                property: 'pareto(orders, dimension, currency?, threshold?)',
                type: '(orders, dimension, currency?, threshold?) => ParetoResult',
                required: true,
                description:
                  'Calculates 80/20 concentration across "product", "customer", or "category" with Gini coefficient.',
              },
              {
                property: 'customers(orders, customers?, currency?)',
                type: '(orders, customers?, currency?) => CustomerAnalytics',
                required: true,
                description:
                  'Performs quintile RFM segmentation (Champions, Loyal, At-Risk, etc.) and repeat customer rates.',
              },
              {
                property: 'products(orders, currency?)',
                type: '(orders, currency?) => ProductAnalytics',
                required: true,
                description:
                  'Analyzes SKU unit sales velocity, revenue contribution, and profit margins.',
              },
              {
                property: 'trends(orders, currency?)',
                type: '(orders, currency?) => TrendAnalytics',
                required: true,
                description:
                  'Calculates 7-day and 30-day moving averages (SMA) and rolling z-score statistical anomaly detection.',
              },
            ]}
          />
        </section>

        <section id="ai-advisory-methods" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            AI Advisory &amp; Chat Methods
          </h2>
          <p className="mb-4">
            Evidence-grounded business interpretation with automated mathematical claim cross-checks:
          </p>
          <ApiTable
            rows={[
              {
                property: 'advise(options)',
                type: '(options: AdviseOptions) => Promise<AdviseResult>',
                required: false,
                description:
                  'Generates prioritized business recommendations with evidence backing, action steps, estimated impact, and groundingScore validation.',
              },
              {
                property: 'chat(options)',
                type: '(options: ChatOptions) => Promise<ChatResult>',
                required: false,
                description:
                  'Answers natural-language merchant questions strictly grounded in snapshot metrics, complete with citation references.',
              },
            ]}
          />
        </section>

        <section id="adapters-and-money" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Adapters &amp; Money Helper
          </h2>
          <ApiTable
            rows={[
              {
                property: 'money',
                type: 'Money (Utility Class)',
                required: true,
                description:
                  'Fixed-point arithmetic helper: Money.add(), Money.subtract(), Money.multiply(), Money.divide(), Money.format(), Money.toMinorUnits(), Money.toMajorUnits().',
              },
              {
                property: 'createOrderAdapter(config)',
                type: '(config) => OrderAdapter',
                required: true,
                description:
                  'Creates a declarative order adapter with decimal-to-minor conversion, normalizeBatch() error isolation, and deduplication.',
              },
              {
                property: 'createCustomerAdapter(config)',
                type: '(config) => CustomerAdapter',
                required: true,
                description:
                  'Creates a declarative customer adapter for normalizing buyer profiles and account cohorts.',
              },
              {
                property: 'laravelAdapter(currency?)',
                type: '(currency?) => OrderAdapter',
                required: true,
                description:
                  'Pre-configured adapter ready for Laravel Eloquent order schemas and relations.',
              },
            ]}
          />
        </section>

        <section id="react-components-hooks" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            React Hooks &amp; Visual Components
          </h2>
          <p className="mb-4">
            Exported from <code className="font-mono text-xs">@charlie-the-ai/advisor-react</code>:
          </p>
          <ApiTable
            rows={[
              {
                property: 'CharlieProvider',
                type: 'React.FC<{ config, children }>',
                required: true,
                description:
                  'Application context provider configuring default currency and timezone across dashboard components.',
              },
              {
                property: 'useBusinessAnalytics(orders, options)',
                type: 'Hook returning { sales, pareto, customers, hasData }',
                required: true,
                description:
                  'Memoized client-side calculation of sales summaries, Pareto curves, and customer RFM cohorts.',
              },
              {
                property: 'useBusinessRecommendations(options)',
                type: 'Hook returning { recommendations, loading, error, refresh }',
                required: true,
                description:
                  'Fetches and reacts to AI-generated business recommendations for a given merchant.',
              },
              {
                property: 'useAdvisorChat(options)',
                type: 'Hook returning { messages, input, setInput, sendMessage, loading }',
                required: true,
                description:
                  'Powers interactive conversational business chat interfaces with message history.',
              },
              {
                property: '<ParetoChart />',
                type: 'React.FC<{ contributors, targetThresholdPercentage? }>',
                required: true,
                description:
                  'Renders the 80/20 revenue concentration curve and cumulative distribution line.',
              },
              {
                property: '<MetricBadge />',
                type: 'React.FC<{ label, value, changePercentage?, trend? }>',
                required: true,
                description:
                  'Displays high-level KPI badges with period-over-period percentage badges.',
              },
              {
                property: '<RevenueCard />',
                type: 'React.FC<{ data }>',
                required: true,
                description:
                  'Displays comprehensive revenue metrics card including gross, refunds, net, and AOV.',
              },
              {
                property: '<CustomerSegments />',
                type: 'React.FC<{ segments }>',
                required: true,
                description:
                  'Visualizes RFM customer segmentation distribution across Champions, At-Risk, etc.',
              },
              {
                property: '<RecommendationWidget />',
                type: 'React.FC<{ recommendation, onApply? }>',
                required: true,
                description:
                  'Interactive recommendation card with action steps, impact rating, and evidence badges.',
              },
            ]}
          />
        </section>

        <section id="developer-cli" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Developer CLI Commands
          </h2>
          <p>
            Quickly scaffold or verify your Charlie integration from the command line:
          </p>
          <CodeBlock
            language="bash"
            filename="terminal"
            code={`# Interactive initialization wizard (generates charlie.config.ts)
npx charlie-the-business-advisor init

# Health check & diagnostic report (validates providers, keys, and packages)
npx charlie-the-business-advisor doctor`}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'faq',
    href: '/docs/faq',
    title: 'Frequently Asked Questions',
    description:
      'Straightforward answers about pricing, open-source licensing, data privacy, databases, and AI usage.',
    group: 'Help & Troubleshooting',
    headings: [
      { id: 'pricing-and-license', title: 'Is Charlie really completely free?' },
      { id: 'without-ai', title: 'Can I use Charlie without any AI provider?' },
      { id: 'data-privacy', title: 'Does Charlie send my database to a hosted server?' },
      { id: 'php-python', title: 'Can I use Charlie with non-Node backends?' },
    ],
    searchKeywords: ['faq', 'free', 'license', 'privacy', 'cost', 'offline', 'questions'],
    markdownSummary: `# FAQ\n\n- **Is Charlie free?** Yes, 100% free and open source.\n- **Do I need AI?** No, all analytics run deterministically without AI.\n- **Is there a Charlie backend?** No, Charlie runs inside your own application.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="pricing-and-license" className="scroll-mt-24 space-y-2">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Is Charlie really completely free?
          </h2>
          <p>
            Yes. Charlie the Business Advisor is free, open-source software with no paid
            tiers, seat limits, or feature gates. If you choose to connect an external LLM
            provider (OpenAI, Google Gemini, or Anthropic Claude), that provider bills
            your own API account directly.
          </p>
        </section>

        <section id="without-ai" className="scroll-mt-24 space-y-2">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Can I use Charlie without any AI provider?
          </h2>
          <p>
            Absolutely. Revenue calculations, average order value, Pareto 80/20 rankings,
            RFM customer segmentation, sales trends, and business snapshots are 100%
            deterministic TypeScript functions that require zero AI providers.
          </p>
        </section>

        <section id="data-privacy" className="scroll-mt-24 space-y-2">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Does Charlie send my database to a hosted Charlie server?
          </h2>
          <p>
            No. There is no Charlie-hosted backend or telemetry endpoint. Everything runs
            in-process inside your own server or application runtime.
          </p>
        </section>

        <section id="php-python" className="scroll-mt-24 space-y-2">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Can I use Charlie with Laravel or other non-Node backends?
          </h2>
          <p>
            Yes—by running Charlie inside a small internal Node.js companion service and
            calling it over internal HTTP from Laravel, Django, or Rails. See the
            dedicated Laravel Guide for a complete setup.
          </p>
        </section>
      </div>
    ),
  },
  {
    slug: 'troubleshooting',
    href: '/docs/troubleshooting',
    title: 'Troubleshooting',
    description:
      'Diagnose and fix the most common integration issues with amounts, dates, TypeScript types, and AI providers.',
    group: 'Help & Troubleshooting',
    headings: [
      { id: 'revenue-100x-off', title: 'Revenue Totals Look 100x Too Small or Large' },
      { id: 'invalid-iso-dates', title: 'Trends or RFM Throw Invalid Date Errors' },
      { id: 'ai-provider-undefined', title: 'Advisor Throws Missing Provider Error' },
    ],
    searchKeywords: [
      'troubleshooting',
      'errors',
      '100x',
      'cents',
      'invalid date',
      'debug',
    ],
    markdownSummary: `# Troubleshooting\n\nSolutions for minor-unit conversion mistakes, ISO 8601 date formatting, and missing AI provider configuration.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="revenue-100x-off" className="scroll-mt-24 space-y-3">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Revenue Totals Look 100x Too Small or Large
          </h2>
          <p>
            <strong>Cause:</strong> Passing decimal major units (e.g.,{' '}
            <code className="font-mono text-xs">49.99</code>) into{' '}
            <code className="font-mono text-xs">totalMinor</code> instead of integer cents
            (<code className="font-mono text-xs">4999</code>), or multiplying an
            already-in-cents Stripe amount by 100 a second time.
          </p>
          <CodeBlock
            language="typescript"
            filename="fix-minor-units.ts"
            code={`// If your DB stores $49.99 as a decimal:
totalMinor: Math.round(Number(row.amount_dollars) * 100) // -> 4999

// If your DB already stores cents (like Stripe amount_total = 4999):
totalMinor: row.amount_total // -> 4999 (do NOT multiply by 100)`}
          />
        </section>

        <section id="invalid-iso-dates" className="scroll-mt-24 space-y-3">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Trends or RFM Throw Invalid Date Errors
          </h2>
          <p>
            <strong>Cause:</strong> Passing locale-specific date strings like{' '}
            <code className="font-mono text-xs">&quot;31/10/2026&quot;</code> instead of
            ISO 8601 timestamps.
          </p>
          <p>
            <strong>Fix:</strong> Convert <code className="font-mono text-xs">Date</code>{' '}
            objects in your adapter via <code className="font-mono text-xs">row.createdAt.toISOString()</code>.
          </p>
        </section>

        <section id="ai-provider-undefined" className="scroll-mt-24 space-y-3">
          <h2 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
            Advisor Throws Missing Provider Error
          </h2>
          <p>
            <strong>Cause:</strong> Calling{' '}
            <code className="font-mono text-xs">charlie.advisor.recommend()</code> when{' '}
            <code className="font-mono text-xs">createCharlie()</code> was initialized
            without an <code className="font-mono text-xs">aiProvider</code>.
          </p>
          <p>
            <strong>Fix:</strong> Pass <code className="font-mono text-xs">new MockProvider()</code>{' '}
            during local development, or configure <code className="font-mono text-xs">OpenAIProvider</code>,{' '}
            <code className="font-mono text-xs">GeminiProvider</code>, or{' '}
            <code className="font-mono text-xs">AnthropicProvider</code> on your server.
          </p>
        </section>
      </div>
    ),
  },
];
