import React, { useEffect, useState } from 'react';
import { DocHeading } from '../../data/docsTypes';

interface TableOfContentsProps {
  headings: DocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

  useEffect(() => {
    setActiveId(headings[0]?.id ?? '');
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <aside aria-label="On this page" className="py-6 pl-4">
      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
        On This Page
      </p>
      <ul className="mt-3 space-y-2 border-l border-zinc-200 text-xs dark:border-[#27272A]">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => handleScrollTo(heading.id)}
                className={`-ml-px block w-full border-l py-0.5 text-left transition-colors duration-150 cursor-pointer ${
                  heading.level === 3 ? 'pl-6' : 'pl-3.5'
                } ${
                  isActive
                    ? 'border-emerald-500 font-semibold text-emerald-700 dark:text-emerald-400'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
              >
                {heading.title}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
