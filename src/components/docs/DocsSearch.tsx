'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CornerDownLeft, FileText, Hash, Search, X } from 'lucide-react';
import { ALL_DOC_PAGES } from '../../data/docsRegistry';

interface SearchResultItem {
  id: string;
  href: string;
  group: string;
  title: string;
  subtitle: string;
  isSection: boolean;
}

interface DocsSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  const trimmed = query.trim();
  if (!trimmed) return text;

  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, idx) =>
    part.toLowerCase() === trimmed.toLowerCase() ? (
      <mark
        key={idx}
        className="rounded bg-emerald-500/20 px-0.5 font-semibold text-emerald-800 dark:bg-emerald-500/25 dark:text-emerald-300"
      >
        {part}
      </mark>
    ) : (
      <React.Fragment key={idx}>{part}</React.Fragment>
    )
  );
}

export function DocsSearch({ isOpen, onClose }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Build searchable flat index from all documentation pages & headings
  const allIndexedItems = useMemo<
    (SearchResultItem & { haystack: string })[]
  >(() => {
    const items: (SearchResultItem & { haystack: string })[] = [];

    for (const page of ALL_DOC_PAGES) {
      items.push({
        id: `page:${page.href}`,
        href: page.href,
        group: page.group,
        title: page.title,
        subtitle: page.description,
        isSection: false,
        haystack: `${page.title} ${page.description} ${page.group} ${page.searchKeywords.join(' ')}`.toLowerCase(),
      });

      for (const heading of page.headings) {
        items.push({
          id: `sec:${page.href}#${heading.id}`,
          href: `${page.href}#${heading.id}`,
          group: page.group,
          title: `${page.title} — ${heading.title}`,
          subtitle: page.description,
          isSection: true,
          haystack: `${heading.title} ${page.title} ${page.group} ${page.searchKeywords.join(' ')}`.toLowerCase(),
        });
      }
    }

    return items;
  }, []);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return allIndexedItems.filter((item) => !item.isSection).slice(0, 10);
    }

    return allIndexedItems
      .filter((item) => item.haystack.includes(q))
      .sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(q) ? 0 : 1;
        const bTitleMatch = b.title.toLowerCase().includes(q) ? 0 : 1;
        if (aTitleMatch !== bTitleMatch) return aTitleMatch - bTitleMatch;
        return Number(a.isSection) - Number(b.isSection);
      })
      .slice(0, 16);
  }, [allIndexedItems, query]);

  // Group results by category while maintaining flat index for keyboard nav
  const groupedResults = useMemo(() => {
    const groups: { group: string; items: { item: SearchResultItem; flatIdx: number }[] }[] = [];
    const map = new Map<string, { item: SearchResultItem; flatIdx: number }[]>();

    filteredResults.forEach((item, flatIdx) => {
      let bucket = map.get(item.group);
      if (!bucket) {
        bucket = [];
        map.set(item.group, bucket);
        groups.push({ group: item.group, items: bucket });
      }
      bucket.push({ item, flatIdx });
    });

    return groups;
  }, [filteredResults]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    const [pathname, hash] = href.split('#');
    router.push(pathname);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (filteredResults.length > 0) {
        setActiveIndex((prev) => (prev + 1) % filteredResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (filteredResults.length > 0) {
        setActiveIndex((prev) =>
          prev - 1 < 0 ? filteredResults.length - 1 : prev - 1
        );
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filteredResults[activeIndex];
      if (target) {
        handleSelect(target.href);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Charlie documentation"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[10vh] backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-[#27272A] dark:bg-[#111114]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-zinc-200 px-4 py-3.5 dark:border-[#27272A]">
          <Search className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, RFM, adapters, providers, frameworks..."
            aria-label="Search documentation query"
            className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search dialog"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Grouped Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {groupedResults.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                No documentation matches &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                Try searching for &ldquo;RFM&rdquo;, &ldquo;adapter&rdquo;, &ldquo;minor units&rdquo;, or &ldquo;Laravel&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {groupedResults.map((group) => (
                <div key={group.group}>
                  <p className="px-2.5 pb-1.5 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                    {group.group}
                  </p>
                  <ul role="listbox" className="space-y-1">
                    {group.items.map(({ item, flatIdx }) => {
                      const isSelected = flatIdx === activeIndex;
                      return (
                        <li key={item.id} role="option" aria-selected={isSelected}>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveIndex(flatIdx)}
                            onClick={() => handleSelect(item.href)}
                            className={`flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-500/10 text-zinc-950 dark:bg-emerald-500/15 dark:text-zinc-50'
                                : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60'
                            }`}
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              {item.isSection ? (
                                <Hash className="mt-0.5 h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                              ) : (
                                <FileText className="mt-0.5 h-4 w-4 text-zinc-400 dark:text-zinc-500 shrink-0" />
                              )}
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium">
                                  {highlightMatch(item.title, query)}
                                </p>
                                <p className="mt-0.5 truncate text-xs text-zinc-500 dark:text-zinc-400">
                                  {highlightMatch(item.subtitle, query)}
                                </p>
                              </div>
                            </div>
                            {isSelected && (
                              <CornerDownLeft className="mt-1 h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 bg-zinc-50 px-4 py-2.5 text-[11px] text-zinc-500 dark:border-[#27272A] dark:bg-[#09090B] dark:text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Open</span>
            <span>Esc Close</span>
          </div>
          <span>Local Static Index</span>
        </div>
      </div>
    </div>
  );
}
