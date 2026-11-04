import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, ChevronRight, Copy } from 'lucide-react';
import { DocsHeader } from '../components/layout/DocsHeader';
import { DocsSidebar } from '../components/layout/DocsSidebar';
import { TableOfContents } from '../components/layout/TableOfContents';
import { PageNavigation } from '../components/docs/PageNavigation';
import { Footer } from '../components/layout/Footer';
import { getDocPageByPathname } from '../data/docsRegistry';
import { getPrevNextLinks } from '../data/docsNavigation';

interface DocsLayoutPageProps {
  onOpenSearch: () => void;
}

export function DocsLayoutPage({ onOpenSearch }: DocsLayoutPageProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const page = getDocPageByPathname(location.pathname);
  const { prev, next } = getPrevNextLinks(page?.href ?? location.pathname);

  useEffect(() => {
    setMobileMenuOpen(false);
    setCopiedMarkdown(false);
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  const handleCopyMarkdown = async () => {
    if (!page) return;
    const markdownPayload = `${page.markdownSummary}\n\nSource route: ${page.href}`;
    try {
      await navigator.clipboard.writeText(markdownPayload);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = markdownPayload;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 1800);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 dark:bg-[#09090B] dark:text-[#FAFAFA]">
      <DocsHeader
        onOpenSearch={onOpenSearch}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((v) => !v)}
      />

      {/* Mobile Documentation Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-14 z-30 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="h-full w-72 overflow-y-auto border-r border-zinc-200 bg-white px-4 dark:border-[#27272A] dark:bg-[#09090B]"
            onClick={(e) => e.stopPropagation()}
          >
            <DocsSidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main 3-Column Documentation Container */}
      <div className="mx-auto flex w-full max-w-[90rem] flex-1 px-4 sm:px-6 lg:px-8">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-zinc-200 dark:border-[#27272A]">
            <DocsSidebar />
          </div>
        </aside>

        {/* Center Article Column */}
        <main className="min-w-0 flex-1 py-8 sm:py-10 lg:px-10 xl:px-14">
          <div className="mx-auto max-w-3xl">
            {page ? (
              <article>
                {/* Breadcrumbs + Copy Page Markdown Action */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"
                  >
                    <Link
                      to="/docs"
                      className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
                    >
                      Docs
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{page.group}</span>
                    {page.href !== '/docs' && (
                      <>
                        <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
                        <span className="font-medium text-zinc-900 dark:text-zinc-200">
                          {page.title}
                        </span>
                      </>
                    )}
                  </nav>

                  <button
                    type="button"
                    onClick={handleCopyMarkdown}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:border-[#27272A] dark:bg-[#111114] dark:text-zinc-300 dark:hover:bg-[#18181B] dark:hover:text-zinc-100 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedMarkdown ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Copied Markdown</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Page</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Page Title & Lead Description */}
                <header className="mt-4 border-b border-zinc-200 pb-6 dark:border-[#27272A]">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
                    {page.title}
                  </h1>
                  <p className="mt-2.5 text-base leading-relaxed text-zinc-600 dark:text-[#A1A1AA]">
                    {page.description}
                  </p>
                </header>

                {/* Page Body */}
                <div className="mt-8">{page.render()}</div>

                {/* Sequential Previous / Next Navigation */}
                <PageNavigation prev={prev} next={next} />
              </article>
            ) : (
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-[#27272A] dark:bg-[#111114]">
                <h1 className="text-xl font-bold text-zinc-950 dark:text-zinc-50">
                  Documentation page not found
                </h1>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  The route <code className="font-mono text-xs">{location.pathname}</code>{' '}
                  does not match an existing guide.
                </p>
                <div className="mt-6">
                  <Link
                    to="/docs"
                    className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-500 dark:bg-emerald-500 dark:text-zinc-950"
                  >
                    Return to Documentation Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right Sidebar: On This Page Table of Contents */}
        <div className="hidden xl:block xl:w-56 xl:shrink-0">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <TableOfContents headings={page?.headings ?? []} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
