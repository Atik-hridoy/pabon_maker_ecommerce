import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../../../api/checkoutService';
import { authService } from '../../../api/authService';
import { getRecentlyViewed } from '../../../api/activityService';

export default function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, profileRes, recentRes] = await Promise.all([
          getMyOrders(),
          authService.getProfile(),
          getRecentlyViewed()
        ]);
        
        if (Array.isArray(ordersRes)) {
            setOrders(ordersRes);
        } else if (ordersRes.data) {
            setOrders(ordersRes.data);
        } else {
            setOrders(ordersRes); // Depending on your axios setup, it might just be the array
        }

        if (Array.isArray(recentRes)) {
            setRecentItems(recentRes);
        } else if (recentRes.data) {
            setRecentItems(recentRes.data);
        }

        if (profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (e) {
        console.error("Failed to fetch orders data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <>
      {/* Account Overview Row */}
      <section className="mb-6">
        <div className="bg-white p-6 rounded-lg border border-outline-variant shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
          <img alt="User Avatar" className="w-24 h-24 rounded-full border-4 border-surface-container shadow-inner object-cover" src={profile?.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAWRGJEuznHoQRceDQv-_QiKQetTa_KyBGBgQi5sDwyeP0jDcV6y5YhkmPkMiRzfU7JS8t8Kq36qs5K3-cppp36vCMHNhobhEAZJQegc-Bi7YsLpbRjKFBVKx0EbBQq1A64NBn0ut_6j0j-DRNUROpuWPNmNlaplIC4ayctzDFwfEXUalsb2mOCbsTgVKdYIkisrPWF7q8ZXEGmyiNtdUv9ZcRQ0Y5xe06Flpo61B_lumYhPi_wj0I5Mw"} />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-on-surface">{profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email : 'Loading...'}</h2>
            <p className="text-base text-on-surface-variant">{profile?.email || ''}</p>
            <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-primary-container text-white text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">stars</span> PRO MEMBER
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: My Orders */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-lg border border-outline-variant shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">My Recent Orders</h3>
              <select className="text-sm font-medium border-none bg-transparent focus:ring-0 text-secondary cursor-pointer">
                <option>Last 3 months</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Order #</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Order Date</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Status</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Items</th>
                    <th className="text-xs text-on-surface-variant uppercase tracking-wider py-3 px-4 text-left border-b border-outline-variant">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-medium">
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-on-surface-variant">Loading orders...</td>
                    </tr>
                  ) : (!Array.isArray(orders) || orders.length === 0) ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-on-surface-variant">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map(order => (
                      <tr key={order.id} className="hover:bg-surface-container-low transition-colors">
                        <td className="py-3 px-4 border-b border-outline-variant font-bold">#{order.order_number}</td>
                        <td className="py-3 px-4 border-b border-outline-variant">{formatDate(order.created_at)}</td>
                        <td className="py-3 px-4 border-b border-outline-variant">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-bold text-[11px] uppercase
                            ${order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-700' : 
                              order.status === 'PENDING' ? 'bg-orange-500/10 text-orange-700' : 
                              order.status === 'CANCELLED' ? 'bg-error/10 text-error' : 
                              'bg-secondary-container/10 text-secondary'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-600' : 
                              order.status === 'PENDING' ? 'bg-orange-500 animate-pulse' : 
                              order.status === 'CANCELLED' ? 'bg-error' : 
                              'bg-secondary-container'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 border-b border-outline-variant text-on-surface-variant max-w-[200px] truncate">
                          {order.items?.map(i => `${i.product_name} (x${i.quantity})`).join(', ') || 'Unknown Items'}
                        </td>
                        <td className="py-3 px-4 border-b border-outline-variant whitespace-nowrap">
                          <div className="flex gap-3">
                            <button className="text-secondary hover:underline font-bold text-xs tracking-wider">DETAILS</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-outline-variant bg-surface text-center">
              <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors tracking-wider">VIEW ALL PAST ORDERS</button>
            </div>
          </section>
        </div>

        {/* Right: Recently Viewed Items */}
        <div className="space-y-6">
          <section className="bg-white rounded-lg border border-outline-variant shadow-sm flex flex-col h-full">
            <div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">history</span>
              <h3 className="text-xs text-on-surface font-bold uppercase tracking-wider">Recently Viewed Items</h3>
            </div>
            <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[600px]">
              {recentItems.length === 0 ? (
                <div className="text-center text-sm text-on-surface-variant py-8">
                  You haven't viewed any products recently.
                </div>
              ) : (
                recentItems.map(item => (
                  <Link to={`/product/${item.id}`} key={item.id} className="flex gap-4 p-3 border border-outline-variant rounded hover:border-secondary hover:bg-surface transition-all group cursor-pointer">
                    <div className="w-16 h-16 bg-surface-container rounded flex items-center justify-center border border-outline-variant overflow-hidden">
                      {item.cover_image ? (
                        <img src={item.cover_image.image_url} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-outline group-hover:text-secondary">inventory_2</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-on-surface text-sm line-clamp-1">{item.name}</h4>
                      <div className="text-[11px] text-on-surface-variant line-clamp-1">{item.category_name}</div>
                      <div className="mt-1 font-bold text-secondary text-sm">{item.price} CC</div>
                    </div>
                  </Link>
                ))
              )}
              {/* Shop more */}
              <div className="pt-2">
                <Link to="/" className="w-full py-3 border-2 border-dashed border-outline-variant rounded text-on-surface-variant hover:text-secondary hover:border-secondary font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">shopping_cart</span> BROWSE CATALOG
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
