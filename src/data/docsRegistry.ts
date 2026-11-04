import { DocPageData } from './docsTypes';
import { GETTING_STARTED_PAGES } from './docs/gettingStartedPages';
import { DATASETS_AND_ADAPTERS_PAGES } from './docs/datasetsAndAdaptersPages';
import { ANALYTICS_PAGES } from './docs/analyticsPages';
import { AI_PAGES } from './docs/aiPages';
import { FRAMEWORKS_AND_REF_PAGES } from './docs/frameworksAndRefPages';

export const ALL_DOC_PAGES: DocPageData[] = [
  ...GETTING_STARTED_PAGES,
  ...DATASETS_AND_ADAPTERS_PAGES,
  ...ANALYTICS_PAGES,
  ...AI_PAGES,
  ...FRAMEWORKS_AND_REF_PAGES,
];

export const DOC_PAGES_BY_HREF: Record<string, DocPageData> = Object.fromEntries(
  ALL_DOC_PAGES.map((page) => [page.href, page])
);

export function getDocPageByPathname(pathname: string): DocPageData | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return DOC_PAGES_BY_HREF[normalized];
}
