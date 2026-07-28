import React, { useMemo } from 'react';
import { mockProducts } from '../../../data/mockProducts';

export default function ProductDisplay({ selectedCategory }) {
  // If a category is selected, filter by it. Otherwise, show 8 random products.
  const displayedProducts = useMemo(() => {
    if (selectedCategory) {
      return mockProducts.filter(product => product.category === selectedCategory);
    }
    // Randomize for default view
    return [...mockProducts].sort(() => 0.5 - Math.random()).slice(0, 8);
  }, [selectedCategory]);

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

        {displayedProducts.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant font-medium">
            No products found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {displayedProducts.map((product) => (
              <div key={product.id} className="product-card-hover group border border-outline-variant p-6 transition-all bg-white relative">
                
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-secondary-container text-white px-2 py-1 text-[10px] font-black rounded uppercase">New</span>
                  </div>
                )}
                {product.isSale && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-error text-white px-2 py-1 text-[10px] font-black rounded uppercase">Sale</span>
                  </div>
                )}

                {/* Product Image */}
                <div className="aspect-square mb-6 overflow-hidden flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                {/* Product Details */}
                <div className="space-y-2">
                  
                  {/* Ratings */}
                  <div className="flex text-secondary-container gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[14px]" style={{fontVariationSettings: i < product.rating ? "'FILL' 1" : "'FILL' 0"}}>
                        star
                      </span>
                    ))}
                    <span className="text-outline text-[11px] font-medium ml-1">({product.reviews})</span>
                  </div>

                  <h3 className="font-body-base font-bold text-on-surface line-clamp-2">{product.title}</h3>
                  <p className="font-technical-data text-technical-data text-on-primary-container">{product.description}</p>
                  
                  {/* Price & Cart */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex flex-col">
                      {product.isSale && product.oldPrice && (
                        <span className="text-outline line-through text-xs">${product.oldPrice.toFixed(2)}</span>
                      )}
                      <span className={`text-headline-md font-black ${product.isSale ? 'text-secondary' : 'text-on-surface'}`}>
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button className="bg-primary-container text-white p-2 rounded hover:bg-secondary-container transition-colors">
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
    </section>
  );
}
