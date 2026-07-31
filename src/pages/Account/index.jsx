import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../api/client';

import OrdersTab from './components/OrdersTab';
import ProfileTab from './components/ProfileTab';
import AddressesTab from './components/AddressesTab';
import PaymentMethodsTab from './components/PaymentMethodsTab';
import WishlistTab from './components/WishlistTab';
import SettingsTab from './components/SettingsTab';
import AdminDashboard from './AdminDashboard';
import { storage } from '../../utils/localStorage';

export default function Account() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (storage.isAdmin()) {
      setIsAdmin(true);
    }
    
    const fetchProfileData = async () => {
      const token = storage.getToken();
      if (!token) return;
      try {
        const response = await fetch(`${API_BASE_URL}/accounts/profile/`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.success && data.data) {
          setProfile(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch topbar profile:", err);
      }
    };
    fetchProfileData();
  }, []);

  const handleSignOut = (e) => {
    if (e) e.preventDefault();
    storage.clearAuth();
    navigate('/');
  };

  if (isAdmin) {
    return <AdminDashboard onSignOut={handleSignOut} />;
  }

  const tabs = [
    { id: 'profile', icon: 'person', label: 'Profile' },
    { id: 'orders', icon: 'receipt_long', label: 'Order History' },
    { id: 'addresses', icon: 'location_on', label: 'Addresses' },
    { id: 'payments', icon: 'payments', label: 'Payment Methods' },
    { id: 'wishlist', icon: 'favorite', label: 'Wishlist' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'orders': return <OrdersTab />;
      case 'addresses': return <AddressesTab />;
      case 'payments': return <PaymentMethodsTab />;
      case 'wishlist': return <WishlistTab />;
      case 'settings': return <SettingsTab />;
      default: return <OrdersTab />;
    }
  };

  const getPageTitle = () => {
    if (activeTab === 'settings') return 'Account Settings';
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.label : 'Account';
  };

  return (
    <div className="min-h-screen text-on-surface flex flex-col md:flex-row bg-[#f6f9ff]">
      
      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside className={`fixed inset-y-0 left-0 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static w-[280px] md:w-64 bg-primary-container text-white md:sticky md:top-0 h-screen flex flex-col z-[60] transition-transform duration-300`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <Link to="/" className="font-display-lg text-[22px] font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
              CIRCUITWORLD
            </Link>
            <div className="text-[10px] font-label-caps text-primary-fixed-dim mt-1 uppercase tracking-[0.2em]">Customer Order Hub</div>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="md:hidden p-2 rounded hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsDrawerOpen(false);
              }}
              className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all group ${
                activeTab === tab.id 
                  ? 'bg-secondary-container text-white shadow-sm' 
                  : 'text-on-primary-container hover:bg-white/5'
              }`}
            >
              <span className={`material-symbols-outlined ${activeTab !== tab.id ? 'group-hover:text-secondary-fixed-dim' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-label-caps text-xs uppercase">{tab.label}</span>
            </button>
          ))}
          
          <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveTab('settings');
                setIsDrawerOpen(false);
              }}
              className={`flex items-center gap-3 p-3 w-full text-left rounded-lg transition-all group ${
                activeTab === 'settings'
                  ? 'bg-secondary-container text-white shadow-sm'
                  : 'text-on-primary-container hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-caps text-xs uppercase">Settings</span>
            </button>
            <button onClick={handleSignOut} className="flex items-center gap-3 p-3 w-full text-left text-error/80 hover:bg-error/10 rounded-lg transition-all cursor-pointer">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-label-caps text-xs uppercase">Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-surface min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-outline-variant flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsDrawerOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg hover:bg-surface-variant text-on-surface">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-xl md:text-2xl font-bold text-on-surface">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-8">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-outline-variant">
              <span className="material-symbols-outlined text-[18px] text-outline">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm font-medium text-on-surface placeholder:text-outline-variant" placeholder="Search..." type="text" />
            </div>
            {/* User Avatar */}
            <div className="flex items-center gap-3 border-l border-outline-variant pl-6">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold leading-tight">
                  {profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email : 'Loading...'}
                </div>
                <div className="text-[10px] text-secondary font-bold uppercase tracking-wider">Pro Tier Member</div>
              </div>
              <img 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border border-outline-variant object-cover" 
                src={profile?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw"} 
              />
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6 max-w-container-max mx-auto w-full space-y-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
