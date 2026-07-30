import React, { useState } from 'react';

export default function OrdersView() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const orders = [
    { id: '#ORD-28491', customer: 'Aris Pabon', amount: '450.00 CC', date: 'Oct 24, 2026', status: 'Shipped', statusColor: 'secondary-container', initials: 'AP' },
    { id: '#ORD-28490', customer: 'Jane Doe', amount: '1,200.00 CC', date: 'Oct 23, 2026', status: 'Processing', statusColor: 'blue-600', bg: 'blue-500', initials: 'JD' },
    { id: '#ORD-28489', customer: 'Mark Smith', amount: '89.00 CC', date: 'Oct 23, 2026', status: 'Delivered', statusColor: 'green-600', bg: 'green-500', initials: 'MS' },
    { id: '#ORD-28488', customer: 'Elena Lopez', amount: '2,450.00 CC', date: 'Oct 22, 2026', status: 'Delivered', statusColor: 'green-600', bg: 'green-500', initials: 'EL' },
    { id: '#ORD-28487', customer: 'Tom Hardy', amount: '320.00 CC', date: 'Oct 21, 2026', status: 'Pending', statusColor: 'orange-500', bg: 'orange-500', initials: 'TH' },
    { id: '#ORD-28486', customer: 'Sara Connor', amount: '15.00 CC', date: 'Oct 21, 2026', status: 'Cancelled', statusColor: 'error', bg: 'error', initials: 'SC' },
  ];

  const filteredOrders = activeFilter === 'All' ? orders : orders.filter(o => o.status === activeFilter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Order Management</h2>
          <p className="text-on-surface-variant text-sm mt-1">View, update, and manage all customer orders.</p>
        </div>
        <button className="px-4 py-2 bg-primary-container text-white font-label-caps text-[11px] uppercase rounded hover:opacity-90 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">download</span> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-lg level-1-card overflow-hidden">
        <div className="p-4 border-b border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center bg-surface-container-low">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeFilter === filter 
                    ? 'bg-secondary-container text-white' 
                    : 'bg-white border border-outline-variant text-on-surface-variant hover:border-secondary'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md border border-outline-variant w-full md:w-64">
            <span className="material-symbols-outlined text-[18px] text-outline">search</span>
            <input className="bg-transparent border-none focus:ring-0 text-xs font-medium text-on-surface w-full placeholder:text-outline-variant p-0" placeholder="Search orders..." type="text" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full high-density-table min-w-[800px]">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-technical-data">
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="font-bold cursor-pointer hover:text-secondary-container">{order.id}</td>
                  <td className="text-on-surface-variant">{order.date}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-surface-container-high text-primary text-[8px] flex items-center justify-center font-bold">
                        {order.initials}
                      </div>
                      {order.customer}
                    </div>
                  </td>
                  <td className="font-bold">{order.amount}</td>
                  <td>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border bg-white`} style={{ color: `var(--color-${order.statusColor})`, borderColor: 'currentColor' }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="View Details">
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </button>
                      <button className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="Edit Order">
                        <span className="material-symbols-outlined text-[18px]">edit</span>
                      </button>
                      <button className="p-1.5 hover:bg-error/10 rounded text-error transition-colors tooltip-trigger" title="Cancel Order">
                        <span className="material-symbols-outlined text-[18px]">cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[48px] opacity-20 mb-2">inbox</span>
                    <p>No orders found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-outline-variant bg-surface flex justify-between items-center text-xs text-on-surface-variant font-bold">
          <div>Showing {filteredOrders.length} of {orders.length} orders</div>
          <div className="flex gap-1">
            <button className="p-1 border border-outline-variant rounded hover:bg-white disabled:opacity-50" disabled><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
            <button className="p-1 border border-outline-variant rounded hover:bg-white bg-secondary-container text-white">1</button>
            <button className="p-1 border border-outline-variant rounded hover:bg-white">2</button>
            <button className="p-1 border border-outline-variant rounded hover:bg-white"><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
