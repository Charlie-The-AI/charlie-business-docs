import React from 'react';
import { DocPageData } from '../docsTypes';
import { CodeBlock } from '../../components/docs/CodeBlock';
import { Callout } from '../../components/docs/Callout';
import { ExampleResponse } from '../../components/docs/ExampleResponse';

function renderProviderTemplate(opts: {
  name: string;
  className: string;
  envVar: string;
  defaultModel: string;
  requiresKey: boolean;
  overview: string;
  commonErrors: string[];
}) {
  return (
    <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
      <section id="what-it-does" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          What {opts.name} Does
        </h2>
        <p>{opts.overview}</p>
        <p>
          <strong>API Key Required:</strong>{' '}
          {opts.requiresKey
            ? `Yes (${opts.envVar} supplied from your server environment).`
            : 'No — runs 100% offline with zero network calls.'}
        </p>
      </section>

      {opts.requiresKey && (
        <section id="env-variable" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Environment Variable Example
          </h2>
          <CodeBlock
            language="bash"
            filename=".env"
            code={`# Store in server-side environment variables only (never commit to Git)
${opts.envVar}="your_secret_provider_key_here"`}
          />
        </section>
      )}

      <section id="configuration" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Configuration Example
        </h2>
        <CodeBlock
          language="typescript"
          filename={`${opts.className.toLowerCase()}-setup.ts`}
          showLineNumbers
          illustrativeLabel="Illustrative SDK Example"
          code={
            opts.requiresKey
              ? `import { createCharlie, ${opts.className} } from 'charlie-the-business-advisor';

const charlie = createCharlie({
  currency: 'USD',
  aiProvider: new ${opts.className}({
    apiKey: process.env.${opts.envVar}!,
    model: '${opts.defaultModel}',
    timeoutMs: 15000,
  }),
});`
              : `import { createCharlie, MockProvider } from 'charlie-the-business-advisor';

const charlie = createCharlie({
  currency: 'USD',
  aiProvider: new MockProvider({
    latencyMs: 50,
  }),
});`
          }
        />
      </section>

      <section id="sample-response" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Sample Response
        </h2>
        <ExampleResponse
          title={opts.requiresKey ? 'Live Provider Output Shape' : 'Simulated Mock Output'}
          note={opts.requiresKey ? 'Real LLM Reasoning' : 'Simulated Static Output'}
          json={
            opts.requiresKey
              ? `{
  "isSimulated": false,
  "provider": "${opts.name.toLowerCase().replace(/\s+/g, '-')}",
  "model": "${opts.defaultModel}",
  "recommendations": [
    {
      "priority": "high",
      "title": "Follow up with 14 At-Risk repeat buyers",
      "evidence": "RFM segment 'At-Risk' holds $9,800 in historical net spend with >45d inactivity.",
      "suggestedAction": "Trigger account check-in workflow."
    }
  ]
}`
              : `{
  "isSimulated": true,
  "provider": "mock",
  "notice": "Simulated response generated locally by MockProvider without AI reasoning.",
  "recommendations": [
    {
      "priority": "medium",
      "title": "[Simulated] Review top Pareto revenue contributors",
      "evidence": "Snapshot netRevenueMinor is 36000 across 3 paid orders.",
      "suggestedAction": "Configure OpenAI, Gemini, or Claude for live contextual advice."
    }
  ]
}`
          }
        />
      </section>

      <section id="common-errors" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Common Errors
        </h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {opts.commonErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </section>

      <section id="security-guidance" className="scroll-mt-24 space-y-3">
        <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
          Security Guidance
        </h2>
        <Callout variant="important" title="Keep provider credentials server-side">
          {opts.requiresKey
            ? `Never expose ${opts.envVar} in browser bundles (such as VITE_* or NEXT_PUBLIC_* variables). Always execute Charlie's AI provider inside a server route, background worker, or backend controller.`
            : 'MockProvider uses zero credentials and makes no outbound HTTP calls, making it safe for CI pipelines, local sandboxes, and automated integration tests.'}
        </Callout>
      </section>
    </div>
  );
}

export const AI_PAGES: DocPageData[] = [
  {
    slug: 'ai/overview',
    href: '/docs/ai/overview',
    title: 'AI Providers Overview & Comparison',
    description:
      'Compare OpenAI, Google Gemini, Anthropic Claude, and the offline Mock Provider.',
    group: 'AI Providers',
    headings: [
      { id: 'how-ai-works-in-charlie', title: 'How AI Works in Charlie' },
      { id: 'provider-comparison', title: 'Provider Comparison Table' },
      { id: 'real-vs-mock', title: 'Real AI Output vs. Simulated Mock Output' },
    ],
    searchKeywords: [
      'ai providers',
      'comparison',
      'openai',
      'gemini',
      'claude',
      'mock provider',
      'api key',
    ],
    markdownSummary: `# AI Providers Overview\n\nCharlie is free and open source. Choose OpenAI, Google Gemini, Anthropic Claude for real LLM reasoning, or MockProvider for simulated testing without API keys.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="how-ai-works-in-charlie" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            How AI Works in Charlie
          </h2>
          <p>
            AI in Charlie is completely optional. When configured, Charlie serializes your
            deterministic <strong>Business Snapshot</strong> into a structured prompt so
            your chosen model generates recommendations or answers questions grounded in
            verified math rather than guessing totals.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Charlie itself is 100% free. External AI providers bill your account directly
            based on token usage.
          </p>
        </section>

        <section id="provider-comparison" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Provider Comparison Table
          </h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-[#27272A]">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114]">
                <tr>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Provider
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    API Key Needed
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Reasoning Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Network Calls
                  </th>
                  <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-200">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white dark:divide-[#27272A] dark:bg-[#09090B]">
                <tr>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    OpenAI
                  </td>
                  <td className="px-4 py-3">Yes (<code className="font-mono">OPENAI_API_KEY</code>)</td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Real AI reasoning
                  </td>
                  <td className="px-4 py-3">api.openai.com</td>
                  <td className="px-4 py-3">Strict JSON schema adherence &amp; chat</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    Google Gemini
                  </td>
                  <td className="px-4 py-3">Yes (<code className="font-mono">GEMINI_API_KEY</code>)</td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Real AI reasoning
                  </td>
                  <td className="px-4 py-3">generativelanguage.googleapis.com</td>
                  <td className="px-4 py-3">Low-latency Flash summaries &amp; wide context</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    Anthropic Claude
                  </td>
                  <td className="px-4 py-3">Yes (<code className="font-mono">ANTHROPIC_API_KEY</code>)</td>
                  <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400">
                    Real AI reasoning
                  </td>
                  <td className="px-4 py-3">api.anthropic.com</td>
                  <td className="px-4 py-3">Nuanced written business narratives</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                    Mock Provider
                  </td>
                  <td className="px-4 py-3">No</td>
                  <td className="px-4 py-3 text-amber-700 dark:text-amber-400">
                    Simulated template (non-AI)
                  </td>
                  <td className="px-4 py-3">None (offline)</td>
                  <td className="px-4 py-3">Unit tests, CI pipelines &amp; UI prototyping</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="real-vs-mock" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Real AI Output vs. Simulated Mock Output
          </h2>
          <Callout variant="note" title="Distinguishing live vs. simulated responses">
            Every advisory response includes <code className="font-mono text-xs">isSimulated: boolean</code>.
            Real providers (<code className="font-mono text-xs">OpenAIProvider</code>,{' '}
            <code className="font-mono text-xs">GeminiProvider</code>,{' '}
            <code className="font-mono text-xs">AnthropicProvider</code>) return{' '}
            <code className="font-mono text-xs">isSimulated: false</code>.{' '}
            <code className="font-mono text-xs">MockProvider</code> returns{' '}
            <code className="font-mono text-xs">isSimulated: true</code> so staging UIs
            never confuse template placeholders with genuine analysis.
          </Callout>
        </section>
      </div>
    ),
  },
  {
    slug: 'ai/openai',
    href: '/docs/ai/openai',
    title: 'OpenAI Provider',
    description:
      'Configure OpenAI GPT models to generate structured business recommendations and chat answers.',
    group: 'AI Providers',
    headings: [
      { id: 'what-it-does', title: 'What OpenAI Provider Does' },
      { id: 'env-variable', title: 'Environment Variable Example' },
      { id: 'configuration', title: 'Configuration Example' },
      { id: 'sample-response', title: 'Sample Response' },
      { id: 'common-errors', title: 'Common Errors' },
      { id: 'security-guidance', title: 'Security Guidance' },
    ],
    searchKeywords: ['openai', 'gpt-4o', 'OPENAI_API_KEY', 'provider'],
    markdownSummary: `# OpenAI Provider\n\nConnect OpenAI models using \`OPENAI_API_KEY\` on your server.`,
    render: () =>
      renderProviderTemplate({
        name: 'OpenAI Provider',
        className: 'OpenAIProvider',
        envVar: 'OPENAI_API_KEY',
        defaultModel: 'gpt-4o-mini',
        requiresKey: true,
        overview:
          'Connects Charlie snapshots to OpenAI models for structured recommendation lists and conversational Q&A.',
        commonErrors: [
          '401 Unauthorized: Missing or invalid OPENAI_API_KEY environment variable.',
          '429 Rate Limit / Insufficient Quota: Check your OpenAI billing credit balance.',
          'TimeoutError: Increase timeoutMs if passing multi-year trend arrays.',
        ],
      }),
  },
  {
    slug: 'ai/gemini',
    href: '/docs/ai/gemini',
    title: 'Google Gemini Provider',
    description:
      'Configure Google Gemini models for fast, grounded business snapshot interpretation.',
    group: 'AI Providers',
    headings: [
      { id: 'what-it-does', title: 'What Google Gemini Provider Does' },
      { id: 'env-variable', title: 'Environment Variable Example' },
      { id: 'configuration', title: 'Configuration Example' },
      { id: 'sample-response', title: 'Sample Response' },
      { id: 'common-errors', title: 'Common Errors' },
      { id: 'security-guidance', title: 'Security Guidance' },
    ],
    searchKeywords: ['gemini', 'google', 'GEMINI_API_KEY', 'flash', 'provider'],
    markdownSummary: `# Google Gemini Provider\n\nConnect Gemini models using \`GEMINI_API_KEY\` on your server.`,
    render: () =>
      renderProviderTemplate({
        name: 'Google Gemini Provider',
        className: 'GeminiProvider',
        envVar: 'GEMINI_API_KEY',
        defaultModel: 'gemini-2.5-flash',
        requiresKey: true,
        overview:
          'Uses Google Gemini models to synthesize multi-period business snapshots into concise merchant recommendations.',
        commonErrors: [
          'API_KEY_INVALID: Verify GEMINI_API_KEY is loaded in your Node.js process env.',
          '429 Resource Exhausted: Free-tier RPM limit reached; cache recommendations per snapshot.',
        ],
      }),
  },
  {
    slug: 'ai/claude',
    href: '/docs/ai/claude',
    title: 'Anthropic Claude Provider',
    description:
      'Configure Anthropic Claude models for clear, evidence-backed executive summaries.',
    group: 'AI Providers',
    headings: [
      { id: 'what-it-does', title: 'What Anthropic Claude Provider Does' },
      { id: 'env-variable', title: 'Environment Variable Example' },
      { id: 'configuration', title: 'Configuration Example' },
      { id: 'sample-response', title: 'Sample Response' },
      { id: 'common-errors', title: 'Common Errors' },
      { id: 'security-guidance', title: 'Security Guidance' },
    ],
    searchKeywords: ['claude', 'anthropic', 'ANTHROPIC_API_KEY', 'sonnet', 'provider'],
    markdownSummary: `# Anthropic Claude Provider\n\nConnect Claude models using \`ANTHROPIC_API_KEY\` on your server.`,
    render: () =>
      renderProviderTemplate({
        name: 'Anthropic Claude Provider',
        className: 'AnthropicProvider',
        envVar: 'ANTHROPIC_API_KEY',
        defaultModel: 'claude-3-5-sonnet-latest',
        requiresKey: true,
        overview:
          'Connects Charlie to Anthropic Claude models for executive memos and structured advisory breakdowns.',
        commonErrors: [
          'authentication_error: Check ANTHROPIC_API_KEY formatting and active workspace key.',
          'overloaded_error (529): Implement exponential backoff or fall back to cached snapshot advice.',
        ],
      }),
  },
  {
    slug: 'ai/mock-provider',
    href: '/docs/ai/mock-provider',
    title: 'Mock Provider',
    description:
      'A testing provider that returns simulated responses without making real AI API calls.',
    group: 'AI Providers',
    headings: [
      { id: 'what-it-does', title: 'What Mock Provider Does' },
      { id: 'configuration', title: 'Configuration Example' },
      { id: 'sample-response', title: 'Sample Response' },
      { id: 'common-errors', title: 'Common Errors' },
      { id: 'security-guidance', title: 'Security Guidance' },
    ],
    searchKeywords: ['mock provider', 'testing', 'offline', 'no api key', 'simulated'],
    markdownSummary: `# Mock Provider\n\nA testing provider that returns simulated responses without making real AI API calls.`,
    render: () =>
      renderProviderTemplate({
        name: 'Mock Provider',
        className: 'MockProvider',
        envVar: 'NONE',
        defaultModel: 'mock-static-v1',
        requiresKey: false,
        overview:
          'A testing provider that returns simulated responses without making real AI API calls. Ideal for local UI development, automated tests, and onboarding tutorials.',
        commonErrors: [
          'Shipping MockProvider to production: Check NODE_ENV so production environments configure a real AI provider or hide AI cards.',
        ],
      }),
  },
  {
    slug: 'ai/recommendations',
    href: '/docs/ai/recommendations',
    title: 'AI Recommendations',
    description:
      'Generate prioritized, evidence-cited business suggestions from a Charlie Snapshot.',
    group: 'AI Providers',
    headings: [
      { id: 'how-recommendations-work', title: 'How Recommendations Work' },
      { id: 'code-example', title: 'Requesting Recommendations' },
    ],
    searchKeywords: ['recommendations', 'advice', 'advisor', 'priority', 'evidence'],
    markdownSummary: `# AI Recommendations\n\nGenerate structured, evidence-cited business recommendations from a computed Charlie Snapshot.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="how-recommendations-work" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            How Recommendations Work
          </h2>
          <p>
            Rather than returning unstructured walls of prose,{' '}
            <code className="font-mono text-xs">charlie.advisor.recommend()</code> instructs
            your configured AI provider to return an array of typed action cards—each
            containing a <code className="font-mono text-xs">priority</code>,{' '}
            <code className="font-mono text-xs">title</code>, quantitative{' '}
            <code className="font-mono text-xs">evidence</code> from the snapshot, and a{' '}
            <code className="font-mono text-xs">suggestedAction</code>.
          </p>
        </section>

        <section id="code-example" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Requesting Recommendations
          </h2>
          <CodeBlock
            language="typescript"
            filename="recommendations.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const snapshot = charlie.analytics.createSnapshot({ orders });

const result = await charlie.advisor.recommend(snapshot, {
  focus: 'general', // 'general' | 'retention' | 'revenue'
  maxRecommendations: 3,
});`}
          />
        </section>
      </div>
    ),
  },
  {
    slug: 'ai/chat',
    href: '/docs/ai/chat',
    title: 'AI Business Chat',
    description:
      'Answer natural-language questions about revenue, trends, and customer segments grounded in snapshot metrics.',
    group: 'AI Providers',
    headings: [
      { id: 'grounded-qa', title: 'Grounded Business Q&A' },
      { id: 'chat-example', title: 'Answering a Merchant Question' },
    ],
    searchKeywords: ['chat', 'questions', 'ask', 'conversational', 'advisor.ask'],
    markdownSummary: `# AI Business Chat\n\nAnswer merchant questions grounded strictly in verified Charlie Snapshot metrics.`,
    render: () => (
      <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
        <section id="grounded-qa" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Grounded Business Q&amp;A
          </h2>
          <p>
            Business users often want quick answers like{' '}
            <em>&quot;How did October compare to September?&quot;</em> or{' '}
            <em>&quot;Which customer group brings in most of our sales?&quot;</em>.{' '}
            <code className="font-mono text-xs">charlie.advisor.ask()</code> pairs the
            question with your current <code className="font-mono text-xs">Snapshot</code>{' '}
            so answers stay anchored to real figures.
          </p>
        </section>

        <section id="chat-example" className="scroll-mt-24 space-y-3">
          <h2 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
            Answering a Merchant Question
          </h2>
          <CodeBlock
            language="typescript"
            filename="ask-charlie.ts"
            illustrativeLabel="Illustrative SDK Example"
            code={`const reply = await charlie.advisor.ask({
  snapshot,
  question: 'Are we overly dependent on a few customers right now?',
});

console.log(reply.answer);
// "Your top 22 customers (18.3% of buyers) generate 80.4% of net revenue..."`}
          />
        </section>
      </div>
    ),
  },
];
