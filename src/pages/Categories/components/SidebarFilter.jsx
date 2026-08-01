import React from 'react';

export default function SidebarFilter({ filters, setFilters, availableFilters, isMobileOpen, setIsMobileOpen }) {
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

  const renderFilterSection = (title, filterType, options) => {
    if (!options || options.length === 0) return null;
    return (
      <div className="mb-6 border-b border-outline-variant pb-6 last:border-0 last:pb-0">
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-4">{title}</h3>
        <div className="space-y-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
          {options.map((option, idx) => {
            const isChecked = filters[filterType].includes(option);
            return (
              <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={(e) => { e.preventDefault(); handleCheckboxChange(filterType, option); }}>
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  isChecked 
                    ? 'bg-secondary border-secondary text-white' 
                    : 'border-outline-variant bg-surface group-hover:border-secondary'
                }`}>
                  {isChecked && <span className="material-symbols-outlined text-[14px]">check</span>}
                </div>
                <span className={`text-sm transition-colors ${isChecked ? 'text-on-surface font-bold' : 'text-on-surface-variant group-hover:text-on-surface'}`}>{option}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const filterContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">filter_list</span> Filters
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
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-surface rounded-xl border border-outline-variant p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto hidden md:block">
        {filterContent}
      </aside>

      {/* Mobile Drawer Modal */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center pb-4 mb-4 border-b border-outline-variant">
              <h2 className="font-bold text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">filter_list</span> Filter Options
              </h2>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1">
              {filterContent}
            </div>

            <div className="pt-4 border-t border-outline-variant">
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md text-xs uppercase tracking-wider"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
