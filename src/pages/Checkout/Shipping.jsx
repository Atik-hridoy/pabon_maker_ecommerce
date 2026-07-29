import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

export default function Shipping() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="pt-8 pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full">
        {/* Checkout Stepper */}
        <div className="mb-12 flex items-center justify-center md:justify-start gap-8 border-b border-outline-variant pb-6">
          <div className="flex items-center gap-2 text-secondary font-bold">
            <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs">1</span>
            <span className="font-label-caps text-xs tracking-wider">SHIPPING</span>
          </div>
          <div className="h-[1px] w-12 bg-outline-variant"></div>
          <div className="flex items-center gap-2 text-on-surface-variant opacity-50">
            <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">2</span>
            <span className="font-label-caps text-xs tracking-wider">PAYMENT</span>
          </div>
          <div className="h-[1px] w-12 bg-outline-variant"></div>
          <div className="flex items-center gap-2 text-on-surface-variant opacity-50">
            <span className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">3</span>
            <span className="font-label-caps text-xs tracking-wider">REVIEW</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Shipping Information Section */}
            <section className="bg-surface-container-low border border-outline-variant rounded p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">local_shipping</span>
                Shipping Information
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Full Legal Name / Organization</label>
                  <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="e.g. Dr. Aris Pabon" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Technical ID / Email</label>
                  <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="aris.pabon@engineering.com" type="email" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Primary Contact Phone</label>
                  <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Engineering Facility Address</label>
                  <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="Street Address, Suite, Lab Number" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">City</label>
                  <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="San Francisco" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-on-surface-variant uppercase tracking-wider">Region</label>
                    <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="CA" type="text" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-on-surface-variant uppercase tracking-wider">Postal Code</label>
                    <input className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="94103" type="text" />
                  </div>
                </div>
              </form>
            </section>

            {/* Shipping Method Section */}
            <section className="bg-surface-container-low border border-outline-variant rounded p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">package_2</span>
                Shipping Method
              </h2>
              <div className="space-y-4">
                {/* Standard Option */}
                <label className="flex items-center justify-between p-4 border border-outline-variant rounded cursor-pointer hover:border-secondary transition-colors group">
                  <div className="flex items-center gap-4">
                    <input defaultChecked className="text-secondary focus:ring-secondary w-4 h-4" name="shipping_method" type="radio" />
                    <div>
                      <p className="font-bold text-on-surface">Standard Ground</p>
                      <p className="text-sm text-on-surface-variant">Estimated delivery: 3-5 business days</p>
                    </div>
                  </div>
                  <span className="font-bold">$12.50</span>
                </label>
                {/* Express Option */}
                <label className="flex items-center justify-between p-4 border-2 border-secondary-container bg-secondary/5 rounded cursor-pointer hover:bg-secondary/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <input className="text-secondary focus:ring-secondary w-4 h-4" name="shipping_method" type="radio" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-on-surface">Express Engineering</p>
                        <span className="bg-secondary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">FASTEST</span>
                      </div>
                      <p className="text-sm text-on-surface-variant">Priority air dispatch: 1-2 business days</p>
                    </div>
                  </div>
                  <span className="font-bold text-secondary">$34.00</span>
                </label>
              </div>
            </section>

            {/* CTA Navigation */}
            <div className="flex justify-between items-center py-6">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Workspace
              </button>
              <button onClick={() => navigate('/checkout/payment')} className="bg-secondary-container text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                Continue to Payment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-outline-variant rounded p-8 shadow-sm sticky top-32">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-outline-variant pb-4">Order Summary</h3>
              {/* Item List */}
              <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2">
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 bg-surface-container rounded border border-outline-variant flex-shrink-0 relative overflow-hidden p-1">
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
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 bg-surface-container rounded border border-outline-variant flex-shrink-0 relative overflow-hidden p-1">
                    <img className="w-full h-full object-contain" alt="Ceramic Cap Pro-Series" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRUb5rf-UAsififHR2BlXlb_29YMcbS2Q_T1_p4NxuyQzKgCGmCL4WYViU0vEK3jfZyRxPufym2pJIHAy0MpRaAIyL4t7hmAfps1vCaGul6QMwlS5daDhRwHObXHq4qCbCCwLI2KtKmdOLS5QHVMjtKCd9cBCjsBdfcShfebiQ_6XocMisEGNN06NE8bKctZTw1xuCMSLwLwk57YT0PVpnLJsEIo-UCsAW364j_ukpBnGEhlhnraMwEg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">Ceramic Cap Pro-Series</p>
                    <p className="text-xs text-on-surface-variant">SKU: 102-CP-PS</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs">Qty: 50</span>
                      <span className="text-xs font-bold">$24.50</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Financial Breakdown */}
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
              {/* Promo Code */}
              <div className="mb-8">
                <div className="flex gap-2">
                  <input className="flex-1 border border-outline-variant rounded p-2 text-sm focus:ring-1 focus:ring-secondary" placeholder="Project Voucher Code" type="text" />
                  <button className="bg-surface-container text-primary px-4 rounded text-xs font-bold hover:bg-surface-variant transition-colors">Apply</button>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 text-on-surface-variant opacity-60">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="text-[11px] font-bold uppercase tracking-tighter">SECURE 256-BIT ENCRYPTION</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
