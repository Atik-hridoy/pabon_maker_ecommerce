import React from 'react';

export default function AdminOverviewTab({
  telemetry,
  loadingTelemetry,
  chartData,
  handleTabClick,
  setShowAddBanner
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
      {/* Live Telemetry Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-label-caps font-label-caps text-slate-500 uppercase tracking-widest text-[11px] font-bold">Live Store Telemetry</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">Primary Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => alert('Exporting live telemetry data to CSV...')}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span> Export Data
          </button>
          <button 
            onClick={() => setShowAddBanner(true)}
            className="px-4 py-2 bg-[#5846e0] text-white text-xs font-bold uppercase rounded-xl hover:bg-[#4b3ec4] transition-all flex items-center gap-2 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">add_photo_alternate</span> Add Banner
          </button>
        </div>
      </section>

      {loadingTelemetry && !telemetry && (
        <div className="py-12 text-center text-[#5846e0] font-bold flex items-center justify-center gap-2">
          <span className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>
          <span>Fetching live telemetry data from database...</span>
        </div>
      )}

      {/* Soft Neumorphic / Claymorphic Featured Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Big Purple Main Overview Card */}
        <div className="lg:col-span-2 purple-main-card text-white p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[380px] shadow-2xl">
          {/* Card Header */}
          <div className="flex justify-between items-center z-10">
            <div>
              <h2 className="text-xl font-black tracking-wide uppercase text-white/95">Telemetry Overview</h2>
              <p className="text-xs text-white/70 font-medium mt-0.5">Real-time store metrics & sales velocity</p>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold border border-white/30 text-white shadow-sm">
              Weekly Performance
            </span>
          </div>

          {/* Wave Chart Center */}
          <div className="my-6 relative h-44 w-full z-10">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
              <defs>
                <linearGradient id="purpleChartGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35"></stop>
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#purpleChartGrad)" d={chartData.area}></path>
              <path fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" d={chartData.path}></path>
              {chartData.points.map((pt, idx) => (
                <circle 
                  key={idx} 
                  cx={pt.x} 
                  cy={pt.y} 
                  fill="#5846e0" 
                  r="6" 
                  stroke="#ffffff" 
                  strokeWidth="3.5" 
                  className="cursor-pointer hover:r-8 transition-all" 
                  onClick={() => alert(`${pt.day}: ৳${pt.sales}`)}
                />
              ))}
            </svg>
          </div>

          {/* Card Bottom 3 Stats Pills */}
          <div className="grid grid-cols-3 gap-3 z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-white/70 block">Total Revenue</span>
              <span className="text-lg font-black text-white">৳{telemetry?.total_revenue !== undefined ? telemetry.total_revenue.toLocaleString() : '0'}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-white/70 block">Active Orders</span>
              <span className="text-lg font-black text-white">{telemetry?.active_orders_count || 0} Orders</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl">
              <span className="text-[10px] uppercase font-bold text-white/70 block">Registered Users</span>
              <span className="text-lg font-black text-white">{telemetry?.total_users || 0} Users</span>
            </div>
          </div>
        </div>

        {/* Coral Pink Feature Restock Alert Card */}
        <div className="coral-pink-card text-white p-6 md:p-8 flex flex-col justify-between min-h-[380px] shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
              <span className="material-symbols-outlined text-[26px]">warning</span>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-bold tracking-wider uppercase text-white border border-white/30 animate-pulse">
              ACTION REQUIRED
            </span>
          </div>

          <div className="z-10 my-4">
            <span className="text-xs uppercase font-bold text-white/80 tracking-wider">Inventory Urgent Items</span>
            <div className="text-4xl font-black text-white mt-1">
              {telemetry?.low_stock_count || 0} Items
            </div>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              Components require quick replenishment to prevent store stock-outs.
            </p>
          </div>

          <button 
            onClick={() => handleTabClick('inventory')}
            className="w-full py-3.5 bg-white text-[#ff5252] font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl hover:bg-slate-100 transition-colors z-10 flex items-center justify-center gap-2"
          >
            <span>Manage Restock Catalog</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Bottom 3 Soft White Claymorphic Metric Floating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* Metric Card 1 */}
        <div className="soft-clay-card p-6 relative flex flex-col justify-between cursor-pointer" onClick={() => handleTabClick('analytics')}>
          <div className="w-12 h-12 rounded-2xl icon-top-pill text-white flex items-center justify-center text-xl shadow-lg">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <div className="mt-4">
            <h3 className="font-black text-slate-800 text-base">Weekly Revenue Velocity</h3>
            <p className="text-xs text-slate-500 mt-1">Store growth trajectory</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Target Progress</span>
              <span className="text-xs font-black text-emerald-600">85% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="soft-clay-card p-6 relative flex flex-col justify-between cursor-pointer" onClick={() => handleTabClick('inventory')}>
          <div className="w-12 h-12 rounded-2xl icon-top-pill text-white flex items-center justify-center text-xl shadow-lg">
            <span className="material-symbols-outlined">inventory_2</span>
          </div>
          <div className="mt-4">
            <h3 className="font-black text-slate-800 text-base">Component Supply Level</h3>
            <p className="text-xs text-slate-500 mt-1">Maker Hub components</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Stock Health</span>
              <span className="text-xs font-black text-blue-600">92% Optimal</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-[#635bff] rounded-full w-[92%]"></div>
            </div>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="soft-clay-card p-6 relative flex flex-col justify-between cursor-pointer" onClick={() => handleTabClick('orders')}>
          <div className="w-12 h-12 rounded-2xl icon-top-pill text-white flex items-center justify-center text-xl shadow-lg">
            <span className="material-symbols-outlined">local_shipping</span>
          </div>
          <div className="mt-4">
            <h3 className="font-black text-slate-800 text-base">Courier Fulfillment</h3>
            <p className="text-xs text-slate-500 mt-1">Steadfast & Pathao Shipping</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Delivery Rate</span>
              <span className="text-xs font-black text-purple-600">98% On-time</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-purple-500 rounded-full w-[98%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50/50">
          <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Recent Orders</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Confirmed
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Delivered
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
              {telemetry?.recent_orders && telemetry.recent_orders.length > 0 ? (
                telemetry.recent_orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="font-bold cursor-pointer hover:text-[#5846e0]" onClick={() => handleTabClick('orders')}>
                      #ORD-{ord.id}
                    </td>
                    <td>
                      <div className="flex items-center gap-2 font-bold text-xs">
                        <div className="w-7 h-7 rounded-full bg-[#5846e0] text-white text-[10px] flex items-center justify-center font-black">
                          {ord.customer_name.substring(0, 2).toUpperCase()}
                        </div>
                        <span>{ord.customer_name}</span>
                      </div>
                    </td>
                    <td className="font-bold text-xs">৳{ord.total_amount.toFixed(2)}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                        ord.status === 'PENDING' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                        ord.status === 'CONFIRMED' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                        ord.status === 'DELIVERED' ? 'text-green-700 bg-green-50 border-green-200' :
                        'text-red-700 bg-red-50 border-red-200'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleTabClick('orders')}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-[#5846e0] hover:text-white rounded-lg text-[10px] font-bold transition-all text-slate-700"
                      >
                        View Order
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-xs text-slate-400 font-medium">
                    No recent orders found in database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button 
            onClick={() => handleTabClick('orders')}
            className="text-xs font-bold text-[#5846e0] hover:underline uppercase tracking-wider"
          >
            View All Orders History
          </button>
        </div>
      </section>
    </div>
  );
}
