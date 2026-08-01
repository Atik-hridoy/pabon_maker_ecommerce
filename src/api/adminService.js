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

export const getStoreAnalytics = async (period = '7d') => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient(`/admin/analytics/?period=${period}`, {
    method: 'GET',
    headers
  });
};

export const getDashboardTelemetry = async () => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient('/admin/dashboard-telemetry/', {
    method: 'GET',
    headers
  });
};

export const getStoreConfig = async () => {
  return apiClient('/admin/store-config/', {
    method: 'GET'
  });
};

export const updateStoreConfig = async (payload) => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient('/admin/store-config/', {
    method: 'PUT',
    headers,
    body: payload
  });
};

export const getAdminNotifications = async () => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient('/admin/notifications/', {
    method: 'GET',
    headers
  });
};

export const globalAdminSearch = async (query) => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient(`/admin/global-search/?q=${encodeURIComponent(query)}`, {
    method: 'GET',
    headers
  });
};


