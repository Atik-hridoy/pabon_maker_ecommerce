import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { authService } from '../../api/authService';
import { storage } from '../../utils/localStorage';
import OrderSummary from './OrderSummary';

export default function Shipping() {
  const navigate = useNavigate();
  const location = useLocation();
  const { product, quantity, displayImage } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: ''
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (storage.isLoggedIn()) {
        try {
          const res = await authService.getProfile();
          if (res.data) {
            const { first_name, last_name, email, phone_number, shipping_address } = res.data;
            let addressText = '';
            if (shipping_address) {
              try {
                const parsed = JSON.parse(shipping_address);
                if (Array.isArray(parsed)) {
                  const def = parsed.find(a => a.isDefault) || parsed[0];
                  if (def) addressText = def.text;
                } else {
                  addressText = shipping_address;
                }
              } catch (e) {
                addressText = shipping_address;
              }
            }
            setFormData(prev => ({
              ...prev,
              fullName: `${first_name || ''} ${last_name || ''}`.trim(),
              email: email || '',
              phone: phone_number || '',
              address: addressText
            }));
          }
        } catch (e) {
          console.error('Failed to load profile', e);
        }
      }
    };
    loadProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = product ? Number(product.price) * quantity : 0;
  const tax = subtotal * 0.085; // 8.5%
  const shipping = 34.00; // hardcoded for now
  const total = subtotal + tax + shipping;

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
                  <input name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="e.g. Dr. Aris Pabon" type="text" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Technical ID / Email</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="aris.pabon@engineering.com" type="email" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Primary Contact Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="+1 (555) 000-0000" type="tel" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs text-on-surface-variant uppercase tracking-wider">Engineering Facility Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-outline-variant rounded p-3 focus:outline-none focus:ring-2 focus:ring-secondary-container transition-all" placeholder="Street Address, Suite, Lab Number" type="text" />
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
                      <p className="font-bold text-on-surface">Standard Delivery</p>
                      <p className="text-sm text-on-surface-variant">Flat delivery charge across Bangladesh</p>
                    </div>
                  </div>
                  <span className="font-bold">৳120.00</span>
                </label>
              </div>
            </section>

            {/* CTA Navigation */}
            <div className="flex justify-between items-center py-6">
              <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-on-surface-variant font-bold hover:text-primary transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
                Return to Workspace
              </button>
              <button onClick={() => navigate('/checkout/payment', { state: { product, quantity, displayImage, shippingFormData: formData } })} className="bg-secondary-container text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
                Continue to Payment
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <OrderSummary product={product} quantity={quantity} displayImage={displayImage} />
        </div>
      </div>
    </MainLayout>
  );
}
