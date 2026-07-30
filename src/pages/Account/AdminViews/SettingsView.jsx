import React from 'react';

export default function SettingsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">System Settings</h2>
          <p className="text-on-surface-variant text-sm mt-1">Configure global platform preferences and administrative controls.</p>
        </div>
        <button className="px-6 py-2 bg-secondary-container text-white font-bold rounded-lg hover:brightness-110 transition-all shadow-md active:scale-95">
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">store</span> General Information
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">STORE NAME</label>
              <input type="text" defaultValue="Pabon Maker" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all" />
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">SUPPORT EMAIL</label>
              <input type="email" defaultValue="support@pabonmaker.com" className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">STORE DESCRIPTION</label>
            <textarea rows="3" defaultValue="Precision electronics and hardware provider for makers." className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-body-sm transition-all resize-none"></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">public</span> Localization & Currency
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">DEFAULT CURRENCY</label>
              <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all">
                <option>Circuit Credits (CC)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-label-caps text-xs text-on-surface-variant block tracking-wider">TIMEZONE</label>
              <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg bg-surface focus:outline-none focus:ring-2 focus:ring-secondary font-technical-data transition-all">
                <option>UTC (Universal Coordinated Time)</option>
                <option>EST (Eastern Standard Time)</option>
                <option>PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low">
          <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span> Advanced Controls
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg hover:border-secondary transition-colors cursor-pointer">
            <div>
              <div className="font-bold text-on-surface">Maintenance Mode</div>
              <div className="text-xs text-on-surface-variant mt-1">Temporarily disable storefront access for customers. Admins can still log in.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border border-outline-variant rounded-lg hover:border-secondary transition-colors cursor-pointer">
            <div>
              <div className="font-bold text-on-surface">Accept New Registrations</div>
              <div className="text-xs text-on-surface-variant mt-1">Allow new users to sign up via the authentication modal.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
