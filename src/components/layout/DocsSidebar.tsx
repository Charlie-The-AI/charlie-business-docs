import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { DOCS_SIDEBAR_GROUPS } from '../../data/docsNavigation';

interface DocsSidebarProps {
  onNavigate?: () => void;
}

export function DocsSidebar({ onNavigate }: DocsSidebarProps) {
  const location = useLocation();
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <nav aria-label="Documentation sections" className="space-y-5 py-6 pr-3">
      {DOCS_SIDEBAR_GROUPS.map((group) => {
        const isCollapsed = Boolean(collapsedGroups[group.title]);

        return (
          <div key={group.title}>
            <button
              type="button"
              onClick={() => toggleGroup(group.title)}
              aria-expanded={!isCollapsed}
              className="flex w-full items-center justify-between py-1 text-left text-xs font-semibold text-zinc-900 transition-colors hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded dark:text-zinc-200 dark:hover:text-emerald-400"
            >
              <span>{group.title}</span>
              {isCollapsed ? (
                <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
              )}
            </button>

            {!isCollapsed && (
              <ul className="mt-1.5 space-y-0.5 border-l border-zinc-200 pl-3 dark:border-[#27272A]">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        onClick={onNavigate}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-[13px] transition-colors duration-150 ${
                          isActive
                            ? 'bg-emerald-500/10 font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                        }`}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.comingSoon && (
                          <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500 shrink-0">
                            Soon
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
