import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import OrderSummary from './OrderSummary';
export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, displayImage, shippingFormData } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('cod');

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
          <div className="flex items-center gap-2 text-secondary font-bold">
            <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">2</span>
            <span className="font-label-caps text-xs tracking-wider">PAYMENT</span>
          </div>
          <div className="h-[1px] w-12 bg-outline-variant"></div>
          <div className="flex items-center gap-2 text-on-surface-variant opacity-50">
            <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">3</span>
            <span className="font-label-caps text-xs tracking-wider">REVIEW</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Payment Details */}
          <div className="lg:col-span-8 space-y-8">
            <section className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6">Select Payment Method</h2>
              <div className="space-y-4">
                {/* bKash Option */}
                <div className="border border-outline-variant rounded-lg p-6 hover:border-secondary bg-white transition-all cursor-pointer">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input checked={paymentMethod === 'bkash'} onChange={() => setPaymentMethod('bkash')} className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" value="bkash" type="radio" />
                    <span className="font-bold">bKash</span>
                    <span className="ml-auto material-symbols-outlined text-pink-600">phone_iphone</span>
                  </label>
                </div>

                {/* Nagad Option */}
                <div className="border border-outline-variant rounded-lg p-6 hover:border-secondary bg-white transition-all cursor-pointer">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input checked={paymentMethod === 'nagad'} onChange={() => setPaymentMethod('nagad')} className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" value="nagad" type="radio" />
                    <span className="font-bold">Nagad</span>
                    <span className="ml-auto material-symbols-outlined text-orange-500">phone_iphone</span>
                  </label>
                </div>

                {/* Cash on Delivery Option */}
                <div className="border border-outline-variant rounded-lg p-6 hover:border-secondary bg-white transition-all cursor-pointer">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" type="radio" />
                    <div className="flex-grow">
                      <span className="font-bold">Cash on Delivery</span>
                      <p className="text-sm text-on-surface-variant mt-1">Pay with cash upon delivery.</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">local_shipping</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox" />
                  <div>
                    <span className="font-bold">Billing address is same as shipping</span>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {shippingFormData?.address || "No shipping address provided"}
                    </p>
                  </div>
                </label>
              </div>
            </section>

            <div className="flex items-center justify-between text-on-surface-variant px-2">
              <button onClick={() => navigate('/checkout/shipping', { state: location.state })} className="flex items-center gap-2 hover:text-primary font-bold transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Return to Shipping</span>
              </button>
              <p className="flex items-center gap-2 text-sm">
                <span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
                Secure 256-bit SSL Encrypted Payment
              </p>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <OrderSummary product={product} quantity={quantity} displayImage={displayImage} paymentMethod={paymentMethod}>
            <button onClick={() => navigate('/checkout/confirmation', { state: { ...location.state, paymentMethod } })} className="w-full bg-secondary-container text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 group">
              Confirm Order
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">check_circle</span>
            </button>
          </OrderSummary>
        </div>
      </div>
    </MainLayout>
  );
}
