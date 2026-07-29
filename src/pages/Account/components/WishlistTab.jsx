import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../../data/mockProducts';

export default function WishlistTab() {
  const [wishlist, setWishlist] = useState(mockProducts.slice(0, 4));

  const handleRemove = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">favorite</span>
          <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">My Wishlist</h3>
        </div>
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
          {wishlist.length} Items
        </span>
      </div>
      
      {wishlist.length === 0 ? (
        <div className="p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-outline-variant mb-4">favorite_border</span>
          <h4 className="font-bold text-lg text-on-surface mb-2">Your wishlist is empty</h4>
          <p className="text-sm text-on-surface-variant mb-6">Save items you like to your wishlist so you can easily find them later.</p>
          <Link to="/" className="px-6 py-2 bg-secondary text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-secondary-container transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {wishlist.map(product => (
              <div key={product.id} className="flex gap-4 p-4 border border-outline-variant rounded-lg hover:border-secondary transition-colors group relative">
                <button 
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-error/10 hover:text-error text-on-surface-variant transition-colors z-10"
                  title="Remove from wishlist"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
                <div className="w-24 h-24 bg-surface-container-lowest rounded-md border border-outline-variant overflow-hidden flex-shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-on-surface text-sm pr-8 leading-tight">{product.title}</h4>
                    <div className="text-xs text-on-surface-variant mt-1">{product.description}</div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="font-bold text-secondary text-base">
                      ${product.price.toFixed(2)}
                    </div>
                    <button className="flex items-center justify-center gap-1 px-3 py-1.5 border border-outline-variant rounded text-xs font-bold text-on-surface hover:border-secondary hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined text-[14px]">shopping_cart</span>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
