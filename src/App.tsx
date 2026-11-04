/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import { LandingPage } from './pages/LandingPage';
import { DocsLayoutPage } from './pages/DocsLayoutPage';
import { DocsSearch } from './components/docs/DocsSearch';

function AppShell() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage onOpenSearch={() => setSearchOpen(true)} />}
        />
        <Route
          path="/docs"
          element={<DocsLayoutPage onOpenSearch={() => setSearchOpen(true)} />}
        />
        <Route
          path="/docs/*"
          element={<DocsLayoutPage onOpenSearch={() => setSearchOpen(true)} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <DocsSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </ThemeProvider>
  );
}
