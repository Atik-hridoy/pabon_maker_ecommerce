import React, { useState } from 'react';

export default function PaymentMethodsTab() {
  const [methods, setMethods] = useState([
    {
      id: 1,
      type: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'MasterCard',
      last4: '8888',
      expiry: '08/24',
      isDefault: false
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMethod = (e) => {
    e.preventDefault();
    const newMethod = {
      id: Date.now(),
      type: 'American Express',
      last4: '1234',
      expiry: '10/26',
      isDefault: false
    };
    setMethods([...methods, newMethod]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setMethods(methods.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">payments</span>
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Saved Payment Methods</h3>
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
            <form onSubmit={handleAddMethod} className="space-y-4">
              <h4 className="font-bold text-sm mb-4">Add a new payment method</h4>
              <div className="space-y-4">
                <input type="text" placeholder="Name on Card" className="w-full px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required />
                <input type="text" placeholder="Card Number" className="w-full px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm font-technical-data" required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="MM/YY" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm font-technical-data" required />
                  <input type="text" placeholder="CVC" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm font-technical-data" required />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2 bg-secondary text-white font-bold text-xs uppercase rounded hover:bg-secondary-container transition-colors">Save Card</button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map(method => (
            <div key={method.id} className="border border-outline-variant rounded-lg p-5 relative hover:border-secondary transition-colors bg-gradient-to-br from-surface to-surface-container-low">
              {method.isDefault && (
                <span className="absolute top-0 right-0 bg-secondary-container text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg rounded-tr-lg">Default</span>
              )}
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-on-surface text-lg">{method.type}</div>
                <span className="material-symbols-outlined text-outline-variant text-[32px]">credit_card</span>
              </div>
              <div className="font-technical-data text-on-surface-variant text-lg tracking-[0.2em] mb-2">
                •••• •••• •••• {method.last4}
              </div>
              <div className="text-xs text-on-surface-variant">
                Expires {method.expiry}
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant flex gap-4">
                {!method.isDefault && (
                  <button className="text-xs font-bold text-on-surface-variant hover:text-secondary uppercase tracking-wider">Set Default</button>
                )}
                {!method.isDefault && (
                  <button onClick={() => handleDelete(method.id)} className="text-xs font-bold text-error hover:text-error-container uppercase tracking-wider ml-auto">Remove</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
