import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../api/client';
import { calculateCheckout } from '../../api/checkoutService';

export default function OrderSummary({ product, quantity, displayImage, paymentMethod, readonly = false, initialVoucher = null, onVoucherChange, children }) {
  const [totals, setTotals] = useState({
    subtotal: 0,
    discount_amount: 0,
    vat: 0,
    delivery_charge: 0,
    gateway_fee: 0,
    grand_total: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [voucherInput, setVoucherInput] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState(initialVoucher);
  const [voucherMsg, setVoucherMsg] = useState({ text: '', type: '' });

  useEffect(() => {
    const fetchTotals = async () => {
      if (!product) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const payload = {
          cartItems: [{ price: product.price, quantity: quantity }],
          paymentMethod: paymentMethod ? paymentMethod.toUpperCase() : "COD"
        };
        if (appliedVoucher) {
          payload.voucher_code = appliedVoucher;
        }
        
        const data = await calculateCheckout(payload);
        
        setTotals({
          subtotal: data.subtotal || 0,
          discount_amount: data.discount_amount || 0,
          vat: data.vat_amount || 0,
          delivery_charge: data.delivery_charge || 0,
          gateway_fee: data.gateway_charge || 0,
          grand_total: data.grand_total || 0
        });

        if (appliedVoucher && !data.applied_voucher) {
           setVoucherMsg({ text: 'Invalid or expired voucher code', type: 'error' });
           setAppliedVoucher(null);
        } else if (data.applied_voucher) {
           setVoucherMsg({ text: `Voucher '${data.applied_voucher.code}' applied!`, type: 'success' });
        } else {
           setVoucherMsg({ text: '', type: '' });
        }

      } catch (err) {
        console.error('Failed to calculate checkout:', err);
        setError('Failed to calculate totals.');
      } finally {
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(fetchTotals, 300);
    return () => clearTimeout(timeoutId);
  }, [product, quantity, paymentMethod, appliedVoucher]);

  const handleApplyVoucher = () => {
    if (voucherInput.trim()) {
      const code = voucherInput.trim();
      setAppliedVoucher(code);
      setVoucherMsg({ text: '', type: '' });
      if (onVoucherChange) onVoucherChange(code);
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setVoucherMsg({ text: '', type: '' });
    setVoucherInput('');
    if (onVoucherChange) onVoucherChange(null);
  };

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
        <div className="space-y-3 border-t border-outline-variant pt-6 mb-8 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center rounded">
               <span className="material-symbols-outlined animate-spin text-secondary text-2xl">refresh</span>
            </div>
          )}
          {error && (
            <div className="text-error text-xs mb-2 font-bold">{error}</div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Subtotal</span>
            <span className="text-on-surface">৳{totals.subtotal.toFixed(2)}</span>
          </div>
          {totals.discount_amount > 0 && (
            <div className="flex justify-between text-sm text-green-600 font-bold">
              <span>Discount (Voucher)</span>
              <span>-৳{totals.discount_amount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">VAT</span>
            <span className="text-on-surface">৳{totals.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-on-surface-variant">Delivery Charge</span>
            <span className="text-on-surface">৳{totals.delivery_charge.toFixed(2)}</span>
          </div>
          {totals.gateway_fee > 0 && (
            <div className="flex justify-between text-sm text-secondary">
              <span className="font-bold">Gateway Fee</span>
              <span className="font-bold">৳{totals.gateway_fee.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center border-t border-outline-variant pt-6 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 rounded"></div>
          )}
          <span className="font-bold text-lg text-primary">Total</span>
          <span className="font-bold text-2xl text-secondary">৳{totals.grand_total.toFixed(2)}</span>
        </div>
        {/* Promo Code - Hidden in Readonly/Review mode */}
        {!readonly && (
          <div className="mb-8 mt-8 space-y-2">
            {appliedVoucher && totals.discount_amount > 0 ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded text-sm">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <span className="material-symbols-outlined text-[18px]">local_offer</span>
                  {appliedVoucher.toUpperCase()} Applied
                </div>
                <button onClick={handleRemoveVoucher} className="text-error font-bold text-xs hover:underline uppercase tracking-wider">Remove</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input 
                  className="flex-1 border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-secondary uppercase" 
                  placeholder="Voucher Code" 
                  type="text" 
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyVoucher()}
                />
                <button 
                  onClick={handleApplyVoucher}
                  disabled={loading || !voucherInput.trim()}
                  className="bg-surface-container text-primary px-4 rounded text-xs font-bold hover:bg-surface-variant transition-colors disabled:opacity-50"
                >
                  Apply
                </button>
              </div>
            )}
            
            {voucherMsg.text && (
              <p className={`text-xs font-bold ${voucherMsg.type === 'error' ? 'text-error' : 'text-green-600'}`}>
                {voucherMsg.text}
              </p>
            )}
          </div>
        )}
        <div className="mt-4 flex items-center justify-center gap-2 text-on-surface-variant opacity-60 mb-6">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span className="text-[11px] font-bold uppercase tracking-tighter">SECURE 256-BIT ENCRYPTION</span>
        </div>
        {children}
      </div>
    </aside>
  );
}
