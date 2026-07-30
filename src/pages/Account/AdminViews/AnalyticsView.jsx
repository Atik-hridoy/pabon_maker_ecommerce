import React from 'react';

export default function AnalyticsView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Store Analytics</h2>
          <p className="text-on-surface-variant text-sm mt-1">Deep dive into your store's performance metrics and customer behavior.</p>
        </div>
        <div className="flex gap-2 bg-white rounded border border-outline-variant p-1">
          <button className="px-3 py-1 bg-surface-container-high text-on-surface text-[11px] font-bold uppercase rounded">7 Days</button>
          <button className="px-3 py-1 text-on-surface-variant text-[11px] font-bold uppercase rounded hover:bg-surface-container transition-all">30 Days</button>
          <button className="px-3 py-1 text-on-surface-variant text-[11px] font-bold uppercase rounded hover:bg-surface-container transition-all">12 Months</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg level-1-card">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Conversion Rate</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">3.8%</div>
            <div className="text-green-600 font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 0.4%
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg level-1-card">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Average Order Value</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">184 CC</div>
            <div className="text-green-600 font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span> 12 CC
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg level-1-card">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Total Sessions</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">14.2k</div>
            <div className="text-error font-bold text-sm flex items-center mb-1">
              <span className="material-symbols-outlined text-[16px]">arrow_downward</span> 2.1%
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg level-1-card">
          <div className="text-label-caps font-label-caps text-on-surface-variant uppercase mb-1">Bounce Rate</div>
          <div className="flex items-end gap-3">
            <div className="text-3xl font-black text-on-surface">42.1%</div>
            <div className="text-on-surface-variant font-bold text-sm flex items-center mb-1">
               ~ 0.0%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg level-1-card overflow-hidden flex flex-col min-h-[350px]">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Traffic Sources</h3>
            <button className="text-primary hover:bg-surface-container p-1 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-center gap-6">
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Direct</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Organic Search</span>
                <span>32%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-secondary-container h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Social Media</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Referral</span>
                <span>8%</span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg level-1-card overflow-hidden flex flex-col min-h-[350px]">
          <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Customer Device Breakdown</h3>
            <button className="text-primary hover:bg-surface-container p-1 rounded transition-colors"><span className="material-symbols-outlined text-[18px]">more_vert</span></button>
          </div>
          <div className="p-6 flex-1 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e8eef6" strokeWidth="20" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fe6b00" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="62.8" className="transition-all duration-1000" />
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="213.5" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
              <span className="text-2xl font-black text-on-surface">75%</span>
              <span className="text-[10px] font-label-caps text-on-surface-variant uppercase tracking-widest">Mobile</span>
            </div>
          </div>
          <div className="px-6 pb-6 flex justify-center gap-6 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-secondary-container"></span> Mobile (75%)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span> Desktop (15%)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-surface-container-high border border-outline-variant"></span> Tablet (10%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
