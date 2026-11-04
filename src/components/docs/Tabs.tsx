'use client';

import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';
import { SITE_CONFIG } from '../../lib/config';

export interface CodeTabItem {
  id: string;
  label: string;
  language: 'typescript' | 'javascript' | 'json' | 'bash' | 'php' | 'text';
  filename?: string;
  code: string;
  highlightLines?: number[];
}

interface CodeTabsProps {
  items: CodeTabItem[];
  showLineNumbers?: boolean;
  illustrativeLabel?: string;
}

export function CodeTabs({ items, showLineNumbers = false, illustrativeLabel }: CodeTabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  if (!activeItem) return null;

  return (
    <div className="my-5">
      <div
        role="tablist"
        aria-label="Code example options"
        className="mb-2 inline-flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100 p-1 dark:border-[#27272A] dark:bg-[#18181B]"
      >
        {items.map((item) => {
          const isSelected = item.id === activeItem.id;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={isSelected}
              onClick={() => setActiveId(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                isSelected
                  ? 'bg-white text-zinc-900 shadow-xs dark:bg-[#09090B] dark:text-zinc-100'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <CodeBlock
        code={activeItem.code}
        language={activeItem.language}
        filename={activeItem.filename}
        showLineNumbers={showLineNumbers}
        highlightLines={activeItem.highlightLines}
        illustrativeLabel={illustrativeLabel}
      />
    </div>
  );
}

export function PackageManagerTabs({ extraPackages = '' }: { extraPackages?: string }) {
  const suffix = extraPackages ? ` ${extraPackages}` : '';
  const items: CodeTabItem[] = [
    {
      id: 'npm',
      label: 'npm',
      language: 'bash',
      code: `${SITE_CONFIG.installCommands.npm}${suffix}`,
    },
    {
      id: 'pnpm',
      label: 'pnpm',
      language: 'bash',
      code: `${SITE_CONFIG.installCommands.pnpm}${suffix}`,
    },
    {
      id: 'yarn',
      label: 'yarn',
      language: 'bash',
      code: `${SITE_CONFIG.installCommands.yarn}${suffix}`,
    },
    {
      id: 'bun',
      label: 'bun',
      language: 'bash',
      code: `${SITE_CONFIG.installCommands.bun}${suffix}`,
    },
  ];

  return <CodeTabs items={items} />;
}
