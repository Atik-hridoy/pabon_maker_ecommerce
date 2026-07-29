import React from 'react';
import { Link } from 'react-router-dom';

function CategoryProductCard({ product }) {
  return (
    <div className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:border-secondary transition-colors">
      <Link to={`/product/${product.id}`} className="relative h-48 bg-surface-container-lowest flex items-center justify-center p-4 border-b border-outline-variant block">
        <img className="max-h-full object-contain" src={product.image} alt={product.title} />
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-secondary-container text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 left-2 bg-error text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Sale
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/product/${product.id}`} className="hover:text-secondary transition-colors">
            <h3 className="font-bold text-sm text-on-surface line-clamp-2" title={product.title}>{product.title}</h3>
          </Link>
        </div>
        
        <p className="text-xs text-on-surface-variant mb-3 line-clamp-1">{product.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4 mt-auto">
           {product.voltage && product.voltage !== 'N/A' && (
             <span className="text-[10px] font-technical-data border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant bg-surface-container-low">{product.voltage}</span>
           )}
           {product.packageSize && (
             <span className="text-[10px] font-technical-data border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant bg-surface-container-low">{product.packageSize}</span>
           )}
           {product.color && product.color !== 'Multicolor' && product.color !== 'Silver' && product.color !== 'Black' && (
             <span className="text-[10px] font-technical-data border border-outline-variant px-1.5 py-0.5 rounded text-on-surface-variant bg-surface-container-low flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color.toLowerCase() }}></span>
               {product.color}
             </span>
           )}
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-outline-variant">
          <div>
            <span className="font-bold text-secondary">${product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-xs text-outline-variant line-through ml-2">${product.oldPrice.toFixed(2)}</span>}
          </div>
          <button className="w-8 h-8 rounded bg-surface-container hover:bg-secondary-container hover:text-white transition-colors flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CategoryProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 bg-surface rounded-lg border border-outline-variant border-dashed">
        <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">search_off</span>
        <h3 className="font-bold text-lg text-on-surface mb-2">No products found</h3>
        <p className="text-sm text-on-surface-variant">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map(product => (
          <CategoryProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
