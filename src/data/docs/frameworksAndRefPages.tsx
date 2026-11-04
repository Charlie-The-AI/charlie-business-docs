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
          'In a client-side React SPA, you can use the official @charlie-the-ai/advisor-react package for turn-key hooks (useBusinessAnalytics, useAdvisorChat) and pre-built accessible dashboard components (RevenueCard, ParetoChart, CustomerSegments), or run math-only analytics with charlie-the-business-advisor. Secret AI API keys must NEVER be placed in browser code.',
        folderTree: `src/
├── components/
│   └── DashboardOverview.tsx
├── hooks/
│   └── useMerchantSnapshot.ts   # Fetches JSON from your backend API
└── App.tsx`,
        codeLanguage: 'typescript',
        codeFilename: 'src/components/DashboardOverview.tsx',
        code: `import React from 'react';
import { useBusinessAnalytics, RevenueCard, ParetoChart } from '@charlie-the-ai/advisor-react';
import type { CharlieOrder } from '@charlie-the-ai/advisor-types';

export function DashboardOverview({ orders }: { orders: CharlieOrder[] }) {
  // Turn-key React hook for deterministic metrics computation
  const { revenue, pareto, loading } = useBusinessAnalytics({ orders, currency: 'USD' });

  if (loading) return <div>Computing analytics...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {revenue && <RevenueCard data={revenue} />}
      {pareto && <ParetoChart data={pareto} />}
    </div>
  );
}`,
        securityNote:
          'CRITICAL: Never pass OPENAI_API_KEY, GEMINI_API_KEY, or ANTHROPIC_API_KEY into browser React components or client env vars. Anyone inspecting browser network traffic could steal your key. Always proxy AI advisory calls through your backend.',
        commonMistakes: [
          'Putting AI API keys in .env with a VITE_ prefix (which bundles secrets publicly into client JavaScript).',
          'Running heavy analytics inside render without useMemo when order arrays are large.',
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
import { createCharlie, createOrderAdapter } from 'charlie-the-business-advisor';

const app = express();
app.use(express.json({ limit: '5mb' }));

const mapLaravelOrders = createOrderAdapter({
  id: (row: any) => String(row.id),
  customerId: (row: any) => String(row.user_id),
  totalMinor: (row: any) => Number(row.total_cents),
  currency: (row: any) => row.currency ?? 'USD',
  status: (row: any) => (row.status === 'completed' ? 'paid' : 'pending'),
  createdAt: (row: any) => row.created_at,
});

app.post('/snapshot', (req, res) => {
  const charlie = createCharlie({ currency: req.body.currency || 'USD' });
  const orders = mapLaravelOrders(req.body.orders ?? []);
  res.json(charlie.analytics.createSnapshot({ orders }));
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
      'Reference overview of Charlie configuration options, analytics methods, adapters, and advisor interfaces.',
    group: 'API Reference',
    headings: [
      { id: 'create-charlie-config', title: 'createCharlie(options)' },
      { id: 'analytics-methods', title: 'charlie.analytics Methods' },
      { id: 'advisor-methods', title: 'charlie.advisor Methods' },
    ],
    searchKeywords: [
      'api reference',
      'createCharlie',
      'calculateRevenue',
      'calculatePareto',
      'calculateRFM',
      'types',
    ],
    markdownSummary: `# SDK API Reference\n\nIllustrative reference for \`createCharlie\`, \`charlie.analytics\`, and \`charlie.advisor\`.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <Callout variant="note" title="Illustrative SDK specification">
          The signatures below document the intended TypeScript interface design for
          connecting this documentation portal to the canonical{' '}
          <code className="font-mono text-xs">charlie-the-business-advisor</code> package.
        </Callout>

        <section id="create-charlie-config" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            createCharlie(options)
          </h2>
          <ApiTable
            rows={[
              {
                property: 'currency',
                type: 'string',
                required: true,
                description: 'Default ISO 4217 currency code (e.g., "USD", "EUR", "NGN").',
              },
              {
                property: 'aiProvider',
                type: 'CharlieAIProvider',
                required: false,
                defaultValue: 'undefined',
                description:
                  'Optional instance of OpenAIProvider, GeminiProvider, AnthropicProvider, or MockProvider.',
              },
              {
                property: 'timezone',
                type: 'string',
                required: false,
                defaultValue: "'UTC'",
                description: 'IANA timezone used when bucketing daily or monthly trends.',
              },
            ]}
          />
        </section>

        <section id="analytics-methods" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            charlie.analytics Methods
          </h2>
          <ApiTable
            rows={[
              {
                property: 'calculateRevenue(orders)',
                type: '(orders: CharlieOrder[]) => RevenueResult',
                required: true,
                description:
                  'Computes gross revenue, refunds, net revenue, paid count, and AOV.',
              },
              {
                property: 'calculatePareto(orders, opts?)',
                type: '(orders, ParetoOptions) => ParetoResult',
                required: true,
                description:
                  'Identifies top customers or products responsible for thresholdPercent (default 80%).',
              },
              {
                property: 'calculateRFM(orders, opts?)',
                type: '(orders, RFMOptions) => RFMResult',
                required: true,
                description:
                  'Scores customers 1–5 on Recency, Frequency, and Monetary spend.',
              },
              {
                property: 'calculateTrends(orders, opts?)',
                type: '(orders, TrendOptions) => TrendResult',
                required: true,
                description:
                  'Groups orders by day, week, or month and computes growth percentage.',
              },
              {
                property: 'createSnapshot(input)',
                type: '(SnapshotInput) => BusinessSnapshot',
                required: true,
                description:
                  'Combines all core analytics into one serializable JSON document.',
              },
            ]}
          />
        </section>

        <section id="advisor-methods" className="scroll-mt-24">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            charlie.advisor Methods
          </h2>
          <ApiTable
            rows={[
              {
                property: 'recommend(snapshot, opts?)',
                type: 'Promise<AdvisoryRecommendations>',
                required: false,
                description:
                  'Generates prioritized recommendations using the configured aiProvider.',
              },
              {
                property: 'ask({ snapshot, question })',
                type: 'Promise<AdvisoryAnswer>',
                required: false,
                description:
                  'Answers a natural-language business question grounded in the snapshot.',
              },
            ]}
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
