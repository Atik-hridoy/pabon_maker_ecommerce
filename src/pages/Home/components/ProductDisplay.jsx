import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicProducts } from '../../../api/productService';
import { BASE_URL } from '../../../api/client';

export default function ProductDisplay({ selectedCategory }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Reset when category changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (loading || !hasMore) return;
      
      try {
        setLoading(true);
        const response = await getPublicProducts(page, selectedCategory);
        if (response.success && response.data) {
          const newProducts = response.data.results || [];
          setProducts(prev => {
            // Avoid duplicates by checking IDs
            const existingIds = new Set(prev.map(p => p.id));
            const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
            return [...prev, ...uniqueNew];
          });
          setHasMore(response.data.next !== null);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, selectedCategory]);

  return (
    <section className="py-12 bg-white min-h-[400px]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="mb-8">
          <p className="text-secondary font-label-caps text-label-caps tracking-widest mb-2 uppercase">
            {selectedCategory ? 'Filtered Products' : 'All Products'}
          </p>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {selectedCategory || 'FEATURED COMPONENTS'}
          </h2>
        </div>

        {products.length === 0 && !loading ? (
          <div className="text-center py-20 text-on-surface-variant font-medium">
            No products found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {products.map((product) => {
              const coverImage = product.images?.find(img => img.is_cover)?.image || product.images?.[0]?.image;
              
              return (
                <div 
                  key={product.id} 
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="product-card-hover group border border-outline-variant p-4 transition-all bg-white relative block cursor-pointer rounded-lg"
                >
                  
                  {/* Product Image */}
                  <div className="h-32 mb-4 overflow-hidden flex items-center justify-center p-2 bg-surface-container-lowest rounded">
                    {coverImage ? (
                      <img 
                        src={coverImage.startsWith('http') ? coverImage : `${BASE_URL}${coverImage}`}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-sm text-on-surface line-clamp-2">{product.name}</h3>
                    <p className="hidden md:block text-xs text-on-surface-variant line-clamp-1">{product.description}</p>
                    
                    {/* Price & Cart */}
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-on-surface">
                          ৳ {product.price}
                        </span>
                      </div>
                      <button 
                        className="hidden md:block bg-surface-container text-on-surface-variant p-1.5 rounded hover:bg-secondary-container hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          // Add to cart logic here
                        }}
                      >
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          </div>
        )}

        {!loading && hasMore && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={() => setPage(prev => prev + 1)}
              className="px-6 py-3 border border-outline-variant text-on-surface font-label-caps tracking-widest text-[12px] uppercase rounded-full hover:bg-surface transition-all hover:border-secondary"
            >
              Load More
            </button>
          </div>
        )}
        
      </div>
    </section>
  );
}
