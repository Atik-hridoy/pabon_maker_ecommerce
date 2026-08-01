import React from 'react';

export default function AdminSidebar({
  siteName = 'PABON MAKER',
  tabs,
  activeTab,
  handleTabClick,
  handleLogout,
  isDrawerOpen,
  setIsDrawerOpen,
  telemetry
}) {
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[55] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Modern Convenient Sleek Glassmorphic Sidebar */}
      <aside className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-64 lg:w-72 purple-sidebar-pill text-white flex flex-col justify-between p-5 z-[60] transition-transform duration-300 shrink-0 shadow-2xl h-auto self-stretch border border-white/20 rounded-[28px]`}>
        
        {/* Top Brand Header */}
        <div>
          <div className="flex items-center justify-between p-3 border-b border-white/15 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-inner shrink-0">
                <span className="material-symbols-outlined text-[24px]">bolt</span>
              </div>
              <div>
                <h1 className="font-black text-base text-white tracking-tight leading-none uppercase">
                  {siteName}
                </h1>
                <span className="text-[10px] font-bold text-orange-300 uppercase tracking-widest block mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
                  Command Terminal
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsDrawerOpen(false)} 
              className="md:hidden p-1.5 text-white/80 hover:bg-white/10 rounded-xl"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Convenient Sidebar Tabs List (Icon + Text Label) */}
          <nav className="flex flex-col gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              
              // Optional badge counts
              let badge = null;
              if (tab.id === 'orders' && telemetry?.pending_orders_count > 0) {
                badge = <span className="px-2 py-0.5 bg-orange-400 text-slate-950 font-black text-[10px] rounded-full">{telemetry.pending_orders_count}</span>;
              }
              if (tab.id === 'inventory' && telemetry?.low_stock_count > 0) {
                badge = <span className="px-2 py-0.5 bg-red-400 text-white font-black text-[10px] rounded-full animate-pulse">{telemetry.low_stock_count}</span>;
              }

              return (
                <button 
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all duration-200 group ${
                    isActive 
                      ? 'bg-white text-[#5846e0] shadow-xl scale-[1.02] border-l-4 border-l-orange-400' 
                      : 'text-white/85 hover:bg-white/10 hover:text-white hover:translate-x-1'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`material-symbols-outlined text-[20px] transition-colors ${isActive ? 'text-[#5846e0]' : 'text-white/70 group-hover:text-white'}`}>
                      {tab.icon}
                    </span>
                    <span className="uppercase tracking-wider font-bold text-xs">{tab.label}</span>
                  </div>
                  {badge}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: System Settings & Admin Root */}
        <div className="pt-4 border-t border-white/15 space-y-2">
          {/* Settings Tab */}
          <button 
            onClick={() => handleTabClick('settings')}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs w-full transition-all ${
              activeTab === 'settings' 
                ? 'bg-white text-[#5846e0] shadow-xl border-l-4 border-l-orange-400' 
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span className="uppercase tracking-wider font-bold text-xs">System Settings</span>
            </div>
          </button>

          {/* Admin Account & Sign Out */}
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 flex items-center justify-between mt-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-white text-[#5846e0] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
                AD
              </div>
              <div className="min-w-0">
                <span className="font-bold text-xs text-white block truncate">Admin Terminal</span>
                <span className="text-[9px] text-orange-300 font-bold uppercase tracking-wider block">Superuser Root</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-colors shrink-0"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
