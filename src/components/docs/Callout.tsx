import React from 'react';
import { AlertTriangle, Info, Lightbulb, ShieldAlert } from 'lucide-react';

export type CalloutVariant = 'note' | 'tip' | 'warning' | 'important';

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const VARIANT_CONFIG: Record<
  CalloutVariant,
  {
    defaultTitle: string;
    icon: React.ComponentType<{ className?: string }>;
    containerClass: string;
    iconClass: string;
    titleClass: string;
  }
> = {
  note: {
    defaultTitle: 'Note',
    icon: Info,
    containerClass:
      'border-zinc-200 bg-zinc-50/90 dark:border-[#27272A] dark:bg-[#111114]',
    iconClass: 'text-zinc-600 dark:text-zinc-300',
    titleClass: 'text-zinc-900 dark:text-zinc-100',
  },
  tip: {
    defaultTitle: 'Tip',
    icon: Lightbulb,
    containerClass:
      'border-emerald-200/80 bg-emerald-50/50 dark:border-emerald-500/25 dark:bg-emerald-950/20',
    iconClass: 'text-emerald-700 dark:text-emerald-400',
    titleClass: 'text-emerald-900 dark:text-emerald-200',
  },
  warning: {
    defaultTitle: 'Warning',
    icon: AlertTriangle,
    containerClass:
      'border-amber-200/90 bg-amber-50/60 dark:border-amber-500/25 dark:bg-amber-950/20',
    iconClass: 'text-amber-700 dark:text-amber-400',
    titleClass: 'text-amber-900 dark:text-amber-200',
  },
  important: {
    defaultTitle: 'Important',
    icon: ShieldAlert,
    containerClass:
      'border-teal-200/80 bg-teal-50/50 dark:border-teal-500/25 dark:bg-teal-950/20',
    iconClass: 'text-teal-700 dark:text-teal-400',
    titleClass: 'text-teal-900 dark:text-teal-200',
  },
};

export function Callout({ variant = 'note', title, children }: CalloutProps) {
  const cfg = VARIANT_CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <div
      role="note"
      className={`my-6 rounded-xl border p-4 sm:p-5 ${cfg.containerClass}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${cfg.iconClass}`} />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${cfg.titleClass}`}>
            {title || cfg.defaultTitle}
          </p>
          <div className="mt-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
