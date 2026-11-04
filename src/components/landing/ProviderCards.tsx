import React from 'react';
import Link from 'next/link';
import { Bot, Cpu, FlaskConical, Sparkles } from 'lucide-react';

const PROVIDERS = [
  {
    name: 'OpenAI',
    meta: 'API Key Required · Cloud LLM',
    description:
      'Connect GPT-4o or GPT-4.1 models using your own OPENAI_API_KEY for structured JSON recommendations and natural-language Q&A.',
    href: '/docs/ai/openai',
    icon: Sparkles,
  },
  {
    name: 'Google Gemini',
    meta: 'API Key Required · Cloud LLM',
    description:
      'Integrate Gemini Flash or Pro models for fast, cost-efficient snapshot interpretation and multi-metric business summaries.',
    href: '/docs/ai/gemini',
    icon: Cpu,
  },
  {
    name: 'Anthropic Claude',
    meta: 'API Key Required · Cloud LLM',
    description:
      'Use Claude Sonnet or Haiku models when you want nuanced written executive memos grounded in Charlie snapshot numbers.',
    href: '/docs/ai/claude',
    icon: Bot,
  },
  {
    name: 'Mock Provider',
    meta: 'Zero Keys · Deterministic Simulation',
    description:
      'Returns static, deterministic sample responses for local UI prototyping, CI/CD unit tests, and offline development—does not perform real AI reasoning.',
    href: '/docs/ai/mock-provider',
    icon: FlaskConical,
  },
];

export function ProviderCards() {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50/70 py-20 sm:py-24 dark:border-[#27272A] dark:bg-[#111114]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            AI Provider Support
          </p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
            Bring your own AI provider—or test locally without one
          </h2>
          <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
            Choose your preferred AI provider or use the Mock Provider to test without API
            keys.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PROVIDERS.map((provider) => {
            const Icon = provider.icon;
            return (
              <Link
                key={provider.name}
                href={provider.href}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-6 transition-colors duration-150 hover:border-emerald-500/40 hover:bg-zinc-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#18181B]/80 dark:hover:border-emerald-500/40 dark:hover:bg-[#18181B]"
              >
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-800 group-hover:text-emerald-600 dark:border-zinc-700 dark:bg-[#111114] dark:text-zinc-200 dark:group-hover:text-emerald-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {provider.name}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {provider.meta}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                    {provider.description}
                  </p>
                </div>

                <span className="mt-6 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                  Setup guide →
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
          Note: Charlie is free and open source. External AI providers (OpenAI, Google
          Gemini, Anthropic Claude) may charge for API token usage according to your own
          account billing.
        </p>
      </div>
    </section>
  );
}
