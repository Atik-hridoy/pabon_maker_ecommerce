import React, { useState, useEffect, useMemo } from 'react';
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

  // Fetch Categories for Sidebar
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

  // Fetch Products based on selected category and page
  useEffect(() => {
    const fetchProds = async () => {
      setLoading(true);
      try {
        // If multiple categories are selected, we pass the first one to the API for now
        const catFilter = filters.category.length > 0 ? filters.category[0] : null;
        const response = await getPublicProducts(page, catFilter);
        
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

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((acc, curr) => acc + curr.length, 0);
  };

  return (
    <MainLayout>
      <div className="bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8">
          <h1 className="font-display-lg text-3xl md:text-4xl font-black tracking-tighter text-on-surface uppercase">
            Browse Components
          </h1>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
            Find the exact parts you need using our advanced technical filters. Explore our high-quality components in stock and ready to ship.
          </p>
        </div>
      </div>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 min-h-screen">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          <SidebarFilter 
            filters={filters} 
            setFilters={setFilters} 
            availableFilters={availableFilters} 
          />

          <div className="flex-1 min-w-0">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-outline-variant">
              <div className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">
                Showing {products.length} of {totalCount} Results
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-outline uppercase tracking-wider">Sort By:</span>
                <select className="text-sm border border-outline-variant bg-surface rounded px-3 py-1.5 focus:ring-secondary focus:border-secondary font-medium">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
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
                  className="px-6 py-2 bg-surface-container border border-outline-variant rounded-lg font-bold text-on-surface-variant hover:bg-secondary-container hover:text-white hover:border-secondary-container transition-all"
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
