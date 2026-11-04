'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { DocsSearch } from '@/components/docs/DocsSearch';

interface SearchContextValue {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

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
    <SearchContext.Provider
      value={{ searchOpen, openSearch, closeSearch, toggleSearch }}
    >
      {children}
      <DocsSearch isOpen={searchOpen} onClose={closeSearch} />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return ctx;
}
