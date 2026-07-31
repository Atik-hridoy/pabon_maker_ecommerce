import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../api/productService';
import { BASE_URL } from '../../../api/client';

export default function CategoriesGrid({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-12">
          <div>
            <p className="text-secondary font-label-caps text-[10px] md:text-label-caps tracking-widest mb-1 md:mb-2 uppercase">Precision Modules</p>
            <h2 className="text-2xl md:font-headline-md md:text-headline-md font-bold text-on-surface">SHOP BY CATEGORY</h2>
          </div>
          <button 
            onClick={() => navigate('/categories')}
            className="text-secondary font-bold text-[10px] md:text-label-caps uppercase tracking-wider hover:underline self-start md:self-auto"
          >
            VIEW ALL CATEGORIES
          </button>
        </div>
        
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-gutter scrollbar-hide pb-4 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.name)}
                className={`group cursor-pointer flex-shrink-0 w-16 sm:w-20 md:w-auto flex flex-col items-center gap-2 md:gap-4 transition-transform duration-300 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-full md:h-auto md:aspect-square bg-white border rounded-full flex items-center justify-center p-3 md:p-8 transition-all duration-300 overflow-hidden ${isSelected ? 'border-secondary border-2 shadow-[0_10px_20px_rgba(254,107,0,0.15)]' : 'border-outline-variant group-hover:border-secondary'}`}>
                  {cat.image ? (
                    <img 
                      className="w-full h-full object-contain" 
                      alt={cat.name} 
                      src={cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`} 
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[32px] md:text-[48px] text-on-surface-variant">category</span>
                  )}
                </div>
                <p className={`text-[10px] sm:text-xs text-center font-medium leading-tight transition-colors ${isSelected ? 'text-secondary font-bold' : 'text-on-surface group-hover:text-secondary'}`}>
                  {cat.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
