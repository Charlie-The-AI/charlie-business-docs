import React from 'react';

export interface ApiPropertyRow {
  property: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description: string;
}

interface ApiTableProps {
  title?: string;
  rows: ApiPropertyRow[];
}

export function ApiTable({ title, rows }: ApiTableProps) {
  return (
    <div className="my-6">
      {title && (
        <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-[#27272A]">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-[#27272A] dark:bg-[#111114]">
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Property
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Type
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Required
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Default
              </th>
              <th className="px-4 py-3 font-medium text-zinc-700 dark:text-zinc-300">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-[#27272A] dark:bg-[#09090B]">
            {rows.map((row) => (
              <tr
                key={row.property}
                className="transition-colors hover:bg-zinc-50/70 dark:hover:bg-[#111114]/60"
              >
                <td className="px-4 py-3 align-top font-mono text-xs font-medium text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                  {row.property}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                  {row.type}
                </td>
                <td className="px-4 py-3 align-top text-xs whitespace-nowrap">
                  {row.required ? (
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                      Yes
                    </span>
                  ) : (
                    <span className="text-zinc-500 dark:text-zinc-400">Optional</span>
                  )}
                </td>
                <td className="px-4 py-3 align-top font-mono text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                  {row.defaultValue ?? '—'}
                </td>
                <td className="px-4 py-3 align-top text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 min-w-[240px]">
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
