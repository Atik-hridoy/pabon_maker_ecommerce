import React, { useState } from 'react';

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Billing & Shipping',
      name: 'Aris Pabon',
      company: 'Pabon Maker Ltd',
      street: '123 Circuit Way, Suite 400',
      city: 'San Jose',
      state: 'CA',
      zip: '95110',
      country: 'United States',
      isDefault: true
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  const handleAddAddress = (e) => {
    e.preventDefault();
    // In a real app, this would get data from the form
    const newAddress = {
      id: Date.now(),
      type: 'Shipping',
      name: 'Aris Pabon (Lab)',
      company: 'Pabon Maker - Testing Lab',
      street: '456 Innovation Blvd',
      city: 'San Jose',
      state: 'CA',
      zip: '95112',
      country: 'United States',
      isDefault: false
    };
    setAddresses([...addresses, newAddress]);
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Saved Addresses</h3>
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
            <form onSubmit={handleAddAddress} className="space-y-4">
              <h4 className="font-bold text-sm mb-4">Add a new address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required />
                <input type="text" placeholder="Company (Optional)" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" />
                <input type="text" placeholder="Street Address" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm md:col-span-2" required />
                <input type="text" placeholder="City" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required />
                <input type="text" placeholder="State / Province" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required />
                <input type="text" placeholder="ZIP / Postal Code" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required />
                <select className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" required>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2 bg-secondary text-white font-bold text-xs uppercase rounded hover:bg-secondary-container transition-colors">Save Address</button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map(address => (
            <div key={address.id} className="border border-outline-variant rounded-lg p-5 relative hover:border-secondary transition-colors">
              {address.isDefault && (
                <span className="absolute top-0 right-0 bg-secondary-container text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg rounded-tr-lg">Default</span>
              )}
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{address.type}</div>
              <div className="font-bold text-on-surface text-lg">{address.name}</div>
              {address.company && <div className="text-sm font-medium text-on-surface-variant mb-1">{address.company}</div>}
              <div className="text-sm text-on-surface-variant leading-relaxed mt-2">
                {address.street}<br/>
                {address.city}, {address.state} {address.zip}<br/>
                {address.country}
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant flex gap-4">
                <button className="text-xs font-bold text-on-surface-variant hover:text-secondary uppercase tracking-wider">Edit</button>
                {!address.isDefault && (
                  <button onClick={() => handleDelete(address.id)} className="text-xs font-bold text-error hover:text-error-container uppercase tracking-wider">Delete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
