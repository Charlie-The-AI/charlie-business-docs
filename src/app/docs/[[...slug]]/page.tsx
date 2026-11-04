import type { Metadata } from 'next';
import { ALL_DOC_PAGES, getDocPageByPathname } from '@/data/docsRegistry';
import { DocsLayoutPage } from '@/views/DocsLayoutPage';

export function generateStaticParams() {
  return ALL_DOC_PAGES.map((page) => {
    const relative = page.href.replace(/^\/docs\/?/, '');
    const slug = relative ? relative.split('/') : [];
    return { slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolved = await params;
  const path =
    resolved.slug && resolved.slug.length > 0
      ? `/docs/${resolved.slug.join('/')}`
      : '/docs';
  const page = getDocPageByPathname(path);

  if (!page) {
    return {
      title: 'Documentation — Charlie the Business Advisor',
    };
  }

  return {
    title: `${page.title} — Charlie the Business Advisor`,
    description: page.description,
  };
}

export default async function DocsPageRoute({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolved = await params;
  const pathname =
    resolved.slug && resolved.slug.length > 0
      ? `/docs/${resolved.slug.join('/')}`
      : '/docs';

  return <DocsLayoutPage pathnameOverride={pathname} />;
}
