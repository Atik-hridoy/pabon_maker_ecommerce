import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import OrdersView from './AdminViews/OrdersView';
import InventoryView from './AdminViews/InventoryView';
import UsersView from './AdminViews/UsersView';
import AnalyticsView from './AdminViews/AnalyticsView';
import SettingsView from './AdminViews/SettingsView';
import BillingChargesView from './AdminViews/BillingChargesView';
import AuditLogView from './AdminViews/AuditLogView';

import AdminSidebar from './AdminComponents/AdminSidebar';
import AdminHeader from './AdminComponents/AdminHeader';
import AdminOverviewTab from './AdminComponents/AdminOverviewTab';
import AddBannerModal from './AdminViews/AddBannerModal';
import ToastContainer, { toast } from '../../components/ToastContainer';
import { storage } from '../../utils/localStorage';
import { uploadBanners } from '../../api/productService';
import { getDashboardTelemetry, getStoreConfig, getAdminNotifications, globalAdminSearch } from '../../api/adminService';

export default function AdminDashboard({ onSignOut }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [telemetry, setTelemetry] = useState(null);
  const [loadingTelemetry, setLoadingTelemetry] = useState(false);
  const [siteName, setSiteName] = useState('PABON MAKER');
  
  // Dynamic Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [backendNotifications, setBackendNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [readNotifIds, setReadNotifIds] = useState([]);
  const notifRef = useRef(null);

  // Global Multi-Entity Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();

  // Close notifications or search popover on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced Global Search backend API call
  useEffect(() => {
    if (!globalSearchQuery.trim()) {
      setSearchResults(null);
      setShowSearchResults(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setShowSearchResults(true);
      try {
        const res = await globalAdminSearch(globalSearchQuery);
        if (res && res.results) {
          setSearchResults(res);
        }
      } catch (err) {
        console.error("Global admin search error", err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [globalSearchQuery]);

  const handleSearchResultClick = (item) => {
    if (item.tab) {
      setActiveTab(item.tab);
    }
    setShowSearchResults(false);
    setGlobalSearchQuery('');
  };

  // High-Performance Parallel Fetcher on Mount
  const fetchAllInitialData = async () => {
    setLoadingTelemetry(true);
    setLoadingNotifications(true);
    try {
      const [telemetryRes, notifRes, configRes] = await Promise.all([
        getDashboardTelemetry(),
        getAdminNotifications(),
        getStoreConfig()
      ]);
      if (telemetryRes) setTelemetry(telemetryRes);
      if (notifRes && notifRes.notifications) setBackendNotifications(notifRes.notifications);
      if (configRes && configRes.site_name) setSiteName(configRes.site_name);
    } catch (err) {
      console.error("Parallel fetch error", err);
    } finally {
      setLoadingTelemetry(false);
      setLoadingNotifications(false);
    }
  };

  const fetchNotifications = async () => {
    setLoadingNotifications(true);
    try {
      const data = await getAdminNotifications();
      if (data && data.notifications) {
        setBackendNotifications(data.notifications);
      }
    } catch (err) {
      console.error("Failed to fetch notifications from API", err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchTelemetry = async () => {
    setLoadingTelemetry(true);
    try {
      const data = await getDashboardTelemetry();
      if (data) {
        setTelemetry(data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard telemetry", err);
    } finally {
      setLoadingTelemetry(false);
    }
  };

  useEffect(() => {
    fetchAllInitialData();

    const handleConfigUpdate = (e) => {
      if (e.detail && e.detail.site_name) setSiteName(e.detail.site_name);
    };
    window.addEventListener('store_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('store_config_updated', handleConfigUpdate);
  }, []);

  const handleLogout = (e) => {
    e?.preventDefault();
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

  useEffect(() => {
    if (activeTab === 'dashboard') {
      fetchTelemetry();
    }
  }, [activeTab]);

  const getNotificationsList = () => {
    if (backendNotifications && backendNotifications.length > 0) {
      return backendNotifications;
    }
    const list = [];
    if (telemetry?.low_stock_count > 0) {
      list.push({
        id: 'low_stock_alert',
        title: 'Low Stock Alert',
        message: `${telemetry.low_stock_count} components are below restock threshold!`,
        time: 'Just now',
        type: 'warning',
        icon: 'warning',
        targetTab: 'inventory'
      });
    }
    if (telemetry?.pending_orders_count > 0) {
      list.push({
        id: 'pending_orders_alert',
        title: 'Pending Orders',
        message: `${telemetry.pending_orders_count} new customer orders awaiting processing.`,
        time: '5 mins ago',
        type: 'info',
        icon: 'shopping_cart',
        targetTab: 'orders'
      });
    }
    return list;
  };

  const notificationsList = getNotificationsList();
  const unreadCount = notificationsList.filter((n) => !readNotifIds.includes(n.id)).length;

  const markAllAsRead = () => {
    setReadNotifIds(notificationsList.map((n) => n.id));
  };

  const handleNotificationClick = (notif) => {
    if (!readNotifIds.includes(notif.id)) {
      setReadNotifIds((prev) => [...prev, notif.id]);
    }
    if (notif.targetTab) {
      setActiveTab(notif.targetTab);
    }
    setShowNotifications(false);
  };

  const tabs = [
    { id: 'dashboard', icon: 'home', label: 'Dashboard' },
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
      default: return null;
    }
  };

  const buildChartPoints = () => {
    if (!telemetry || !telemetry.sales_chart || telemetry.sales_chart.length === 0) {
      return { path: "M0,350 L1000,350", area: "M0,350 L1000,350 L1000,400 L0,400 Z", points: [] };
    }
    const salesValues = telemetry.sales_chart.map(item => item.sales);
    const maxSales = Math.max(...salesValues, 100);
    
    const coords = telemetry.sales_chart.map((item, idx) => {
      const x = (idx / (telemetry.sales_chart.length - 1)) * 1000;
      const y = 350 - ((item.sales / maxSales) * 280);
      return { x, y, sales: item.sales, day: item.day };
    });

    const pathD = coords.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'}${pt.x},${pt.y}`, '');
    const areaD = `${pathD} L1000,400 L0,400 Z`;

    return { path: pathD, area: areaD, points: coords };
  };

  const chartData = buildChartPoints();

  return (
    <div className="admin-dashboard-wrapper min-h-screen dashboard-bg-canvas p-3 sm:p-5 md:p-8 flex items-center justify-center font-sans text-slate-800">
      
      {/* Outer Curved Container Frame */}
      <div className="bg-[#f8fafc] rounded-[36px] shadow-2xl p-4 md:p-6 border border-white/80 w-full max-w-[1560px] flex flex-col md:flex-row gap-6 min-h-[860px] relative overflow-hidden">

        {/* Modular Sidebar */}
        <AdminSidebar 
          siteName={siteName}
          tabs={tabs}
          activeTab={activeTab}
          handleTabClick={handleTabClick}
          handleLogout={handleLogout}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          telemetry={telemetry}
        />

        {/* Main Area */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Modular Header */}
          <AdminHeader 
            siteName={siteName}
            setIsDrawerOpen={setIsDrawerOpen}
            unreadCount={unreadCount}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notificationsList={notificationsList}
            readNotifIds={readNotifIds}
            markAllAsRead={markAllAsRead}
            handleNotificationClick={handleNotificationClick}
            notifRef={notifRef}
            globalSearchQuery={globalSearchQuery}
            setGlobalSearchQuery={setGlobalSearchQuery}
            searchResults={searchResults}
            isSearching={isSearching}
            showSearchResults={showSearchResults}
            setShowSearchResults={setShowSearchResults}
            searchRef={searchRef}
            handleSearchResultClick={handleSearchResultClick}
            handleTabClick={handleTabClick}
          />

          <div className="flex-1 min-w-0 space-y-6">
            {activeTab !== 'dashboard' && renderDashboardContent()}

            {activeTab === 'dashboard' && (
              <AdminOverviewTab 
                telemetry={telemetry}
                loadingTelemetry={loadingTelemetry}
                chartData={chartData}
                handleTabClick={handleTabClick}
                setShowAddBanner={setShowAddBanner}
              />
            )}
          </div>
        </main>
      </div>

      {/* Add Banner Modal */}
      {showAddBanner && (
        <AddBannerModal 
          onClose={() => setShowAddBanner(false)}
          onSave={async (formData) => {
            try {
              await uploadBanners(formData);
              toast.success("New promotional banners uploaded successfully!", "Banners Uploaded");
              setShowAddBanner(false);
            } catch (err) {
              console.error("Failed to upload banners", err);
              toast.error("Failed to upload banners to server.", "Upload Error");
              throw err;
            }
          }}
        />
      )}

      {/* Global Toast / Snackbar Container */}
      <ToastContainer />
    </div>
  );
}
