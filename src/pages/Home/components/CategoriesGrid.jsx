import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../../api/productService';
import { BASE_URL } from '../../../api/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CategoriesGrid({ selectedCategory, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

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

  useEffect(() => {
    if (categories.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(".cat-item", {
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 90%",
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  return (
    <section ref={sectionRef} className="py-8 md:py-20 bg-surface overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-4 md:mb-12">
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
        
        <div ref={cardsContainerRef} className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-gutter scrollbar-hide py-2 pb-6 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div 
                key={cat.id}
                onClick={() => onSelectCategory?.(cat.name)}
                className={`cat-item group cursor-pointer flex-shrink-0 w-24 sm:w-28 md:w-auto flex flex-col items-center gap-2 md:gap-4 transition-transform duration-300 ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-full md:h-auto md:aspect-square bg-white border rounded-2xl flex items-center justify-center p-3 md:p-6 transition-all duration-300 overflow-hidden ${isSelected ? 'border-secondary border-2 shadow-[0_10px_20px_rgba(254,107,0,0.15)]' : 'border-outline-variant group-hover:border-secondary shadow-sm hover:shadow-md'}`}>
                  {cat.image ? (
                    <img 
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" 
                      alt={cat.name} 
                      src={cat.image.startsWith('http') ? cat.image : `${BASE_URL}${cat.image}`} 
                    />
                  ) : (
                    <span className="material-symbols-outlined text-[32px] md:text-[48px] text-on-surface-variant transition-transform duration-500 group-hover:scale-110">category</span>
                  )}
                </div>
                <p className={`text-xs text-center font-bold leading-tight transition-colors px-1 ${isSelected ? 'text-secondary font-bold' : 'text-on-surface group-hover:text-secondary'}`}>
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
