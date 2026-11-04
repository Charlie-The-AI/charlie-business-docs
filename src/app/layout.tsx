import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import { SearchProvider } from '@/lib/searchContext';
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Charlie the Business Advisor — Open-Source Business Analytics & AI Toolkit',
  description:
    'Free, open-source TypeScript business analytics and AI advisory toolkit for developers. Calculate revenue, RFM segmentation, Pareto 80/20 analysis, sales trends, and optional AI insights.',
  openGraph: {
    title: 'Charlie the Business Advisor — Open-Source Business Analytics & AI Toolkit',
    description:
      'Your business data has a story. Let Charlie tell it. Add business analytics and optional AI-driven insights to your applications with a free, open-source TypeScript toolkit.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Charlie the Business Advisor — Open-Source Business Analytics & AI Toolkit',
    description:
      'Your business data has a story. Let Charlie tell it. Add business analytics and optional AI-driven insights to your applications with a free, open-source TypeScript toolkit.',
  },
  icons: {
    icon: '/Charlie-logo.jpeg',
    shortcut: '/Charlie-logo.jpeg',
    apple: '/Charlie-logo.jpeg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#FAFAFA] text-[#18181B] dark:bg-[#09090B] dark:text-[#FAFAFA] antialiased selection:bg-emerald-500/20 selection:text-emerald-700 dark:selection:text-emerald-300">
        <ThemeProvider>
          <SearchProvider>{children}</SearchProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
