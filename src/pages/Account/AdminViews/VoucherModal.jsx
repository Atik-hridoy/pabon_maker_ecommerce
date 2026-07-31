import React, { useState } from 'react';

export default function VoucherModal({ onClose, onSave, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    code: '',
    discountType: 'FLAT', // 'FLAT' or 'PERCENTAGE'
    discountValue: '',
    minOrderAmount: '',
    usageLimit: '',
    expiryDate: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md z-10 flex flex-col border border-outline-variant animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-low rounded-t-lg">
          <h3 className="font-bold text-primary flex items-center gap-2 text-lg">
            <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
            {initialData ? 'Update Voucher' : 'Create New Voucher / Promo Code'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-surface-variant rounded text-on-surface-variant transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Voucher Code */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Voucher Code</label>
            <input 
              type="text" 
              name="code"
              placeholder="e.g. EID100"
              className="w-full p-2 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all uppercase font-bold"
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Discount Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" 
                  name="discountType" 
                  value="FLAT" 
                  className="accent-secondary"
                  checked={formData.discountType === 'FLAT'}
                  onChange={handleChange}
                />
                <span className="font-bold">Flat Taka</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input 
                  type="radio" 
                  name="discountType" 
                  value="PERCENTAGE" 
                  className="accent-secondary"
                  checked={formData.discountType === 'PERCENTAGE'}
                  onChange={handleChange}
                />
                <span className="font-bold">Percentage (%)</span>
              </label>
            </div>
          </div>

          {/* Discount Amount & Min Order */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Discount Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="discountValue"
                  placeholder="e.g. 100"
                  className="w-full p-2 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  value={formData.discountValue}
                  onChange={handleChange}
                />
                <span className="absolute right-3 top-2.5 text-on-surface-variant text-sm font-bold">
                  {formData.discountType === 'FLAT' ? '৳' : '%'}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Min Order Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="minOrderAmount"
                  placeholder="e.g. 500"
                  className="w-full p-2 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                  value={formData.minOrderAmount}
                  onChange={handleChange}
                />
                <span className="absolute right-3 top-2.5 text-on-surface-variant text-sm font-bold">৳</span>
              </div>
            </div>
          </div>

          {/* Usage Limit & Expiry */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Usage Limit / User</label>
              <input 
                type="number" 
                name="usageLimit"
                placeholder="e.g. 1"
                className="w-full p-2 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                value={formData.usageLimit}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase mb-2">Expiry Date</label>
              <input 
                type="date" 
                name="expiryDate"
                className="w-full p-2 border border-outline-variant rounded focus:border-secondary focus:ring-1 focus:ring-secondary transition-all text-sm text-on-surface-variant"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between border-t border-outline-variant pt-4 mt-2">
            <span className="block text-xs font-bold text-on-surface-variant uppercase">Status</span>
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  name="isActive"
                  className="sr-only" 
                  checked={formData.isActive} 
                  onChange={handleChange} 
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.isActive ? 'bg-secondary' : 'bg-surface-container-high'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.isActive ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className={`font-bold text-xs uppercase ${formData.isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {formData.isActive ? 'Active (ON)' : 'Inactive'}
              </span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-outline-variant bg-surface-container-low rounded-b-lg">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors rounded hover:bg-surface-variant"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-secondary text-white text-sm font-bold rounded shadow hover:bg-secondary/90 active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[16px]">save</span>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}
