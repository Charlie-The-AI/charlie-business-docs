import React from 'react';

export interface DocHeading {
  id: string;
  title: string;
  level?: 2 | 3;
}

export interface DocPageData {
  slug: string; // e.g., '' for /docs, 'introduction' for /docs/introduction, 'datasets/orders' for /docs/datasets/orders
  href: string; // full path e.g. '/docs/datasets/orders'
  title: string;
  description: string;
  group: string;
  comingSoon?: boolean;
  headings: DocHeading[];
  searchKeywords: string[];
  markdownSummary: string; // Clean Markdown representation for Copy Page as Markdown
  render: () => React.ReactNode;
}

export interface SidebarNavItem {
  title: string;
  href: string;
  comingSoon?: boolean;
}

export interface SidebarNavGroup {
  title: string;
  items: SidebarNavItem[];
}
