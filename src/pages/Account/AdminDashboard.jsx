import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminDashboard.css';

import OrdersView from './AdminViews/OrdersView';
import InventoryView from './AdminViews/InventoryView';
import UsersView from './AdminViews/UsersView';
import AnalyticsView from './AdminViews/AnalyticsView';
import SettingsView from './AdminViews/SettingsView';
import BillingChargesView from './AdminViews/BillingChargesView';
import AuditLogView from './AdminViews/AuditLogView';
import AddBannerModal from './AdminViews/AddBannerModal';
import { storage } from '../../utils/localStorage';
import { uploadBanners } from '../../api/productService';

export default function AdminDashboard({ onSignOut }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddBanner, setShowAddBanner] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (onSignOut) {
      onSignOut(e);
    } else {
      storage.clearAuth();
      navigate('/');
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsDrawerOpen(false);
  };

  const tabs = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'orders', icon: 'shopping_cart', label: 'Orders' },
    { id: 'inventory', icon: 'inventory_2', label: 'Inventory' },
    { id: 'users', icon: 'group', label: 'Users' },
    { id: 'analytics', icon: 'monitoring', label: 'Analytics' },
    { id: 'billing', icon: 'payments', label: 'Billing & Charges' },
    { id: 'audit', icon: 'history', label: 'Audit Logs' },
  ];

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'orders': return <OrdersView />;
      case 'inventory': return <InventoryView />;
      case 'users': return <UsersView />;
      case 'analytics': return <AnalyticsView />;
      case 'billing': return <BillingChargesView />;
      case 'audit': return <AuditLogView />;
      case 'settings': return <SettingsView />;
      default: return null; // handled separately below
    }
  };

  return (
    <div className="admin-dashboard-wrapper min-h-screen text-on-surface flex flex-col md:flex-row overflow-x-hidden font-body-base">
      
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-[280px] md:w-64 bg-primary-container text-white md:sticky md:top-0 h-screen flex flex-col z-[60] transition-transform duration-300 shrink-0`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center md:block">
          <div>
            <div className="font-display-lg text-[22px] font-black tracking-tighter text-white">
              PABON MAKER
            </div>
            <div className="text-[10px] font-label-caps text-primary-fixed-dim mt-1 uppercase tracking-[0.2em]">Command Center</div>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="md:hidden p-2 rounded hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto min-h-0">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all group ${
                activeTab === tab.id 
                  ? 'bg-secondary-container text-white shadow-sm' 
                  : 'text-on-primary-container hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab !== tab.id ? 'group-hover:text-secondary-fixed-dim' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-label-caps text-label-caps uppercase">{tab.label}</span>
            </button>
          ))}
          
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-1">
            <button 
              onClick={() => handleTabClick('settings')}
              className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all group ${
                activeTab === 'settings' 
                  ? 'bg-secondary-container text-white shadow-sm' 
                  : 'text-on-primary-container hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab !== 'settings' ? 'group-hover:text-secondary-fixed-dim' : ''}`}>
                settings
              </span>
              <span className="font-label-caps text-label-caps uppercase">System Settings</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 p-3 w-full text-left text-error/80 hover:bg-error/10 rounded-lg transition-all">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-caps text-label-caps uppercase">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-outline-variant flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDrawerOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-surface-variant text-on-surface">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant w-64 lg:w-96">
              <span className="material-symbols-outlined text-[18px] text-outline">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-technical-data font-technical-data text-on-surface placeholder:text-outline-variant w-full" 
                placeholder="Global search..." 
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    alert(`Searching for: ${e.target.value}`);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={() => alert('You have no new notifications.')}
              className="relative p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors hidden sm:block"
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full border-2 border-white"></span>
            </button>
            
            {/* Admin Profile */}
            <div className="flex items-center gap-3 border-l border-outline-variant pl-4 md:pl-6 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => handleTabClick('settings')}>
              <div className="text-right hidden md:block">
                <div className="text-body-sm font-bold leading-tight">Admin Terminal</div>
                <div className="text-[10px] text-secondary font-label-caps uppercase">System Root</div>
              </div>
              <img alt="Admin" className="w-10 h-10 rounded-lg border border-outline-variant object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw"/>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-[1280px] mx-auto w-full space-y-6">
          
          {activeTab !== 'dashboard' && renderDashboardContent()}

          {activeTab === 'dashboard' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
              {/* Live Telemetry Header */}
              <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-label-caps font-label-caps text-on-surface-variant uppercase tracking-widest">Live Telemetry</span>
                  </div>
                  <h1 className="font-headline-md text-headline-md text-on-surface">Command Dashboard</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => alert('Exporting dashboard telemetry data to CSV...')}
                    className="px-4 py-2 bg-white border border-outline-variant text-on-surface font-label-caps text-[11px] uppercase rounded hover:bg-surface transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">file_download</span> Export Data
                  </button>
                  <button 
                    onClick={() => setShowAddBanner(true)}
                    className="px-4 py-2 bg-primary-container text-white font-label-caps text-[11px] uppercase rounded hover:opacity-90 transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span> Add Banner
                  </button>
                </div>
              </section>

              {/* KPI Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-lg level-1-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTabClick('analytics')}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">payments</span>
                    </div>
                    <span className="text-green-600 text-technical-data font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span> +12%
                    </span>
                  </div>
                  <div className="text-label-caps font-label-caps text-on-surface-variant uppercase text-[10px]">Total Revenue</div>
                  <div className="text-2xl font-black text-on-surface mt-1">124,500.00 CC</div>
                </div>
                
                <div className="bg-white p-5 rounded-lg level-1-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTabClick('orders')}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">receipt_long</span>
                    </div>
                    <span className="text-secondary-container text-technical-data font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> 14 Pending
                    </span>
                  </div>
                  <div className="text-label-caps font-label-caps text-on-surface-variant uppercase text-[10px]">Active Orders</div>
                  <div className="text-2xl font-black text-on-surface mt-1">42 Active</div>
                </div>
                
                <div className="bg-white p-5 rounded-lg level-1-card border-l-4 border-l-error cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTabClick('inventory')}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-error-container flex items-center justify-center text-error">
                      <span className="material-symbols-outlined">inventory</span>
                    </div>
                    <span className="text-error text-technical-data font-bold">URGENT</span>
                  </div>
                  <div className="text-label-caps font-label-caps text-on-surface-variant uppercase text-[10px]">Low Stock Items</div>
                  <div className="text-2xl font-black text-on-surface mt-1">8 Components</div>
                </div>
                
                <div className="bg-white p-5 rounded-lg level-1-card cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTabClick('users')}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">person_add</span>
                    </div>
                    <span className="text-green-600 text-technical-data font-bold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span> +24
                    </span>
                  </div>
                  <div className="text-label-caps font-label-caps text-on-surface-variant uppercase text-[10px]">New Users Today</div>
                  <div className="text-2xl font-black text-on-surface mt-1">156 Total</div>
                </div>
              </section>

              {/* Main Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Sales Performance Chart */}
                <section className="lg:col-span-2 bg-white rounded-lg level-1-card overflow-hidden flex flex-col">
                  <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
                    <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Sales Performance (7 Days)</h3>
                    <div className="flex gap-2">
                      <button onClick={() => alert('Filtering chart data for 7 Days')} className="text-[10px] font-bold px-2 py-1 rounded bg-surface-container-high text-on-surface">7D</button>
                      <button onClick={() => alert('Filtering chart data for 30 Days')} className="text-[10px] font-bold px-2 py-1 rounded text-on-surface-variant hover:bg-surface-container">30D</button>
                    </div>
                  </div>
                  <div className="p-4 md:p-6 flex-1 min-h-[300px] relative">
                    {/* SVG Line Chart Placeholder */}
                    <svg className="w-full h-full min-h-[250px]" preserveAspectRatio="none" viewBox="0 0 1000 400">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#fe6b00"></stop>
                          <stop offset="100%" stopColor="#fe6b00" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                      
                      {/* Grid Lines */}
                      <g className="chart-grid">
                        <line x1="0" x2="1000" y1="0" y2="0"></line>
                        <line x1="0" x2="1000" y1="100" y2="100"></line>
                        <line x1="0" x2="1000" y1="200" y2="200"></line>
                        <line x1="0" x2="1000" y1="300" y2="300"></line>
                        <line x1="0" x2="1000" y1="400" y2="400"></line>
                      </g>
                      
                      {/* Data Path */}
                      <path className="chart-area" d="M0,350 L150,300 L300,320 L450,150 L600,180 L750,80 L900,120 L1000,100 L1000,400 L0,400 Z"></path>
                      <path className="chart-line" d="M0,350 L150,300 L300,320 L450,150 L600,180 L750,80 L900,120 L1000,100"></path>
                      
                      {/* Data Points */}
                      <circle cx="150" cy="300" fill="white" r="4" stroke="#fe6b00" strokeWidth="2" className="cursor-pointer hover:r-6 hover:fill-secondary transition-all" onClick={() => alert('Data point details: Tue, 12,000 CC')}></circle>
                      <circle cx="450" cy="150" fill="white" r="4" stroke="#fe6b00" strokeWidth="2" className="cursor-pointer hover:r-6 hover:fill-secondary transition-all" onClick={() => alert('Data point details: Thu, 25,000 CC')}></circle>
                      <circle cx="750" cy="80" fill="white" r="4" stroke="#fe6b00" strokeWidth="2" className="cursor-pointer hover:r-6 hover:fill-secondary transition-all" onClick={() => alert('Data point details: Sat, 32,000 CC')}></circle>
                      <circle cx="900" cy="120" fill="white" r="4" stroke="#fe6b00" strokeWidth="2" className="cursor-pointer hover:r-6 hover:fill-secondary transition-all" onClick={() => alert('Data point details: Sun, 28,000 CC')}></circle>
                    </svg>
                    
                    {/* X-Axis Labels */}
                    <div className="flex justify-between mt-4 text-[10px] font-label-caps text-on-surface-variant uppercase">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                  </div>
                </section>
                
                {/* Inventory Alerts Sidebar */}
                <section className="bg-white rounded-lg level-1-card flex flex-col">
                  <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                      <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Inventory Alerts</h3>
                    </div>
                    <button 
                      onClick={() => alert('Automated replenishment orders placed for all low stock items.')}
                      className="text-[10px] font-bold text-secondary-container hover:underline"
                    >
                      REPLENISH ALL
                    </button>
                  </div>
                  <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                    <div className="p-3 border border-error/20 bg-error/5 rounded flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded border border-error/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-error">memory</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-technical-data font-bold truncate">XC-701 Micro-Controller</div>
                        <div className="text-[10px] text-error font-bold uppercase">2 Units Remaining</div>
                      </div>
                      <button 
                        onClick={() => alert('XC-701 Micro-Controller added to replenishment cart.')}
                        className="p-1.5 hover:bg-error/10 rounded transition-colors text-error shrink-0"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </div>
                    
                    <div className="p-3 border border-outline-variant hover:border-secondary-container rounded flex items-center gap-3 transition-colors group">
                      <div className="w-10 h-10 bg-surface-container rounded border border-outline-variant flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-surface-variant">layers</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-technical-data font-bold truncate">Logic Array Layout v1.9</div>
                        <div className="text-[10px] text-secondary font-bold uppercase">5 Units - Low Stock</div>
                      </div>
                      <button 
                        onClick={() => alert('Logic Array Layout v1.9 added to replenishment cart.')}
                        className="p-1.5 hover:bg-secondary-container/10 rounded transition-colors text-secondary-container shrink-0"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </div>
                    
                    <div className="p-3 border border-outline-variant hover:border-secondary-container rounded flex items-center gap-3 transition-colors group">
                      <div className="w-10 h-10 bg-surface-container rounded border border-outline-variant flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-on-surface-variant">developer_board</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-technical-data font-bold truncate">ARM Cortex-M4 Module</div>
                        <div className="text-[10px] text-secondary font-bold uppercase">8 Units - Low Stock</div>
                      </div>
                      <button 
                        onClick={() => alert('ARM Cortex-M4 Module added to replenishment cart.')}
                        className="p-1.5 hover:bg-secondary-container/10 rounded transition-colors text-secondary-container shrink-0"
                      >
                        <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleTabClick('inventory')}
                      className="w-full py-2 border-2 border-dashed border-outline-variant rounded text-on-surface-variant hover:text-secondary hover:border-secondary font-label-caps text-[10px] uppercase transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      View Full Inventory
                    </button>
                  </div>
                </section>
              </div>

              {/* Recent Orders Table */}
              <section className="bg-white rounded-lg level-1-card overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-outline-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <h3 className="text-label-caps font-label-caps text-on-surface font-bold uppercase">Recent Orders</h3>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-[11px] font-label-caps text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span> Processing
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-label-caps text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span> Shipped
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-label-caps text-on-surface-variant">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Delivered
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full high-density-table min-w-[700px]">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-technical-data">
                      <tr className="hover:bg-surface-container-low transition-colors group">
                        <td className="font-bold cursor-pointer hover:text-secondary-container" onClick={() => alert('Opening details for #ORD-28491')}>#ORD-28491</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <img alt="User" className="w-6 h-6 rounded-full border border-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw"/>
                            Aris Pabon
                          </div>
                        </td>
                        <td className="font-bold">450.00 CC</td>
                        <td>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-secondary-container/10 text-secondary-container font-bold text-[10px] uppercase">
                            Shipped
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => alert('Viewing order #ORD-28491')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button onClick={() => alert('Editing order #ORD-28491')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                          </div>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-surface-container-low transition-colors group">
                        <td className="font-bold cursor-pointer hover:text-secondary-container" onClick={() => alert('Opening details for #ORD-28490')}>#ORD-28490</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-container text-white text-[8px] flex items-center justify-center font-bold">JD</div>
                            Jane Doe
                          </div>
                        </td>
                        <td className="font-bold">1,200.00 CC</td>
                        <td>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 font-bold text-[10px] uppercase">
                            Processing
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => alert('Viewing order #ORD-28490')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button onClick={() => alert('Editing order #ORD-28490')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                          </div>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-surface-container-low transition-colors group">
                        <td className="font-bold cursor-pointer hover:text-secondary-container" onClick={() => alert('Opening details for #ORD-28489')}>#ORD-28489</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-surface-container-high text-primary text-[8px] flex items-center justify-center font-bold">MS</div>
                            Mark Smith
                          </div>
                        </td>
                        <td className="font-bold">89.00 CC</td>
                        <td>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-green-600 font-bold text-[10px] uppercase">
                            Delivered
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => alert('Viewing order #ORD-28489')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button onClick={() => alert('Editing order #ORD-28489')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                          </div>
                        </td>
                      </tr>
                      
                      <tr className="hover:bg-surface-container-low transition-colors group">
                        <td className="font-bold cursor-pointer hover:text-secondary-container" onClick={() => alert('Opening details for #ORD-28488')}>#ORD-28488</td>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-container text-white text-[8px] flex items-center justify-center font-bold">EL</div>
                            Elena Lopez
                          </div>
                        </td>
                        <td className="font-bold">2,450.00 CC</td>
                        <td>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/10 text-green-600 font-bold text-[10px] uppercase">
                            Delivered
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-2">
                            <button onClick={() => alert('Viewing order #ORD-28488')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                            <button onClick={() => alert('Editing order #ORD-28488')} className="p-1 hover:bg-surface-container rounded text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t border-outline-variant bg-surface text-center">
                  <button 
                    onClick={() => handleTabClick('orders')}
                    className="text-label-caps font-label-caps text-on-surface-variant hover:text-on-surface transition-colors w-full h-full"
                  >
                    View All Orders History
                  </button>
                </div>
              </section>
            </div>
          )}

        </div>
      </main>

      {showAddBanner && (
        <AddBannerModal 
          onClose={() => setShowAddBanner(false)}
          onSave={async (formData) => {
            try {
              await uploadBanners(formData);
              alert("Banners uploaded successfully!");
              setShowAddBanner(false);
            } catch (err) {
              console.error("Failed to upload banners", err);
              throw err;
            }
          }}
        />
      )}
    </div>
  );
}
