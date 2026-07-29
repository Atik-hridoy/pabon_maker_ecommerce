import React, { useState, useMemo } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import SidebarFilter from './components/SidebarFilter';
import CategoryProductGrid from './components/CategoryProductGrid';
import { mockProducts } from '../../data/mockProducts';

export default function CategoryBrowse() {
  const [filters, setFilters] = useState({
    category: [],
    packageSize: [],
    voltage: [],
    color: []
  });

  // Extract unique filter options from the dataset
  const availableFilters = useMemo(() => {
    const categories = new Set();
    const packageSizes = new Set();
    const voltages = new Set();
    const colors = new Set();

    mockProducts.forEach(p => {
      if (p.category) categories.add(p.category);
      if (p.packageSize) packageSizes.add(p.packageSize);
      if (p.voltage && p.voltage !== 'N/A') voltages.add(p.voltage);
      if (p.color) colors.add(p.color);
    });

    return {
      categories: Array.from(categories).sort(),
      packageSizes: Array.from(packageSizes).sort(),
      voltages: Array.from(voltages).sort(),
      colors: Array.from(colors).sort()
    };
  }, []);

  // Filter products based on selected state
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // If a filter type has selected options, the product MUST match one of them
      const categoryMatch = filters.category.length === 0 || filters.category.includes(product.category);
      const packageMatch = filters.packageSize.length === 0 || filters.packageSize.includes(product.packageSize);
      const voltageMatch = filters.voltage.length === 0 || filters.voltage.includes(product.voltage);
      const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);

      return categoryMatch && packageMatch && voltageMatch && colorMatch;
    });
  }, [filters]);

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
            Find the exact parts you need using our advanced technical filters. Over {mockProducts.length} high-quality components in stock and ready to ship.
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
                Showing {filteredProducts.length} Results
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

            <CategoryProductGrid products={filteredProducts} />
          </div>
          
        </div>
      </main>
    </MainLayout>
  );
}
