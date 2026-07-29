import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="pt-8 pb-24 px-4 md:px-8 max-w-[1280px] mx-auto">
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
                  <span className="text-xl font-bold text-primary">PB-10293</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant uppercase mb-1 block">Date</span>
                  <span className="font-semibold text-on-surface">October 24, 2024</span>
                </div>
                <div>
                  <span className="text-xs text-on-surface-variant uppercase mb-1 block">Est. Delivery</span>
                  <span className="font-semibold text-secondary">Oct 28 - Oct 30</span>
                </div>
              </div>
            </div>

            {/* Items List Card */}
            <div className="bg-surface-container-low border border-outline-variant rounded-lg shadow-sm overflow-hidden">
              <div className="px-8 py-4 bg-surface-container border-b border-outline-variant flex justify-between items-center">
                <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined">inventory_2</span>
                  Purchased Components
                </h2>
                <span className="text-xs text-on-surface-variant">2 Line Items</span>
              </div>
              <div className="divide-y divide-outline-variant bg-white">
                {/* Item 1 */}
                <div className="p-8 flex gap-8 items-center group">
                  <div className="w-24 h-24 bg-surface-container rounded border border-outline-variant p-2 flex-shrink-0">
                    <img className="w-full h-full object-contain" alt="P-Core X4-G2 Microcontroller" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC-142IK2Ho7hTuZyZyObkV8Sg33VSYRfJOp2Arkom7VJgQEBtarMWF2BFEp6RBjU7n0-z3wfsFSO91QSEeXEYCtiIyTmXou1GsnenfD0JWP2-QDRxlFS-YLm-RjjnhbNI_4OOutEl9hp2BPvdQvI20D3Xsk6J_w8J6A1OBUL8hGjF8tsHVvZinMhd7nNNv5fhZURUOEHKzWfNo3eApdbYjs0LRUSc7OBfTVabtlch7SurdKWB-42NKg" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-on-surface mb-1">P-Core X4-G2 Microcontroller</h3>
                      <span className="font-bold text-on-surface">$179.98</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2">SKU: MCU-G2-4992 | 3.2GHz Quad-Core</p>
                    <div className="inline-flex items-center px-2 py-1 bg-surface-container-low rounded text-xs font-bold text-on-surface">
                      QTY: 2
                    </div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="p-8 flex gap-8 items-center">
                  <div className="w-24 h-24 bg-surface-container rounded border border-outline-variant p-2 flex-shrink-0">
                    <img className="w-full h-full object-contain" alt="Ceramic Cap Pro-Series" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdTLQFm0ZIvRMGjjgWIsK8PBh0f9FiFnbeZyBfHP7mlEA4PvypHKh2ag1DzZWteN9W3ghibzqVcMWZREMTVt-HNi3gT7zbT2yYG5SUEux72P8sybaxemTCcjXjEzfQdPQvfQWnJnLOqsVqL-HRZNKVja4bNZuZ2pXrOrmNtFgCu9bVO1wpHcEYWTMl7h9dty-KkUqjAEYnLXjGtpsUtCDoKt7AqvNlyaVw9BFyP_oVHqCaONsnJoN0-w" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-on-surface mb-1">Ceramic Cap Pro-Series</h3>
                      <span className="font-bold text-on-surface">$24.50</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mb-2">SKU: CAP-CER-10uF | 10µF 50V Low ESR</p>
                    <div className="inline-flex items-center px-2 py-1 bg-surface-container-low rounded text-xs font-bold text-on-surface">
                      QTY: 10
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-surface-container-low flex justify-between items-center border-t border-outline-variant">
                <span className="font-semibold text-on-surface-variant">Order Total</span>
                <span className="text-2xl font-bold text-primary">$204.48</span>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="md:col-span-4 space-y-8">
            {/* Shipping Address Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm">
              <h3 className="text-xs text-secondary font-bold uppercase mb-6 tracking-widest">Shipping Destination</h3>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">local_shipping</span>
                <div className="text-sm text-on-surface leading-relaxed">
                  <p className="font-bold text-on-surface mb-1">Johnathan Engineer</p>
                  <p>8823 Tech Plaza, Suite 402</p>
                  <p>Silicon Valley, CA 94043</p>
                  <p>United States</p>
                  <p className="mt-2 text-on-surface-variant italic">Method: FedEx Priority Oversight</p>
                </div>
              </div>
            </div>

            {/* Payment Details Card */}
            <div className="bg-surface-container-low border border-outline-variant p-8 rounded-lg shadow-sm">
              <h3 className="text-xs text-secondary font-bold uppercase mb-6 tracking-widest">Payment Verification</h3>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-on-surface-variant">credit_card</span>
                <div className="text-sm text-on-surface">
                  <p className="font-bold text-on-surface mb-1">Visa Business Platinum</p>
                  <p>Ending in •••• 4922</p>
                  <p className="text-green-600 font-bold mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Transaction Verified
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button onClick={() => navigate('/')} className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">home</span>
                Return to Workspace
              </button>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
