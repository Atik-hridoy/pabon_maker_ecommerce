import React, { useState, useEffect } from 'react';
import { getStoreConfig, updateStoreConfig } from '../../../api/adminService';
import { toast } from '../../../components/ToastContainer';

export default function SettingsView() {
  const [config, setConfig] = useState({
    site_name: 'PABON MAKER',
    site_tagline: 'Engineering Components & Maker Hub Bangladesh',
    support_phone: '+880 1700-000000',
    support_email: 'support@pabonmaker.com',
    address: 'Dhaka, Bangladesh',
    delivery_inside_dhaka: 60.00,
    delivery_outside_dhaka: 120.00,
    currency_symbol: '৳',
    currency_code: 'BDT',
    timezone: 'Asia/Dhaka',
    country: 'Bangladesh',
    terms_and_conditions: '',
    privacy_policy: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getStoreConfig();
        if (data) {
          setConfig(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error("Failed to load store config", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (field, val) => {
    setConfig(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      const res = await updateStoreConfig(config);
      if (res) {
        setConfig(prev => ({ ...prev, ...res }));
        // Broadcast custom event so Header / Navbar updates store name dynamically!
        window.dispatchEvent(new CustomEvent('store_config_updated', { detail: res }));
        document.title = `${res.site_name || 'PABON MAKER'} - Command Center`;
        toast.success("System settings and website branding updated successfully!", "Settings Saved");
      }
    } catch (err) {
      console.error("Failed to save store settings", err);
      toast.error("Failed to save settings to backend.", "Save Failed");
    } finally {
      setSaving(false);
    }
  };


  if (loading) {
    return (
      <div className="py-12 text-center text-secondary font-bold flex items-center justify-center gap-2">
        <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
        <span>Loading Bangladesh System Settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">System Settings (Bangladesh Region)</h2>
          <p className="text-on-surface-variant text-sm mt-1">Configure site branding, Bangladesh currency (BDT ৳), timezone, and delivery rates.</p>
        </div>
        <button 
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-secondary-container text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">save</span>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* Brand & Identity */}
      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">store</span> Website Identity & Branding
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">WEBSITE NAME (GLOBAL BRANDING)</label>
              <input 
                type="text" 
                value={config.site_name} 
                onChange={(e) => handleChange('site_name', e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-bold text-on-surface transition-all" 
                placeholder="e.g. PABON MAKER"
                required
              />
              <p className="text-[10px] text-on-surface-variant">Changing this updates the website name across Navbar, Footer, and Admin Terminal instantly.</p>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">SUPPORT EMAIL</label>
              <input 
                type="email" 
                value={config.support_email} 
                onChange={(e) => handleChange('support_email', e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all" 
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">SUPPORT PHONE (BANGLADESH)</label>
              <input 
                type="text" 
                value={config.support_phone} 
                onChange={(e) => handleChange('support_phone', e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all" 
                placeholder="+880 1700-000000"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">TAGLINE / SLOGAN</label>
              <input 
                type="text" 
                value={config.site_tagline} 
                onChange={(e) => handleChange('site_tagline', e.target.value)}
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-sm transition-all" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Localization & Bangladesh Currency */}
      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">public</span> Bangladesh Localization & Currency
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">COUNTRY</label>
              <input 
                type="text" 
                value="Bangladesh 🇧🇩" 
                disabled 
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface-container-low font-bold text-on-surface"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">CURRENCY</label>
              <input 
                type="text" 
                value="Bangladeshi Taka (৳ BDT)" 
                disabled 
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface-container-low font-bold text-on-surface"
              />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">TIMEZONE</label>
              <input 
                type="text" 
                value="Asia/Dhaka (GMT+06:00)" 
                disabled 
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface-container-low font-bold text-on-surface"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Legal Policies & Bangladesh Compliance */}
      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">gavel</span> Legal Policies & BD Compliance (Terms & Privacy)
          </h3>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider">
            BD Consumer Rights Ready 🇧🇩
          </span>
        </div>
        <div className="p-6 space-y-6">
          {/* Terms & Conditions */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">
                TERMS & CONDITIONS (BD ECOMMERCE STANDARD)
              </label>
              <span className="text-[11px] text-outline">Orders, Shipping, Courier & Returns Policy</span>
            </div>
            <textarea
              rows={5}
              value={config.terms_and_conditions || ''}
              onChange={(e) => handleChange('terms_and_conditions', e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-sm transition-all leading-relaxed"
              placeholder="Enter Terms & Conditions compliant with Bangladesh Consumer Rights Protection Act..."
            />
            <p className="text-[10px] text-on-surface-variant">Includes Bangladesh 7-day return policy, COD guidelines, and Steadfast/Sundarban courier shipping terms.</p>
          </div>

          {/* Privacy Policy */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider font-bold">
                PRIVACY POLICY (BD DIGITAL SECURITY & MFS COMPLIANT)
              </label>
              <span className="text-[11px] text-outline">bKash / Nagad / Customer Data Protection</span>
            </div>
            <textarea
              rows={5}
              value={config.privacy_policy || ''}
              onChange={(e) => handleChange('privacy_policy', e.target.value)}
              className="w-full px-4 py-3 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-sm transition-all leading-relaxed"
              placeholder="Enter Privacy Policy compliant with Bangladesh Digital Security Standards..."
            />
            <p className="text-[10px] text-on-surface-variant">Protects user phone numbers, shipping addresses, and bKash/Nagad transaction data under BD privacy laws.</p>
          </div>
        </div>
      </div>

    </form>
  );
}


