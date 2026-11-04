import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/landing/Hero';
import { FrameworkBar } from '../components/landing/FrameworkBar';
import { FeatureGrid } from '../components/landing/FeatureGrid';
import { Workflow } from '../components/landing/Workflow';
import { CodePreview } from '../components/landing/CodePreview';
import { ProviderCards } from '../components/landing/ProviderCards';
import { AnalyticsDemo } from '../components/landing/AnalyticsDemo';
import { FinalCTA } from '../components/landing/FinalCTA';

interface LandingPageProps {
  onOpenSearch: () => void;
}

export function LandingPage({ onOpenSearch }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-[#09090B] dark:text-[#FAFAFA]">
      <Navbar onOpenSearch={onOpenSearch} />
      <main>
        <Hero />
        <FrameworkBar />
        <FeatureGrid />
        <Workflow />
        <CodePreview />
        <ProviderCards />
        <AnalyticsDemo />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
