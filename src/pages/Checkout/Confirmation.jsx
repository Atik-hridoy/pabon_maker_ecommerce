import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import OrderSummary from './OrderSummary';

export default function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, shippingFormData, paymentMethod, appliedVoucher, orderId } = location.state || {};
  
  const orderNumber = orderId || `PB-${Math.floor(Math.random() * 90000) + 10000}`;
  const orderDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 4);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 6);
  const deliveryRange = `${deliveryStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric'})} - ${deliveryEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}`;

  return (
    <MainLayout>
      <div className="pt-8 pb-24 px-4 md:px-8 max-w-container-max mx-auto w-full">
        {/* Success Header Section */}
        <section className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center mb-6 shadow-lg">
            <span className="material-symbols-outlined text-white text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">Order Confirmed</h1>
          <p className="text-on-surface-variant max-w-lg">
            Thank you for choosing Pabon Maker. Your technical components are being allocated for precision inspection and dispatch.
          </p>
        </section>

        {/* Bento Grid Layout for Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="md:col-span-8 space-y-8">
            {/* Order Summary Header Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <span className="text-xs text-on-surface-variant uppercase mb-1 block">Order Number</span>
                  <span className="text-xl font-bold text-primary">{orderNumber}</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant uppercase mb-1 block">Date</span>
                  <span className="font-semibold text-on-surface">{orderDate}</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant uppercase mb-1 block">Est. Delivery</span>
                  <span className="font-semibold text-secondary">{deliveryRange}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm mt-8">
              <h3 className="text-xs text-secondary font-bold uppercase mb-6 tracking-widest">Shipping Destination</h3>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">local_shipping</span>
                <div className="text-sm text-on-surface leading-relaxed">
                  <p className="font-bold text-on-surface mb-1">{shippingFormData?.fullName || "Johnathan Engineer"}</p>
                  <p>{shippingFormData?.address || "8823 Tech Plaza, Suite 402"}</p>
                  {!shippingFormData?.address && (
                    <>
                      <p>Silicon Valley, CA 94043</p>
                      <p>United States</p>
                    </>
                  )}
                  <p className="mt-2 text-on-surface-variant italic">Method: Express Engineering</p>
                </div>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm mt-8">
              <h3 className="text-xs text-secondary font-bold uppercase mb-6 tracking-widest">Payment Verification</h3>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">
                  {paymentMethod === 'cod' ? 'local_shipping' : paymentMethod === 'card' ? 'credit_card' : 'phone_iphone'}
                </span>
                <div className="text-sm text-on-surface">
                  {paymentMethod === 'cod' ? (
                    <>
                      <p className="font-bold text-on-surface mb-1">Cash on Delivery</p>
                      <p>Pay upon receiving the order</p>
                      <p className="text-orange-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">pending_actions</span>
                        Pending Payment
                      </p>
                    </>
                  ) : paymentMethod === 'bkash' ? (
                    <>
                      <p className="font-bold text-on-surface mb-1">bKash Mobile Banking</p>
                      <p>Verified Mobile Transaction</p>
                      <p className="text-green-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Transaction Verified
                      </p>
                    </>
                  ) : paymentMethod === 'nagad' ? (
                    <>
                      <p className="font-bold text-on-surface mb-1">Nagad Mobile Banking</p>
                      <p>Verified Mobile Transaction</p>
                      <p className="text-green-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Transaction Verified
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-on-surface mb-1">Visa Business Platinum</p>
                      <p>Ending in •••• 4922</p>
                      <p className="text-green-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        Transaction Verified
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <OrderSummary 
            cartItems={cartItems} 
            paymentMethod={paymentMethod}
            initialVoucher={appliedVoucher}
            readonly={true}
          >
            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-6">
              <button onClick={() => navigate('/')} className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">home</span>
                Return to Workspace
              </button>
            </div>
          </OrderSummary>
        </div>
      </div>
    </MainLayout>
  );
}
