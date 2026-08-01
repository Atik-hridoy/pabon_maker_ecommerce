import React, { useState, useEffect, useRef, useCallback } from 'react';
import { API_BASE_URL } from '../../../api/client';
import { storage } from '../../../utils/localStorage';

export default function DashboardSearch({ onNavigateTab }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut: Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    }
    setLoading(true);
    const token = storage.getToken();
    try {
      const response = await fetch(`${API_BASE_URL}/accounts/search/?q=${encodeURIComponent(searchQuery)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);

    // Debounce search (300ms)
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 300);
  };

  const handleResultClick = (item) => {
    setIsOpen(false);
    setQuery('');
    setResults(null);
    if (onNavigateTab && item.tab) {
      onNavigateTab(item.tab);
    }
  };

  const getCategoryIcon = (tab) => {
    switch (tab) {
      case 'orders': return 'receipt_long';
      case 'payments': return 'payments';
      case 'wishlist': return 'favorite';
      case 'products': return 'inventory_2';
      default: return 'search';
    }
  };

  const getCategoryLabel = (tab) => {
    switch (tab) {
      case 'orders': return 'Orders';
      case 'payments': return 'Payments';
      case 'wishlist': return 'Wishlist';
      case 'products': return 'Products';
      default: return 'Results';
    }
  };

  const allResults = results ? [
    ...results.results.orders,
    ...results.results.payments,
    ...results.results.wishlist,
    ...results.results.products
  ] : [];

  // Group results by tab
  const groupedResults = results ? Object.entries(results.results).filter(([, items]) => items.length > 0) : [];

  return (
    <div ref={containerRef} className="relative hidden sm:block">
      {/* Search Input */}
      <div className={`flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border transition-all duration-200 ${
        isOpen ? 'border-secondary ring-2 ring-secondary/20 w-80' : 'border-outline-variant w-56 hover:w-64'
      }`}>
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-secondary" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
        ) : (
          <span className="material-symbols-outlined text-[18px] text-outline">search</span>
        )}
        <input
          ref={inputRef}
          className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm font-medium text-on-surface placeholder:text-outline-variant flex-1 min-w-0"
          placeholder="Search orders, products..."
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (query.trim()) performSearch(query);
          }}
        />
        <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-surface-container-high rounded text-[10px] font-bold text-outline tracking-wider border border-outline-variant/50">
          Ctrl+K
        </kbd>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (query.trim() || results) && (
        <div className="absolute top-full mt-2 right-0 w-[420px] bg-white rounded-2xl border border-outline-variant shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Results Header */}
          {results && (
            <div className="px-4 py-3 border-b border-outline-variant/50 bg-surface-container-low">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  {results.total_count} result{results.total_count !== 1 ? 's' : ''} for "{results.query}"
                </span>
                <button
                  onClick={() => { setQuery(''); setResults(null); setIsOpen(false); }}
                  className="text-[10px] font-bold text-secondary uppercase tracking-wider hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && !results && (
            <div className="p-8 flex flex-col items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-secondary" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <span className="text-xs text-on-surface-variant font-medium">Searching...</span>
            </div>
          )}

          {/* No Results */}
          {results && results.total_count === 0 && (
            <div className="p-8 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[32px] text-outline-variant">search_off</span>
              <span className="text-sm text-on-surface-variant font-medium">No results found</span>
              <span className="text-xs text-outline">Try searching with different keywords</span>
            </div>
          )}

          {/* Grouped Results */}
          {groupedResults.length > 0 && (
            <div className="max-h-[380px] overflow-y-auto">
              {groupedResults.map(([category, items]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="px-4 py-2 bg-surface-container-low/50 border-b border-outline-variant/30 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-secondary">{getCategoryIcon(category)}</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{getCategoryLabel(category)}</span>
                    <span className="text-[10px] font-medium text-outline bg-surface-container px-1.5 py-0.5 rounded-full">{items.length}</span>
                  </div>

                  {/* Category Items */}
                  {items.map((item, idx) => (
                    <button
                      key={`${category}-${item.id}-${idx}`}
                      onClick={() => handleResultClick(item)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface-container-low transition-colors group border-b border-outline-variant/20 last:border-b-0"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                        <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors">
                          {getCategoryIcon(item.tab)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-on-surface truncate">{item.title}</div>
                        <div className="text-[11px] text-on-surface-variant truncate">{item.subtitle}</div>
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${item.badge_color}`}>
                        {item.badge}
                      </span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2.5 bg-surface-container-low border-t border-outline-variant/50 flex items-center justify-between">
            <span className="text-[10px] text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">bolt</span>
              Powered by Backend Search API
            </span>
            <div className="flex items-center gap-2 text-[10px] text-outline">
              <kbd className="px-1.5 py-0.5 bg-white border border-outline-variant/50 rounded text-[9px] font-bold">↑↓</kbd>
              <span>navigate</span>
              <kbd className="px-1.5 py-0.5 bg-white border border-outline-variant/50 rounded text-[9px] font-bold">esc</kbd>
              <span>close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
