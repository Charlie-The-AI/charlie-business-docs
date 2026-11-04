import React from 'react';
import { CodeBlock } from './CodeBlock';

export interface ResponseFieldExplanation {
  field: string;
  meaning: string;
}

interface ExampleResponseProps {
  title?: string;
  json: string;
  explanations?: ResponseFieldExplanation[];
  note?: string;
}

export function ExampleResponse({
  title = 'Sample Output',
  json,
  explanations = [],
  note,
}: ExampleResponseProps) {
  return (
    <div className="my-6 space-y-4">
      <CodeBlock
        code={json}
        language="json"
        filename={title}
        illustrativeLabel={note}
      />
      {explanations.length > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-[#27272A] dark:bg-[#111114]/70">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            What these values mean in plain English
          </p>
          <dl className="mt-3 space-y-2.5 text-sm">
            {explanations.map((item) => (
              <div key={item.field} className="flex flex-col sm:flex-row sm:gap-3">
                <dt className="font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400 sm:w-48 shrink-0">
                  {item.field}
                </dt>
                <dd className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.meaning}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
