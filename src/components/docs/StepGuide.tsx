import React from 'react';

export interface TutorialStep {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StepGuide({ steps }: { steps: TutorialStep[] }) {
  return (
    <ol className="my-8 space-y-8">
      {steps.map((step, idx) => (
        <li key={step.title} className="relative flex gap-4 sm:gap-5">
          <div className="flex flex-col items-center">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 font-mono text-xs font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-[#18181B] dark:text-emerald-400 tabular-nums">
              {idx + 1}
            </span>
            {idx < steps.length - 1 && (
              <div
                aria-hidden="true"
                className="mt-2 w-px flex-1 bg-zinc-200 dark:bg-zinc-800"
              />
            )}
          </div>
          <div className="min-w-0 flex-1 pb-2">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {step.description}
            </p>
            {step.content && <div className="mt-4">{step.content}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
