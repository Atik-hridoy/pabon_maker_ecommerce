import React, { useState, useEffect } from 'react';
import { storage } from '../../../utils/localStorage';

export default function AddressesTab() {
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    address: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const fetchAddress = async () => {
    const token = storage.getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success && data.data && data.data.shipping_address) {
        try {
          const parsed = JSON.parse(data.data.shipping_address);
          if (Array.isArray(parsed)) {
            setAddresses(parsed);
          } else {
            setAddresses([{ id: Date.now(), text: data.data.shipping_address, isDefault: true }]);
          }
        } catch (e) {
          // Fallback if not valid JSON
          setAddresses([{ id: Date.now(), text: data.data.shipping_address, isDefault: true }]);
        }
      } else {
        setAddresses([]);
      }
    } catch (err) {
      console.error("Failed to fetch shipping address", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (addresses.length >= 3) {
      alert("You can only save up to 3 addresses.");
      return;
    }
    setIsSaving(true);
    const token = storage.getToken();
    if (!token) {
      alert("Please login first.");
      setIsSaving(false);
      return;
    }

    const newAddress = {
      id: Date.now(),
      text: formData.address,
      isDefault: addresses.length === 0
    };
    
    const updatedAddresses = [...addresses, newAddress];

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shipping_address: JSON.stringify(updatedAddresses)
        })
      });
      const data = await response.json();
      if (data.success) {
        setShowAddForm(false);
        setFormData({ address: '' });
        fetchAddress(); // Refresh addresses list
      } else {
        if (data.errors && data.errors.code === 'token_not_valid') {
          storage.clearAuth();
          alert("Session expired. Please login first.");
          window.location.reload();
        } else {
          alert("Failed to save address.");
        }
      }
    } catch (err) {
      console.error("Failed to save address", err);
      alert("Network error.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const token = storage.getToken();
    if (!token) return;
    
    const updatedAddresses = addresses.filter(a => a.id !== id);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shipping_address: updatedAddresses.length > 0 ? JSON.stringify(updatedAddresses) : ''
        })
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(updatedAddresses);
      }
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">location_on</span>
            <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Saved Addresses ({addresses.length}/3)</h3>
          </div>
          {addresses.length < 3 && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="text-xs font-bold text-secondary hover:text-secondary-container uppercase tracking-wider flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">{showAddForm ? 'close' : 'add'}</span>
              {showAddForm ? 'Cancel' : 'Add New'}
            </button>
          )}
        </div>

        {showAddForm && addresses.length < 3 && (
          <div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
            <form onSubmit={handleAddAddress} className="space-y-4">
              <h4 className="font-bold text-sm mb-4">Add a new address</h4>
              <div className="flex flex-col gap-4">
                <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full Address (Name, Phone, Street, Area, City, etc.)" className="w-full px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm h-32 resize-none" required></textarea>
              </div>
              <div className="flex justify-end pt-2">
                <button type="submit" disabled={isSaving} className={`px-6 py-2 bg-secondary text-white font-bold text-xs uppercase rounded transition-colors ${isSaving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-secondary-container'}`}>
                  {isSaving ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="text-sm text-outline-variant font-bold">Loading...</div>
          ) : addresses.length === 0 ? (
            <div className="text-sm text-outline-variant font-bold col-span-2">No shipping address found. Please add one.</div>
          ) : addresses.map((address, index) => (
            <div key={address.id || index} className="border border-outline-variant rounded-lg p-5 relative hover:border-secondary transition-colors">
              {address.isDefault && (
                <span className="absolute top-0 right-0 bg-secondary-container text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-bl-lg rounded-tr-lg">Default</span>
              )}
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Address {index + 1}</div>
              <div className="text-sm text-on-surface-variant leading-relaxed mt-2 whitespace-pre-wrap">
                {address.text}
              </div>
              <div className="mt-4 pt-4 border-t border-outline-variant flex gap-4">
                <button onClick={() => handleDelete(address.id)} className="text-xs font-bold text-error hover:text-error-container uppercase tracking-wider">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
