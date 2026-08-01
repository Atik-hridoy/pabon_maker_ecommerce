import { apiClient } from './client';
import { storage } from '../utils/localStorage';

export const getAllOrders = async (statusFilter = 'All', searchQuery = '') => {
  let url = '/orders/admin/orders/?';
  if (statusFilter && statusFilter !== 'All') {
    url += `status=${encodeURIComponent(statusFilter)}&`;
  }
  if (searchQuery) {
    url += `search=${encodeURIComponent(searchQuery)}`;
  }
  
  const token = storage.getToken();
  return apiClient(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const token = storage.getToken();
  return apiClient(`/orders/admin/orders/${orderId}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: { status: newStatus }
  });
};
