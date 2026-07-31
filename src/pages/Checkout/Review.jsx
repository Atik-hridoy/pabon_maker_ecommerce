import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import OrderSummary from './OrderSummary';
import { placeOrder } from '../../api/checkoutService';

export default function Review() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, displayImage, shippingFormData, paymentMethod, appliedVoucher } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        cart_items: [{ product_id: product?.id, price: product?.price, quantity: quantity }],
        payment_method: paymentMethod,
        voucher_code: appliedVoucher,
        shipping_info: shippingFormData
      };
      
      const res = await placeOrder(payload);
      
      // Navigate to confirmation with the real order_number from backend
      navigate('/checkout/confirmation', { 
        state: { 
          ...location.state, 
          appliedVoucher,
          order_number: res.order_number,
          grand_total: res.grand_total
        } 
      });
    } catch (err) {
      console.error("Failed to place order", err);
      setError(err.data?.error || err.message || "Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="pt-8 pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full">
        {/* Checkout Stepper */}
        <div className="mb-12 flex items-center justify-center md:justify-start gap-8 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 text-secondary font-bold opacity-50 cursor-pointer" onClick={() => navigate('/checkout/shipping', { state: location.state })}>
            <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </span>
            <span className="font-label-caps text-xs tracking-wider">SHIPPING</span>
          </div>
          <div className="h-[1px] w-12 bg-secondary"></div>
          <div className="flex items-center gap-2 text-secondary font-bold opacity-50 cursor-pointer" onClick={() => navigate('/checkout/payment', { state: location.state })}>
            <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </span>
            <span className="font-label-caps text-xs tracking-wider">PAYMENT</span>
          </div>
          <div className="h-[1px] w-12 bg-secondary"></div>
          <div className="flex items-center gap-2 text-secondary font-bold">
            <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">3</span>
            <span className="font-label-caps text-xs tracking-wider">REVIEW</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Invoice Details */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-white border border-outline-variant p-8 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-outline-variant">
                <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">receipt_long</span>
                  Final Invoice Review
                </h2>
                <span className="text-sm font-bold text-on-surface-variant bg-surface-container py-1 px-3 rounded-full">
                  Uneditable
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Details */}
                <div>
                  <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Shipping Destination</h3>
                  <div className="text-sm text-on-surface leading-relaxed p-4 bg-surface-container-low rounded border border-outline-variant">
                    <p className="font-bold text-on-surface mb-1">{shippingFormData?.fullName || "Not Provided"}</p>
                    <p>{shippingFormData?.address || "No address provided"}</p>
                    {shippingFormData?.phone && <p className="mt-2 text-on-surface-variant">Phone: {shippingFormData.phone}</p>}
                    {shippingFormData?.email && <p className="text-on-surface-variant">Email: {shippingFormData.email}</p>}
                  </div>
                </div>
                
                {/* Payment Method */}
                <div>
                  <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Payment Method</h3>
                  <div className="text-sm text-on-surface leading-relaxed p-4 bg-surface-container-low rounded border border-outline-variant flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary">
                      {paymentMethod === 'cod' ? 'local_shipping' : paymentMethod === 'bkash' || paymentMethod === 'nagad' ? 'phone_iphone' : 'credit_card'}
                    </span>
                    <div>
                      <p className="font-bold text-on-surface mb-1">
                        {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'bkash' ? 'bKash Mobile Banking' : paymentMethod === 'nagad' ? 'Nagad Mobile Banking' : 'Card'}
                      </p>
                      <p className="text-on-surface-variant">
                        {paymentMethod === 'cod' ? 'Pay upon receiving the order' : 'Pay securely via gateway'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-4 border-t border-outline-variant text-sm text-on-surface-variant italic text-center">
                Please verify all the details above before confirming your order. Once confirmed, this invoice cannot be altered.
              </div>
            </section>

            <div className="flex items-center justify-between text-on-surface-variant px-2">
              <button onClick={() => navigate('/checkout/payment', { state: location.state })} className="flex items-center gap-2 hover:text-primary font-bold transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Return to Payment</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <OrderSummary 
            product={product} 
            quantity={quantity} 
            displayImage={displayImage} 
            paymentMethod={paymentMethod}
            initialVoucher={appliedVoucher}
            readonly={true}
          >
            {error && <div className="text-error text-sm font-bold text-center mt-4">{error}</div>}
            <button 
              onClick={handleConfirmOrder}
              disabled={loading}
              className="w-full bg-secondary text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-secondary/90 active:scale-95 transition-all flex justify-center items-center gap-2 group mt-6 disabled:opacity-70"
            >
              {loading ? (
                <>Processing... <span className="material-symbols-outlined animate-spin">refresh</span></>
              ) : (
                <>Confirm Order <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">check_circle</span></>
              )}
            </button>
          </OrderSummary>
        </div>
      </div>
    </MainLayout>
  );
}
