import React, { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import SidebarFilter from './components/SidebarFilter';
import CategoryProductGrid from './components/CategoryProductGrid';
import { getPublicProducts, getCategories } from '../../api/productService';

export default function CategoryBrowse() {
  const [filters, setFilters] = useState({
    category: [],
    packageSize: [],
    voltage: [],
    color: []
  });

  const [availableFilters, setAvailableFilters] = useState({
    categories: [],
    packageSizes: [],
    voltages: [],
    colors: []
  });

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch Categories for Sidebar & Chips
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.data) {
          setAvailableFilters(prev => ({
            ...prev,
            categories: response.data.map(cat => cat.name).sort()
          }));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCats();
  }, []);

  // Fetch Products based on selected categories and page
  useEffect(() => {
    const fetchProds = async () => {
      setLoading(true);
      try {
        const catFilters = filters.category.length > 0 ? filters.category : null;
        const response = await getPublicProducts(page, catFilters);
        
        if (response.success && response.data) {
          setTotalCount(response.data.count);
          setHasMore(!!response.data.next);
          
          if (page === 1) {
            setProducts(response.data.results);
          } else {
            setProducts(prev => [...prev, ...response.data.results]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProds();
  }, [page, filters.category]);

  // Reset page when category filter changes
  useEffect(() => {
    setPage(1);
  }, [filters.category]);

  const removeFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const handleCategoryChipClick = (catName) => {
    setFilters(prev => {
      const isSelected = prev.category.includes(catName);
      const updatedCategories = isSelected
        ? prev.category.filter(item => item !== catName)
        : [...prev.category, catName];
      return {
        ...prev,
        category: updatedCategories
      };
    });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-8">
          <h1 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-on-surface uppercase">
            Browse Components
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1.5 max-w-2xl">
            Find the exact parts you need using our technical filters. Explore our high-quality components in stock and ready to ship.
          </p>

          {/* Horizontal Category Chips (Mobile & Desktop) */}
          <div className="mt-4 pt-4 border-t border-outline-variant/40 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
            <button 
              onClick={() => setFilters(prev => ({ ...prev, category: [] }))}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                filters.category.length === 0 
                  ? 'bg-secondary-container text-white shadow-sm' 
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              All Categories
            </button>
            {availableFilters.categories.map((catName) => {
              const isSelected = filters.category.includes(catName);
              return (
                <button
                  key={catName}
                  onClick={() => handleCategoryChipClick(catName)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    isSelected 
                      ? 'bg-secondary-container text-white shadow-sm' 
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {catName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-6 md:py-8 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <SidebarFilter 
            filters={filters} 
            setFilters={setFilters} 
            availableFilters={availableFilters} 
            isMobileOpen={isMobileFilterOpen}
            setIsMobileOpen={setIsMobileFilterOpen}
          />

          <div className="flex-1 min-w-0 w-full">
            {/* Top Toolbar */}
            <div className="flex flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-outline-variant">
              <div className="text-xs sm:text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Showing {products.length} of {totalCount} Results
              </div>
              
              <div className="flex items-center gap-2">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-xs font-bold text-on-surface active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">filter_list</span>
                  <span>Filter</span>
                  {getActiveFiltersCount() > 0 && (
                    <span className="w-4 h-4 rounded-full bg-secondary text-white text-[10px] flex items-center justify-center font-black">
                      {getActiveFiltersCount()}
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  <span className="hidden sm:inline text-xs font-bold text-outline uppercase tracking-wider">Sort:</span>
                  <select className="text-xs sm:text-sm border border-outline-variant bg-surface rounded-lg px-2.5 py-1.5 focus:ring-secondary focus:border-secondary font-medium">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Chips */}
            {getActiveFiltersCount() > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([filterType, values]) => (
                  values.map(val => (
                    <div key={`${filterType}-${val}`} className="flex items-center gap-1 bg-surface-container border border-outline-variant rounded-full px-3 py-1 text-xs font-medium text-on-surface-variant">
                      <span>{val}</span>
                      <button 
                        onClick={() => removeFilter(filterType, val)}
                        className="material-symbols-outlined text-[14px] hover:text-error transition-colors"
                      >
                        close
                      </button>
                    </div>
                  ))
                ))}
                <button 
                  onClick={() => setFilters({ category: [], packageSize: [], voltage: [], color: [] })}
                  className="text-xs font-bold text-secondary hover:text-secondary-container ml-2 uppercase tracking-wider"
                >
                  Clear All
                </button>
              </div>
            )}

            <CategoryProductGrid products={products} />
            
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={() => setPage(p => p + 1)} 
                  disabled={loading}
                  className="px-6 py-2.5 bg-surface-container border border-outline-variant rounded-xl font-bold text-xs uppercase tracking-wider text-on-surface-variant hover:bg-secondary-container hover:text-white hover:border-secondary-container transition-all"
                >
                  {loading ? 'Loading...' : 'Load More Products'}
                </button>
              </div>
            )}
            {loading && products.length === 0 && (
              <div className="py-20 text-center text-on-surface-variant">
                <span className="material-symbols-outlined animate-spin text-[32px]">progress_activity</span>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </MainLayout>
  );
}
