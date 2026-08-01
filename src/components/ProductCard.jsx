import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../api/client';
import { toggleWishlist } from '../api/activityService';
import { cartService } from '../utils/cartService';
import { storage } from '../utils/localStorage';

export default function ProductCard({ product, initialWishlisted = false }) {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const imgUrl = product.images && product.images.length > 0 ? (product.images.find(img => img.is_cover)?.image || product.images[0].image) : '';
  const finalImgUrl = imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}${imgUrl}`;

  useEffect(() => {
    setIsWishlisted(initialWishlisted);
  }, [initialWishlisted]);

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!storage.isLoggedIn()) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }
    try {
      await toggleWishlist(product.id);
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Failed to toggle wishlist', error);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!storage.isLoggedIn()) {
      window.dispatchEvent(new CustomEvent('openAuthModal'));
      return;
    }
    setIsAddingToCart(true);
    cartService.addToCart(product, 1);
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const goToProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={goToProduct}
      className="bg-surface border border-outline-variant rounded-lg overflow-hidden flex flex-col group hover:border-secondary transition-colors relative block cursor-pointer"
    >
      <button 
        onClick={handleWishlistClick}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-outline-variant hover:text-error transition-all shadow-sm z-30 flex items-center justify-center"
      >
        <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'text-error fill-current font-variation-fill' : ''}`} style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}>
          favorite
        </span>
      </button>

      <div className="relative h-48 bg-surface-container-lowest flex items-center justify-center p-4 border-b border-outline-variant block">
        {imgUrl ? (
          <img className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" src={finalImgUrl} alt={product.name || product.title} />
        ) : (
          <span className="material-symbols-outlined text-4xl text-outline-variant">image</span>
        )}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-secondary-container text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
            New
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 left-2 bg-error text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded z-10">
            Sale
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div className="hover:text-secondary transition-colors">
            <h3 className="font-bold text-sm text-on-surface line-clamp-2" title={product.name || product.title}>{product.name || product.title}</h3>
          </div>
        </div>
        
        <p className="hidden md:block text-xs text-on-surface-variant mb-3 line-clamp-1">{product.description || 'Quality component'}</p>
        
        <div className="hidden md:flex flex-wrap gap-1 mb-4 mt-auto">
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
            <span className="font-bold text-secondary">৳{Number(product.price).toFixed(2)}</span>
            {product.oldPrice && <span className="text-xs text-outline-variant line-through ml-2">৳{Number(product.oldPrice).toFixed(2)}</span>}
          </div>
          <button 
            disabled={isAddingToCart}
            className={`flex w-8 h-8 rounded transition-colors items-center justify-center z-20 ${isAddingToCart ? 'bg-green-600 text-white' : 'bg-surface-container hover:bg-secondary-container hover:text-white text-on-surface-variant'}`}
            onClick={handleAddToCart}
          >
            <span className="material-symbols-outlined text-[18px]">{isAddingToCart ? 'check_circle' : 'shopping_cart'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
