import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

export default function Payment() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="pt-8 pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full">
        {/* Checkout Stepper */}
        <div className="mb-12 flex items-center justify-center md:justify-start gap-8 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 text-secondary font-bold opacity-50 cursor-pointer" onClick={() => navigate('/checkout/shipping')}>
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
                {/* Credit/Debit Option */}
                <div className="border-2 border-secondary-container rounded-lg p-6 bg-white transition-all shadow-sm">
                  <label className="flex items-center gap-3 mb-6 cursor-pointer">
                    <input defaultChecked className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" type="radio" />
                    <div className="flex items-center justify-between w-full">
                      <span className="font-bold">Credit / Debit Card</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-5 border border-outline-variant rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                        <div className="w-8 h-5 border border-outline-variant rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                        <div className="w-8 h-5 border border-outline-variant rounded flex items-center justify-center text-[8px] font-bold">AMEX</div>
                      </div>
                    </div>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-full">
                      <label className="text-xs text-on-surface-variant uppercase block mb-1">CARD NUMBER</label>
                      <div className="relative">
                        <input className="w-full p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="0000 0000 0000 0000" type="text" />
                        <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant">lock</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-on-surface-variant uppercase block mb-1">EXPIRY DATE (MM/YY)</label>
                      <input className="w-full p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="MM / YY" type="text" />
                    </div>
                    <div>
                      <label className="text-xs text-on-surface-variant uppercase block mb-1">CVV / CVC</label>
                      <input className="w-full p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="123" type="text" />
                    </div>
                    <div className="col-span-full">
                      <label className="text-xs text-on-surface-variant uppercase block mb-1">CARDHOLDER NAME</label>
                      <input className="w-full p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all" placeholder="Full name as printed on card" type="text" />
                    </div>
                  </div>
                </div>

                {/* PayPal Option */}
                <div className="border border-outline-variant rounded-lg p-6 hover:border-secondary bg-white transition-all cursor-pointer">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" type="radio" />
                    <span className="font-bold">PayPal</span>
                    <span className="ml-auto material-symbols-outlined text-blue-600">account_balance_wallet</span>
                  </label>
                </div>

                {/* Purchase Order Option */}
                <div className="border border-outline-variant rounded-lg p-6 hover:border-secondary bg-white transition-all cursor-pointer">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input className="w-5 h-5 text-secondary border-outline-variant focus:ring-secondary" name="payment_method" type="radio" />
                    <div className="flex-grow">
                      <span className="font-bold">Purchase Order (PO)</span>
                      <p className="text-sm text-on-surface-variant mt-1">For verified business accounts only. Net 30 terms apply.</p>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant">business</span>
                  </label>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-outline-variant">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 text-secondary rounded border-outline-variant focus:ring-secondary" type="checkbox" />
                  <div>
                    <span className="font-bold">Billing address is same as shipping</span>
                    <p className="text-sm text-on-surface-variant mt-1">123 Engineering Way, Tech City, CA 90210</p>
                  </div>
                </label>
              </div>
            </section>

            <div className="flex items-center justify-between text-on-surface-variant px-2">
              <button onClick={() => navigate('/checkout/shipping')} className="flex items-center gap-2 hover:text-primary font-bold transition-colors">
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
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-outline-variant rounded p-8 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-outline-variant pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 bg-white rounded border border-outline-variant flex-shrink-0 relative overflow-hidden p-1">
                    <img className="w-full h-full object-contain" alt="P-Core X4-G2 Microcontroller" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmvjONEWYW0OK52fZmUOw6IeIKVrYx2MIIlk1m00bRt1JiKnHTcw1StmZmYI5wTpStPNhz8V0Np9TyPa9OQWWxRpPVcTG-AhTiyJ0_C48be58gGtTVx_7d1SwIDvkLedWbkXUt3j_jbGMOHX_uetHfirn72Nk5pqCVZ0Tx46T7Bk1fIU5CRHJ4m2Xezl_-UPXZYK2JFv8rK_ZQgFaLOB5adOsQ1-bXGl6yPj--4XJ5I8f00dHGZN3kfg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">P-Core X4-G2 Microcontroller</p>
                    <p className="text-xs text-on-surface-variant">SKU: 994-PC-X4G2</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs">Qty: 2</span>
                      <span className="text-xs font-bold">$178.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-outline-variant pt-6 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Subtotal</span>
                  <span className="text-on-surface">$202.50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Engineering Tax (8.5%)</span>
                  <span className="text-on-surface">$17.21</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-on-surface-variant">Shipping (Express)</span>
                  <span className="text-on-surface">$34.00</span>
                </div>
                <div className="flex justify-between items-center border-t border-outline-variant pt-3 mt-3">
                  <span className="text-xl font-bold text-primary">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-secondary">$253.71</span>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Currency: USD</p>
                  </div>
                </div>
              </div>

              <button onClick={() => navigate('/checkout/confirmation')} className="w-full bg-secondary-container text-white py-4 rounded-lg font-bold text-lg shadow-lg hover:opacity-90 active:scale-95 transition-all flex justify-center items-center gap-2 group">
                Confirm Order
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">check_circle</span>
              </button>
              
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
