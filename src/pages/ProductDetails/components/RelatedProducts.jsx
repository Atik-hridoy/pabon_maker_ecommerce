import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicProducts } from '../../../api/productService';
import { BASE_URL, getImageUrl } from '../../../api/client';

export default function RelatedProducts({ categoryName }) {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const response = await getPublicProducts(1, categoryName);
        if (response.success && response.data && response.data.results) {
          setAllProducts(response.data.results);
        }
      } catch (error) {
        console.error('Failed to fetch related products', error);
      } finally {
        setLoading(false);
      }
    };
    if (categoryName) {
      fetchRelated();
    }
  }, [categoryName]);

  const handleNext = () => {
    if (currentIndex + 4 < allProducts.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (loading || allProducts.length === 0) return null;

  const visibleProducts = allProducts.slice(currentIndex, currentIndex + 4);

  return (
    <section className="mb-24">
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-1">
          <span className="font-label-caps text-on-surface-variant tracking-widest">SYSTEM COMPLEMENTS</span>
          <h2 className="font-headline-md text-headline-md text-primary">Related Products</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full border border-outline-variant transition-all ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-variant'}`}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex + 4 >= allProducts.length}
            className={`p-2 rounded-full border border-outline-variant transition-all ${currentIndex + 4 >= allProducts.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-variant'}`}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-gutter overflow-hidden">
        {visibleProducts.map(product => {
          const coverImage = product.images?.find(img => img.is_cover)?.image || product.images?.[0]?.image;
          const finalImgUrl = getImageUrl(coverImage);
          
          return (
            <div key={product.id} onClick={() => navigate(`/product/${product.id}`)} className="bg-white border border-outline-variant rounded-xl p-6 part-shadow part-shadow-hover transition-all group flex flex-col cursor-pointer">
              <div className="aspect-square bg-surface-container-low rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden">
                {finalImgUrl ? (
                  <div className="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300" style={{ backgroundImage: `url('${finalImgUrl}')` }}></div>
                ) : (
                  <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                )}
                {product.isNew && <span className="absolute top-3 left-3 bg-primary text-white font-label-caps px-2 py-1 text-[10px] rounded">NEW</span>}
                {product.isSale && <span className="absolute top-3 left-3 bg-error text-white font-label-caps px-2 py-1 text-[10px] rounded">SALE</span>}
              </div>
              <h4 className="font-bold text-primary group-hover:text-secondary-container transition-colors line-clamp-2">{product.name}</h4>
              <p className="hidden md:block text-body-sm text-on-surface-variant mb-4 line-clamp-2">{product.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold text-primary">৳{Number(product.price).toFixed(2)}</span>
                <button className="hidden md:flex items-center justify-center p-2 bg-surface-container hover:bg-secondary-container hover:text-white rounded-lg transition-all" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}>
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
