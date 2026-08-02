import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus } from '../../../api/adminService';
import { toast } from '../../../components/ToastContainer';

const getStatusColor = (status) => {
  switch(status ? status.toUpperCase() : '') {
    case 'PENDING': return 'orange-500';
    case 'CONFIRMED': return 'blue-500';
    case 'DELIVERED': return 'green-600';
    default: return 'outline';
  }
};

const getInitials = (name) => {
  if (!name) return 'UN';
  const parts = name.split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

export default function OrdersView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [updating, setUpdating] = useState(false);

  // View Details Modal State
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState(null);

  const filters = ['All', 'Pending', 'Confirmed', 'Delivered'];
  const statusOptions = ['PENDING', 'CONFIRMED', 'DELIVERED'];

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await getAllOrders(activeFilter, searchQuery);
      if (res.success && res.data) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch admin orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeFilter, searchQuery]);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status.toUpperCase());
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (order) => {
    setViewOrder(order);
    setIsViewModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    setUpdating(true);
    try {
      const res = await updateOrderStatus(selectedOrder.id, newStatus);
      if (res.success) {
        toast.success(`Order #${selectedOrder.id} status updated to ${newStatus}`, "Order Updated");
        setIsEditModalOpen(false);
        fetchOrders();
      }
    } catch(err) {
      console.error("Failed to update status", err);
      toast.error("Failed to update order status.", "Update Failed");
    } finally {
      setUpdating(false);
    }
  };


  const handleCancelClick = async (orderId) => {
    if(window.confirm("Are you sure you want to cancel this order?")) {
      try {
        const res = await updateOrderStatus(orderId, 'CANCELLED');
        if (res.success) {
          fetchOrders();
        }
      } catch(err) {
        console.error("Failed to cancel", err);
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
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
            <input 
              className="bg-transparent border-none focus:ring-0 text-xs font-medium text-on-surface w-full placeholder:text-outline-variant p-0" 
              placeholder="Search orders..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter') fetchOrders() }}
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
            </div>
          ) : (
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
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="font-bold cursor-pointer hover:text-secondary-container">{order.order_number}</td>
                    <td className="text-on-surface-variant">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-surface-container-high text-primary text-[8px] flex items-center justify-center font-bold">
                          {getInitials(order.full_name)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-sm">{order.full_name}</span>
                          <span className="text-[10px] text-on-surface-variant">{order.phone}</span>
                          {order.address && (
                            <span className="text-[10px] text-on-surface-variant truncate max-w-[150px]" title={order.address}>
                              {order.address}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="font-bold">৳{parseFloat(order.grand_total).toFixed(2)}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border bg-white`} style={{ color: `var(--color-${getStatusColor(order.status)})`, borderColor: 'currentColor' }}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleViewDetails(order)} className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="View Details">
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button onClick={() => handleEditClick(order)} className="p-1.5 hover:bg-surface-container rounded text-primary transition-colors tooltip-trigger" title="Edit Status">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        {order.status.toUpperCase() !== 'CANCELLED' && (
                          <button onClick={() => handleCancelClick(order.id)} className="p-1.5 hover:bg-error/10 rounded text-error transition-colors tooltip-trigger" title="Cancel Order">
                            <span className="material-symbols-outlined text-[18px]">cancel</span>
                          </button>
                        )}
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
          )}
        </div>
        
        <div className="p-4 border-t border-outline-variant bg-surface flex justify-between items-center text-xs text-on-surface-variant font-bold">
          <div>Showing {orders.length} orders</div>
          <div className="flex gap-1">
            <button className="p-1 border border-outline-variant rounded hover:bg-white disabled:opacity-50" disabled><span className="material-symbols-outlined text-[16px]">chevron_left</span></button>
            <button className="p-1 border border-outline-variant rounded hover:bg-white bg-secondary-container text-white">1</button>
            <button className="p-1 border border-outline-variant rounded hover:bg-white disabled:opacity-50" disabled><span className="material-symbols-outlined text-[16px]">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Edit Status Modal */}
      {isEditModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm shadow-xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-bold text-on-surface">Update Status - {selectedOrder.order_number}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-on-surface-variant hover:text-error">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6">
              <label className="block text-xs font-bold text-on-surface-variant mb-2">New Status</label>
              <select 
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border-outline-variant rounded text-sm p-2 focus:ring-secondary focus:border-secondary"
              >
                {statusOptions.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="p-4 bg-surface-container-lowest border-t border-outline-variant flex justify-end gap-2">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-sm font-bold text-on-surface-variant hover:bg-surface-container rounded transition-colors">
                Cancel
              </button>
              <button 
                onClick={handleUpdateStatus}
                disabled={updating}
                className="px-4 py-2 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded transition-colors disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isViewModalOpen && viewOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
              <h3 className="font-bold text-on-surface">Order Details - {viewOrder.order_number}</h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-sm mb-3 border-b border-outline-variant pb-2 text-on-surface">Customer Information</h4>
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p><span className="font-semibold text-on-surface">Name:</span> {viewOrder.full_name}</p>
                    <p><span className="font-semibold text-on-surface">Email:</span> {viewOrder.email || 'N/A'}</p>
                    <p><span className="font-semibold text-on-surface">Phone:</span> {viewOrder.phone}</p>
                    <p className="flex flex-col"><span className="font-semibold text-on-surface mb-1">Address:</span> <span className="bg-surface-container-low p-2 rounded">{viewOrder.address}</span></p>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-3 border-b border-outline-variant pb-2 text-on-surface">Order Summary</h4>
                  <div className="space-y-2 text-sm text-on-surface-variant">
                    <p><span className="font-semibold text-on-surface">Date:</span> {new Date(viewOrder.created_at).toLocaleString()}</p>
                    <p><span className="font-semibold text-on-surface">Payment Method:</span> {viewOrder.payment_method}</p>
                    <p className="flex items-center gap-2"><span className="font-semibold text-on-surface">Status:</span> 
                      <span className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-[10px] uppercase border bg-white`} style={{ color: `var(--color-${getStatusColor(viewOrder.status)})`, borderColor: 'currentColor' }}>
                        {viewOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-bold text-sm mb-3 border-b border-outline-variant pb-2 text-on-surface">Order Items</h4>
                <div className="bg-surface-container-lowest rounded border border-outline-variant overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-surface-container-low text-xs text-on-surface-variant uppercase">
                      <tr>
                        <th className="px-4 py-3">Product</th>
                        <th className="px-4 py-3 text-center">Qty</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                      {viewOrder.items && viewOrder.items.length > 0 ? (
                        viewOrder.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-surface/50">
                            <td className="px-4 py-3 font-medium text-on-surface">{item.product_name}</td>
                            <td className="px-4 py-3 text-center">{item.quantity}</td>
                            <td className="px-4 py-3 text-right">৳{parseFloat(item.price).toFixed(2)}</td>
                            <td className="px-4 py-3 text-right font-bold text-on-surface">৳{(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-4 py-6 text-center text-on-surface-variant">No items found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <div className="w-full md:w-1/2 space-y-2 text-sm bg-surface-container-lowest p-4 rounded border border-outline-variant">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>৳{parseFloat(viewOrder.subtotal).toFixed(2)}</span>
                  </div>
                  {parseFloat(viewOrder.discount_amount) > 0 && (
                    <div className="flex justify-between text-secondary font-medium">
                      <span>Discount {viewOrder.applied_voucher ? `(${viewOrder.applied_voucher})` : ''}</span>
                      <span>-৳{parseFloat(viewOrder.discount_amount).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Delivery Charge</span>
                    <span>৳{parseFloat(viewOrder.delivery_charge).toFixed(2)}</span>
                  </div>
                  {parseFloat(viewOrder.vat_amount) > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>VAT</span>
                      <span>৳{parseFloat(viewOrder.vat_amount).toFixed(2)}</span>
                    </div>
                  )}
                  {parseFloat(viewOrder.gateway_fee) > 0 && (
                    <div className="flex justify-between text-on-surface-variant">
                      <span>Gateway Fee</span>
                      <span>৳{parseFloat(viewOrder.gateway_fee).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-black text-lg border-t border-outline-variant pt-3 text-on-surface mt-3">
                    <span>Grand Total</span>
                    <span className="text-primary">৳{parseFloat(viewOrder.grand_total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-surface-container-lowest border-t border-outline-variant flex justify-end">
              <button onClick={() => setIsViewModalOpen(false)} className="px-6 py-2 text-sm font-bold bg-primary text-white hover:bg-primary/90 rounded transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
