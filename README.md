# Charlie the Business Advisor — Documentation & Landing Website

The official documentation and landing website for **Charlie the Business Advisor** (`charlie-the-business-advisor` and `@charlie-the-ai/*`).

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Recharts**, and **Lucide Icons**.

---

## ⚡ Overview

Charlie the Business Advisor is a 100% free, fully open-source, multi-provider AI business intelligence and analytics toolkit. This documentation site provides interactive guides, live demos, framework integration tutorials (Next.js, React, Node.js, NestJS, Laravel), and complete API references.

### Key Site Features

- **Next.js 15 App Router:** Pre-renders all 35+ landing and documentation pages statically (SSG) for instant page loads and zero layout shift.
- **Interactive Search (⌘K):** Instant modal search with keyboard navigation indexing all pages, headings, and keywords.
- **Adaptive Theme:** Clean Dark and Light mode powered by system preferences and local storage persistence.
- **Rich Code Blocks:** Deterministic syntax-highlighted code blocks with line numbering and one-click copy.
- **Interactive Analytics Sandbox:** Real-time metrics breakdown and Pareto revenue visualization powered by Recharts.
- **Aligned with `@charlie-the-ai` Ecosystem:** Documents both the umbrella package `charlie-the-business-advisor` and modular scoped packages (`@charlie-the-ai/analytics-core`, `@charlie-the-ai/analytics-adapters`, `@charlie-the-ai/advisor-ai`, `@charlie-the-ai/advisor-react`, and `@charlie-the-ai/advisor-types`).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js:** `18.18+` or `20+` (LTS recommended)
- **Package Manager:** `npm`, `pnpm`, or `yarn`

### Installation

```bash
npm install
```

### Development Server

Start the local development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

### Production Build

Create an optimized static production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run start
```

---

## 📂 Project Structure

```text
charlie-business-advisor-UI-Doc/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML shell, fonts & providers
│   │   ├── globals.css             # Tailwind CSS v4 styling & typography
│   │   ├── page.tsx                # Marketing landing page route
│   │   └── docs/
│   │       └── [[...slug]]/
│   │           └── page.tsx        # Dynamic static documentation routes
│   ├── components/
│   │   ├── docs/                   # CodeBlock, Tabs, StepGuide, DocsSearch, etc.
│   │   ├── landing/                # Hero, FeatureGrid, Workflow, Demo, FinalCTA
│   │   ├── layout/                 # Navbar, DocsHeader, DocsSidebar, TOC, Footer
│   │   └── ui/                     # Logo, ThemeToggle
│   ├── data/
│   │   ├── docsNavigation.ts       # Sidebar hierarchy and breadcrumbs
│   │   ├── docsRegistry.ts         # Central document repository index
│   │   └── docs/                   # Full documentation articles
│   ├── lib/
│   │   ├── config.ts               # Site metadata, GitHub URL, package info
│   │   ├── theme.tsx               # ThemeContext and dark mode hook
│   │   └── searchContext.tsx       # Global search modal context
│   └── views/
│       ├── LandingPage.tsx         # Full-width marketing view
│       └── DocsLayoutPage.tsx      # 3-column documentation shell
├── next.config.mjs
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 📄 License

Released under the **MIT License**.
