import React, { useState, useEffect } from 'react';
import { getPaymentMethods, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } from '../../../api/paymentService';

export default function PaymentMethodsTab() {
  const [methods, setMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ provider: 'bkash', account_number: '' });

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    setLoading(true);
    try {
      const response = await getPaymentMethods();
      if (Array.isArray(response)) {
        setMethods(response);
      } else if (response.data) {
        setMethods(response.data);
      }
    } catch (e) {
      console.error("Failed to load payment methods", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMethod = async (e) => {
    e.preventDefault();
    try {
      await addPaymentMethod(formData);
      setShowAddForm(false);
      setFormData({ provider: 'bkash', account_number: '' });
      fetchMethods();
    } catch (e) {
      console.error("Failed to add payment method", e);
      alert("Failed to add payment method. Please check the details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removePaymentMethod(id);
      fetchMethods();
    } catch (e) {
      console.error("Failed to delete payment method", e);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultPaymentMethod(id);
      fetchMethods();
    } catch (e) {
      console.error("Failed to set default payment method", e);
    }
  };

  const maskPhoneNumber = (num) => {
    if (!num || num.length < 11) return num;
    return num.substring(0, 3) + " •••• " + num.substring(num.length - 4);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">account_balance_wallet</span>
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Mobile Banking Accounts</h3>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-bold text-secondary hover:text-secondary-container uppercase tracking-wider flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">{showAddForm ? 'close' : 'add'}</span>
            {showAddForm ? 'Cancel' : 'Add New'}
          </button>
        </div>
        
        {showAddForm && (
          <div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
            <form onSubmit={handleAddMethod} className="space-y-4 max-w-md">
              <h4 className="font-bold text-sm mb-4">Add a new account</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Provider</label>
                  <select 
                    value={formData.provider}
                    onChange={(e) => setFormData({...formData, provider: e.target.value})}
                    className="w-full px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm"
                  >
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 01700000000" 
                    value={formData.account_number}
                    onChange={(e) => setFormData({...formData, account_number: e.target.value})}
                    className="w-full px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm font-technical-data tracking-widest" 
                    required 
                    minLength="11"
                    maxLength="11"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2 bg-secondary text-white font-bold text-xs uppercase rounded hover:bg-secondary-container transition-colors">Save Account</button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
             <div className="col-span-full py-8 text-center text-on-surface-variant">Loading payment methods...</div>
          ) : methods.length === 0 ? (
             <div className="col-span-full py-8 text-center text-on-surface-variant border-2 border-dashed border-outline-variant rounded">No payment methods saved yet. Add a bKash or Nagad account to checkout faster.</div>
          ) : (
            methods.map(method => (
              <div key={method.id} className="border border-outline-variant rounded-lg p-5 relative hover:border-secondary transition-colors bg-gradient-to-br from-surface to-surface-container-low">
                {method.is_default && (
                  <span className="absolute top-0 right-0 bg-secondary-container text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg rounded-tr-lg">Default</span>
                )}
                <div className="flex justify-between items-center mb-4">
                  <div className={`font-bold text-lg capitalize ${method.provider === 'bkash' ? 'text-pink-600' : 'text-orange-500'}`}>
                    {method.provider}
                  </div>
                  <span className="material-symbols-outlined text-outline-variant text-[28px]">phone_iphone</span>
                </div>
                <div className="font-technical-data text-on-surface font-bold text-lg tracking-[0.1em] mb-4">
                  {maskPhoneNumber(method.account_number)}
                </div>
                <div className="pt-4 border-t border-outline-variant flex gap-4">
                  {!method.is_default && (
                    <button onClick={() => handleSetDefault(method.id)} className="text-xs font-bold text-on-surface-variant hover:text-secondary uppercase tracking-wider">Set Default</button>
                  )}
                  <button onClick={() => handleDelete(method.id)} className="text-xs font-bold text-error hover:text-error-container uppercase tracking-wider ml-auto">Remove</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
