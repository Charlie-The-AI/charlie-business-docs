import { SidebarNavGroup, SidebarNavItem } from './docsTypes';

export const DOCS_SIDEBAR_GROUPS: SidebarNavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Welcome', href: '/docs' },
      { title: 'Introduction', href: '/docs/introduction' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Quick Start', href: '/docs/quick-start' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [{ title: 'Core Concepts', href: '/docs/core-concepts' }],
  },
  {
    title: 'Datasets',
    items: [
      { title: 'CharlieOrder', href: '/docs/datasets/orders' },
      { title: 'CharlieCustomer', href: '/docs/datasets/customers' },
      { title: 'Upcoming Datasets', href: '/docs/datasets/coming-soon', comingSoon: true },
    ],
  },
  {
    title: 'Adapters',
    items: [
      { title: 'Overview', href: '/docs/adapters/overview' },
      { title: 'Field Mapping', href: '/docs/adapters/field-mapping' },
      { title: 'Custom Transformations', href: '/docs/adapters/custom-transformations' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { title: 'Revenue Metrics', href: '/docs/analytics/revenue' },
      { title: 'Pareto (80/20)', href: '/docs/analytics/pareto' },
      { title: 'RFM Segmentation', href: '/docs/analytics/rfm' },
      { title: 'Sales Trends', href: '/docs/analytics/trends' },
      { title: 'Business Snapshots', href: '/docs/analytics/snapshots' },
    ],
  },
  {
    title: 'AI Providers',
    items: [
      { title: 'Overview & Comparison', href: '/docs/ai/overview' },
      { title: 'OpenAI', href: '/docs/ai/openai' },
      { title: 'Google Gemini', href: '/docs/ai/gemini' },
      { title: 'Anthropic Claude', href: '/docs/ai/claude' },
      { title: 'Mock Provider', href: '/docs/ai/mock-provider' },
      { title: 'AI Recommendations', href: '/docs/ai/recommendations' },
      { title: 'AI Business Chat', href: '/docs/ai/chat' },
    ],
  },
  {
    title: 'Framework Guides',
    items: [
      { title: 'Node.js', href: '/docs/frameworks/nodejs' },
      { title: 'NestJS', href: '/docs/frameworks/nestjs' },
      { title: 'Next.js', href: '/docs/frameworks/nextjs' },
      { title: 'React', href: '/docs/frameworks/react' },
      { title: 'Laravel', href: '/docs/frameworks/laravel' },
    ],
  },
  {
    title: 'API Reference',
    items: [{ title: 'SDK Reference', href: '/docs/api-reference' }],
  },
  {
    title: 'Help & Troubleshooting',
    items: [
      { title: 'FAQ', href: '/docs/faq' },
      { title: 'Troubleshooting', href: '/docs/troubleshooting' },
    ],
  },
];

export const FLAT_DOCS_NAV: SidebarNavItem[] = DOCS_SIDEBAR_GROUPS.flatMap(
  (group) => group.items
);

export function getPrevNextLinks(currentHref: string) {
  const index = FLAT_DOCS_NAV.findIndex((item) => item.href === currentHref);
  if (index === -1) {
    return { prev: undefined, next: undefined };
  }
  return {
    prev: index > 0 ? FLAT_DOCS_NAV[index - 1] : undefined,
    next: index < FLAT_DOCS_NAV.length - 1 ? FLAT_DOCS_NAV[index + 1] : undefined,
  };
}
