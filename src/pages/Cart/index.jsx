import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { cartService } from '../../utils/cartService';
import { BASE_URL } from '../../api/client';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    setCartItems(cartService.getCart());
  };

  const handleUpdateQuantity = (productId, currentQty, delta) => {
    const newQty = Math.max(1, currentQty + delta);
    cartService.updateQuantity(productId, newQty);
  };

  const handleRemove = (productId) => {
    cartService.removeFromCart(productId);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
  const tax = subtotal * 0.085; // 8.5% est tax
  const total = subtotal + tax;

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout/shipping', { 
      state: { 
        cartItems: cartItems 
      } 
    });
  };

  return (
    <MainLayout>
      <div className="pt-12 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full flex-grow">
        <h1 className="font-headline-md text-headline-md mb-8">
          Shopping Cart <span className="text-on-surface-variant font-normal text-title-sm">({cartService.getCartCount()} items)</span>
        </h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-surface-container-low rounded-lg border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-outline-variant mb-4">shopping_cart</span>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-on-surface-variant mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded hover:bg-on-primary-fixed-variant transition-colors font-bold">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pb-24">
            <div className="lg:col-span-8 space-y-6">
              {cartItems.map((item) => {
                const imgUrl = item.product.images && item.product.images.length > 0 
                  ? (item.product.images.find(img => img.is_cover)?.image || item.product.images[0].image) 
                  : '';
                const finalImgUrl = imgUrl ? (imgUrl.startsWith('http') ? imgUrl : `${BASE_URL}${imgUrl}`) : '';
                
                return (
                  <div key={item.product.id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 group transition-all hover:shadow-sm">
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-surface-container-low rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {finalImgUrl ? (
                          <img className="w-full h-full object-cover" alt={item.product.name} src={finalImgUrl} />
                        ) : (
                          <span className="material-symbols-outlined text-outline-variant text-4xl">image</span>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-code-label text-code-label text-primary bg-primary-fixed px-2 py-0.5 rounded-sm uppercase">{item.product.category_name || 'PRODUCT'}</span>
                            <h3 className="font-title-sm text-title-sm mt-1">{item.product.name}</h3>
                          </div>
                          <span className="font-title-sm text-title-sm text-primary">৳{(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex items-center border border-outline-variant rounded-full overflow-hidden">
                            <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity, -1)} className="px-4 py-2 hover:bg-surface-container transition-colors">
                              <span className="material-symbols-outlined text-sm leading-none">remove</span>
                            </button>
                            <span className="px-4 py-2 font-code-label border-x border-outline-variant min-w-[48px] text-center">{item.quantity}</span>
                            <button onClick={() => handleUpdateQuantity(item.product.id, item.quantity, 1)} className="px-4 py-2 hover:bg-surface-container transition-colors">
                              <span className="material-symbols-outlined text-sm leading-none">add</span>
                            </button>
                          </div>
                          <button onClick={() => handleRemove(item.product.id)} className="flex items-center gap-2 text-error font-caption hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined text-base">delete</span>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="pt-4">
                <Link className="flex items-center gap-2 text-primary font-body-md hover:underline transition-all" to="/">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Continue Shopping
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-surface-container border border-outline-variant rounded-lg p-8">
                <h2 className="font-headline-md text-2xl mb-8">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-on-surface-variant font-body-md">Subtotal</span>
                    <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                    <span className="font-code-label">৳{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-on-surface-variant font-body-md">Shipping</span>
                    <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                    <span className="font-code-label text-secondary">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-on-surface-variant font-body-md">Estimated Tax</span>
                    <div className="flex-grow mx-2 h-px circuit-line opacity-30 mb-1"></div>
                    <span className="font-code-label">৳{tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t-2 border-outline-variant space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="font-title-sm text-title-sm">Estimated Total</span>
                    <span className="font-display-lg text-3xl text-primary">৳{total.toFixed(2)}</span>
                  </div>
                  <div className="space-y-4">
                    <button onClick={handleProceedToCheckout} className="w-full bg-primary text-white font-title-sm py-4 rounded-sm hover:bg-on-primary-fixed-variant transition-all flex items-center justify-center gap-3 group">
                      Proceed to Checkout
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>
                    <div className="flex items-center justify-center gap-2 text-on-surface-variant font-caption py-2 border border-outline-variant/30 rounded">
                      <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                      Secure 256-bit SSL Encrypted Payment
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
