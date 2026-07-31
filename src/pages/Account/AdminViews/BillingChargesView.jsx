import React, { useState } from 'react';

export default function BillingChargesView() {
  const [vatEnabled, setVatEnabled] = useState(true);
  const [vatPercentage, setVatPercentage] = useState(5.0);
  
  const [deliveryCharge, setDeliveryCharge] = useState(120);
  
  const [bkashFee, setBkashFee] = useState(1.5);
  const [nagadFee, setNagadFee] = useState(1.0);
  const [previewMethod, setPreviewMethod] = useState('bkash');

  const sampleOrderTotal = 1000;
  
  // Calculations
  const calculatedVat = vatEnabled ? (sampleOrderTotal * (vatPercentage / 100)) : 0;
  const calculatedDelivery = Number(deliveryCharge);
  
  let selectedFeePct = 0;
  if (previewMethod === 'bkash') selectedFeePct = Number(bkashFee);
  else if (previewMethod === 'nagad') selectedFeePct = Number(nagadFee);
  
  const basePlusVatAndDelivery = sampleOrderTotal + calculatedVat + calculatedDelivery;
  const calculatedGatewayFee = previewMethod !== 'cod' ? basePlusVatAndDelivery * (selectedFeePct / 100) : 0;
  const grandTotal = basePlusVatAndDelivery + calculatedGatewayFee;

  const handleSave = () => {
    alert('Billing & Charges configuration saved successfully!');
  };

  const handleDiscard = () => {
    setVatEnabled(true);
    setVatPercentage(5.0);
    setDeliveryCharge(120);
    setBkashFee(1.5);
    setNagadFee(1.0);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-on-surface">Billing & Charges Settings</h2>
        <p className="text-on-surface-variant text-sm mt-1">Manage global taxes, shipping rates, and gateway convenience fees.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1 - Tax & VAT */}
          <section className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm">
            <h3 className="text-label-caps font-bold text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">receipt_long</span>
              Tax & VAT Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" className="sr-only" checked={vatEnabled} onChange={(e) => setVatEnabled(e.target.checked)} />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${vatEnabled ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${vatEnabled ? 'transform translate-x-4' : ''}`}></div>
                  </div>
                  <span className="font-bold text-sm text-on-surface">Enable Global VAT</span>
                </label>
                <p className="text-xs text-on-surface-variant mt-2 ml-14">Applies a flat percentage tax across all eligible orders.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Global VAT Percentage (%)</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="0"
                  className="w-full p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all disabled:opacity-50 disabled:bg-surface-container"
                  value={vatPercentage}
                  onChange={(e) => setVatPercentage(e.target.value)}
                  disabled={!vatEnabled}
                />
              </div>
            </div>
          </section>

          {/* Section 2 - Delivery Charges */}
          <section className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm">
            <h3 className="text-label-caps font-bold text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">local_shipping</span>
              Delivery Charges
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Flat Delivery Charge (BDT)</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-on-surface-variant font-bold">৳</span>
                  <input 
                    type="number" 
                    min="0"
                    className="w-full pl-8 p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    value={deliveryCharge}
                    onChange={(e) => setDeliveryCharge(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 - Payment Gateway Charges */}
          <section className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm">
            <h3 className="text-label-caps font-bold text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">credit_card</span>
              Payment Gateway Charges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">bKash Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0"
                    className="w-full pr-8 p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    value={bkashFee}
                    onChange={(e) => setBkashFee(e.target.value)}
                  />
                  <span className="absolute right-3 top-3 text-on-surface-variant">%</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Nagad Fee (%)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.1" 
                    min="0"
                    className="w-full pr-8 p-3 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                    value={nagadFee}
                    onChange={(e) => setNagadFee(e.target.value)}
                  />
                  <span className="absolute right-3 top-3 text-on-surface-variant">%</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant mt-4 italic">* Gateway fees are calculated on the total order value (Subtotal + VAT + Shipping).</p>
          </section>

        </div>

        {/* Right Column: Live Preview & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low border border-outline-variant rounded-lg p-6 shadow-sm sticky top-24">
            <h3 className="text-label-caps font-bold text-primary uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-outline-variant pb-4">
              <span className="material-symbols-outlined">calculate</span>
              Live Preview
            </h3>
            
            {/* Preview Controls */}
            <div className="mb-6 space-y-4">
               <div>
                 <label className="text-[10px] font-bold text-on-surface-variant uppercase block mb-1">Simulate Payment</label>
                 <select 
                   className="w-full p-2 text-sm border border-outline-variant rounded focus:ring-1 focus:ring-secondary"
                   value={previewMethod}
                   onChange={(e) => setPreviewMethod(e.target.value)}
                 >
                   <option value="bkash">bKash</option>
                   <option value="nagad">Nagad</option>
                   <option value="cod">Cash on Delivery (0%)</option>
                 </select>
               </div>
            </div>

            {/* Receipt Summary */}
            <div className="bg-white p-4 rounded border border-outline-variant mb-6 space-y-3 font-technical-data text-sm">
              <div className="flex justify-between items-center text-on-surface">
                <span>Sample Cart Value</span>
                <span className="font-bold">৳{sampleOrderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface">
                <span>VAT ({vatEnabled ? vatPercentage : 0}%)</span>
                <span>৳{calculatedVat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-on-surface">
                <span>Delivery Charge</span>
                <span>৳{calculatedDelivery.toFixed(2)}</span>
              </div>
              <div className="border-t border-dashed border-outline-variant pt-3 flex justify-between items-center text-on-surface">
                <span>Gateway Fee ({previewMethod !== 'cod' ? selectedFeePct : 0}%)</span>
                <span>৳{calculatedGatewayFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-outline-variant pt-3 flex justify-between items-center text-primary font-black text-lg">
                <span>Final Total</span>
                <span>৳{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button onClick={handleDiscard} className="w-full sm:w-1/3 py-3 border border-outline-variant text-on-surface font-bold rounded hover:bg-surface-container transition-colors text-sm">
                Discard
              </button>
              <button onClick={handleSave} className="w-full sm:w-2/3 py-3 bg-secondary-container text-white font-bold rounded shadow-md hover:opacity-90 active:scale-95 transition-all text-sm flex justify-center items-center gap-2">
                Save Changes
                <span className="material-symbols-outlined text-[18px]">save</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
