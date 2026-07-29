import React from 'react';

export default function SidebarFilter({ filters, setFilters, availableFilters }) {
  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => {
      const currentList = prev[filterType];
      if (currentList.includes(value)) {
        return { ...prev, [filterType]: currentList.filter(item => item !== value) };
      } else {
        return { ...prev, [filterType]: [...currentList, value] };
      }
    });
  };

  const renderFilterSection = (title, filterType, options) => (
    <div className="mb-6 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
      <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4">{title}</h3>
      <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
        {options.map((option, idx) => (
          <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={() => handleCheckboxChange(filterType, option)}>
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
              filters[filterType].includes(option) 
                ? 'bg-secondary border-secondary text-white' 
                : 'border-outline-variant bg-surface group-hover:border-secondary'
            }`}>
              {filters[filterType].includes(option) && <span className="material-symbols-outlined text-[14px]">check</span>}
            </div>
            <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <aside className="w-full md:w-64 flex-shrink-0 bg-surface rounded-lg border border-outline-variant p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden md:block">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined">filter_list</span> Filters
        </h2>
        <button 
          onClick={() => setFilters({ category: [], packageSize: [], voltage: [], color: [] })}
          className="text-xs font-bold text-secondary hover:text-secondary-container uppercase tracking-wider"
        >
          Reset All
        </button>
      </div>

      {renderFilterSection('Category', 'category', availableFilters.categories)}
      {renderFilterSection('Voltage', 'voltage', availableFilters.voltages)}
      {renderFilterSection('Package Size', 'packageSize', availableFilters.packageSizes)}
      {renderFilterSection('Color', 'color', availableFilters.colors)}
    </aside>
  );
}
