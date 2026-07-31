import React from 'react';
import { BASE_URL } from '../../api/client';

export default function OrderSummary({ product, quantity, displayImage, children }) {
  const subtotal = product ? Number(product.price) * quantity : 0;
  const tax = subtotal * 0.085; // 8.5%
  const shipping = 34.00; // hardcoded for now
  const total = subtotal + tax + shipping;

  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="bg-surface-container-low border border-outline-variant rounded p-8 shadow-sm sticky top-32">
        <h3 className="text-xl font-bold text-primary mb-6 border-b border-outline-variant pb-4">Order Summary</h3>
        {/* Item List */}
        <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
          {product ? (
            <div className="flex gap-4 items-start">
              <div className="w-16 h-16 bg-surface-container rounded border border-outline-variant flex-shrink-0 relative overflow-hidden p-1">
                {displayImage ? (
                  <img className="w-full h-full object-contain" alt={product.name} src={displayImage.startsWith('http') ? displayImage : `${BASE_URL}${displayImage}`} />
                ) : (
                  <span className="material-symbols-outlined text-outline-variant flex h-full items-center justify-center">image</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-on-surface truncate">{product.name}</p>
                <p className="text-xs text-on-surface-variant">Category: {product.category_name || 'N/A'}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs">Qty: {quantity}</span>
                  <span className="text-xs font-bold">৳{(Number(product.price) * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-on-surface-variant">No items in checkout.</p>
          )}
        </div>
        {/* Financial Breakdown */}
        <div className="space-y-3 border-t border-outline-variant pt-6 mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="text-on-surface">৳{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Tax (8.5%)</span>
            <span className="text-on-surface">৳{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Shipping (Express)</span>
            <span className="text-on-surface">৳{shipping.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-outline-variant pt-6">
          <span className="font-bold text-lg text-primary">Total</span>
          <span className="font-bold text-2xl text-secondary">৳{total.toFixed(2)}</span>
        </div>
        {/* Promo Code */}
        <div className="mb-8 mt-8">
          <div className="flex gap-2">
            <input className="flex-1 border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-secondary" placeholder="Project Voucher Code" type="text" />
            <button className="bg-surface-container text-primary px-4 rounded text-xs font-bold hover:bg-surface-variant transition-colors">Apply</button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-on-surface-variant opacity-60 mb-6">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="text-[11px] font-bold uppercase tracking-tighter">SECURE 256-BIT ENCRYPTION</span>
        </div>
        {children}
      </div>
    </aside>
  );
}
