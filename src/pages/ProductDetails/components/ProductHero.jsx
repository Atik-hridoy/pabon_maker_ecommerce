import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../api/client';
import { storage } from '../../../utils/localStorage';
import { cartService } from '../../../utils/cartService';

export default function ProductHero({ product }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  
  if (!product) return null;

  const handleAuthCheck = (action, redirect, state) => {
    if (!storage.isLoggedIn()) {
      window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { redirect, state } }));
      return;
    }
    action();
  };

  const handleBuyNow = () => {
    const checkoutState = { product, quantity, displayImage };
    handleAuthCheck(() => {
      navigate('/checkout/shipping', { state: checkoutState });
    }, '/checkout/shipping', checkoutState);
  };

  const handleAddToCart = () => {
    cartService.addToCart(product, quantity);
    alert('Added to cart!');
  };

  const defaultImage = product.images && product.images.length > 0 
    ? (product.images.find(img => img.is_cover)?.image || product.images[0].image) 
    : '';
  const displayImage = selectedImage || defaultImage;
  const displayImageUrl = displayImage ? (displayImage.startsWith('http') ? displayImage : `${BASE_URL}${displayImage}`) : '';

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start mb-16">
      {/* Left: Image Gallery */}
      <div className="lg:col-span-6 flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col order-2 md:order-1 gap-4 overflow-x-auto scrollbar-hide md:w-20">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, idx) => {
              const imgUrl = img.image.startsWith('http') ? img.image : `${BASE_URL}${img.image}`;
              const isSelected = selectedImage ? selectedImage === img.image : img.is_cover;
              return (
                <button 
                  key={img.id || idx} 
                  onClick={() => setSelectedImage(img.image)}
                  className={`w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden bg-white p-2 transition-all ${isSelected ? 'border-secondary-container' : 'border-outline-variant hover:border-secondary-container'}`}
                >
                  <img className="w-full h-full object-contain" alt={`${product.name} - ${idx}`} src={imgUrl} />
                </button>
              );
            })
          ) : (
            <button className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 border-2 border-secondary-container rounded-lg overflow-hidden bg-white p-2">
              <span className="material-symbols-outlined text-4xl text-outline-variant flex h-full items-center justify-center">image</span>
            </button>
          )}
        </div>
        <div className="flex-grow order-1 md:order-2 bg-white rounded-xl border border-outline-variant p-8 flex items-center justify-center part-shadow min-h-[400px]">
          {displayImageUrl ? (
            <img 
              className="max-w-full max-h-[500px] object-contain" 
              alt={product.name} 
              src={displayImageUrl} 
            />
          ) : (
            <span className="material-symbols-outlined text-[100px] text-outline-variant">image</span>
          )}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="font-label-caps text-secondary-container tracking-widest mb-2 block uppercase">{product.category_name}</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight mb-2">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex text-secondary-container">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: i < product.rating ? "'FILL' 1" : "'FILL' 0"}}>
                  star
                </span>
              ))}
            </div>
            <span className="text-body-sm text-on-surface-variant font-medium">({product.reviews} reviews)</span>
            <span className="w-[1px] h-4 bg-outline-variant mx-2"></span>
            <span className="text-body-sm font-technical-data text-green-600 flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">check_circle</span> In Stock - Ready to Ship
            </span>
          </div>
        </div>
        
        <div className="bg-surface-container-low p-6 rounded-lg space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="text-headline-md font-bold text-primary">৳{Number(product.price).toFixed(2)}</span>
            <span className="text-body-sm text-on-surface-variant">/ unit</span>
            {product.isSale && product.oldPrice && (
              <span className="text-outline line-through text-body-sm ml-2">৳{Number(product.oldPrice).toFixed(2)}</span>
            )}
          </div>

        </div>

        <div className="space-y-4">
          <p className="text-body-base text-on-surface-variant">{product.description}</p>
        </div>


        <div className="space-y-4 pt-4 border-t border-outline-variant">
          <div className="flex flex-col sm:flex-row gap-4 items-end pt-4">
            <div className="w-full sm:w-36 shrink-0">
              <label className="font-label-caps text-on-surface-variant block mb-2">QUANTITY</label>
              <div className="flex items-center justify-between bg-surface-container-low border border-outline-variant rounded-lg h-[56px] px-2 shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-outline-variant hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">remove</span>
                </button>
                <input 
                  className="w-10 text-center border-none focus:ring-0 text-headline-md font-bold bg-transparent p-0" 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1" 
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-outline-variant hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </button>
              </div>
            </div>
            <div className="flex gap-4 flex-grow w-full">
              <button onClick={handleBuyNow} className="flex-1 bg-primary text-white font-bold h-[56px] rounded shadow-lg transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">bolt</span>
                BUY NOW
              </button>
              <button onClick={handleAddToCart} className="flex-1 bg-secondary-container text-white font-bold h-[56px] rounded shadow-lg transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">shopping_cart</span>
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
