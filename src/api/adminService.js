import { apiClient } from './client';

export const getAllOrders = async (statusFilter = 'All', searchQuery = '') => {
  let url = '/orders/admin/orders/?';
  if (statusFilter && statusFilter !== 'All') {
    url += `status=${encodeURIComponent(statusFilter)}&`;
  }
  if (searchQuery) {
    url += `search=${encodeURIComponent(searchQuery)}`;
  }
  
  return apiClient(url, {
    method: 'GET'
  });
};

export const updateOrderStatus = async (orderId, newStatus) => {
  return apiClient(`/orders/admin/orders/${orderId}/`, {
    method: 'PATCH',
    body: { status: newStatus }
  });
};

export const getStoreAnalytics = async (period = '7d') => {
  return apiClient(`/admin/analytics/?period=${period}`, {
    method: 'GET'
  });
};

export const getDashboardTelemetry = async () => {
  return apiClient('/admin/dashboard-telemetry/', {
    method: 'GET'
  });
};

export const getStoreConfig = async () => {
  return apiClient('/admin/store-config/', {
    method: 'GET'
  });
};

export const updateStoreConfig = async (payload) => {
  return apiClient('/admin/store-config/', {
    method: 'PUT',
    body: payload
  });
};

export const getAdminNotifications = async () => {
  return apiClient('/admin/notifications/', {
    method: 'GET'
  });
};

export const globalAdminSearch = async (query) => {
  return apiClient(`/admin/global-search/?q=${encodeURIComponent(query)}`, {
    method: 'GET'
  });
};
