import React, { useState } from 'react';

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    smsAlerts: false,
    twoFactorAuth: false
  });
  
  const [isSaved, setIsSaved] = useState(false);

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">notifications</span>
          <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Communication Preferences</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-outline-variant pb-6">
            <div>
              <h4 className="font-bold text-sm text-on-surface">Order Updates</h4>
              <p className="text-sm text-on-surface-variant mt-1">Receive email notifications when your order status changes.</p>
            </div>
            <button 
              onClick={() => handleToggle('orderUpdates')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.orderUpdates ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.orderUpdates ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-start justify-between border-b border-outline-variant pb-6">
            <div>
              <h4 className="font-bold text-sm text-on-surface">Promotional Emails</h4>
              <p className="text-sm text-on-surface-variant mt-1">Receive offers, discounts, and personalized recommendations.</p>
            </div>
            <button 
              onClick={() => handleToggle('promotions')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.promotions ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.promotions ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-start justify-between border-b border-outline-variant pb-6">
            <div>
              <h4 className="font-bold text-sm text-on-surface">Newsletter</h4>
              <p className="text-sm text-on-surface-variant mt-1">Weekly digest of new hardware and engineering tutorials.</p>
            </div>
            <button 
              onClick={() => handleToggle('newsletter')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.newsletter ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.newsletter ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-start justify-between pb-2">
            <div>
              <h4 className="font-bold text-sm text-on-surface">SMS Alerts</h4>
              <p className="text-sm text-on-surface-variant mt-1">Receive text messages for delivery tracking.</p>
            </div>
            <button 
              onClick={() => handleToggle('smsAlerts')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.smsAlerts ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.smsAlerts ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">security</span>
          <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Security Settings</h3>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-outline-variant pb-6">
            <div>
              <h4 className="font-bold text-sm text-on-surface">Two-Factor Authentication</h4>
              <p className="text-sm text-on-surface-variant mt-1">Add an extra layer of security to your account.</p>
            </div>
            <button 
              onClick={() => handleToggle('twoFactorAuth')}
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.twoFactorAuth ? 'bg-secondary' : 'bg-outline-variant'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${settings.twoFactorAuth ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div>
            <h4 className="font-bold text-sm text-on-surface mb-4">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <input type="password" placeholder="Current Password" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm md:col-span-2" />
              <input type="password" placeholder="New Password" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" />
              <input type="password" placeholder="Confirm New Password" className="px-4 py-2 border border-outline-variant rounded focus:ring-secondary focus:border-secondary text-sm" />
            </div>
            <button className="mt-4 px-6 py-2 bg-surface-container text-on-surface font-bold text-xs uppercase tracking-wider rounded border border-outline-variant hover:bg-surface-variant transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4">
        <button className="text-xs font-bold text-error hover:text-error-container uppercase tracking-wider">
          Delete Account
        </button>
        <div className="flex items-center gap-4">
          {isSaved && (
            <span className="text-green-600 font-bold text-sm flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span> Preferences Saved
            </span>
          )}
          <button 
            onClick={handleSave}
            className="px-6 py-3 bg-secondary-container text-white font-bold text-xs uppercase tracking-wider rounded hover:bg-secondary transition-colors shadow-sm"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
