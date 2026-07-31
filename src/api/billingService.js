import { apiClient } from './client';
import { storage } from '../utils/localStorage';

/**
 * Fetch billing settings
 */
export const getBillingSettings = async () => {
  const token = storage.getToken();
  return apiClient('/admin/billing-settings/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

/**
 * Update billing settings
 */
export const updateBillingSettings = async (payload) => {
  const token = storage.getToken();
  return apiClient('/admin/billing-settings/', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: payload
  });
};

/**
 * Fetch audit logs list
 */
export const getAuditLogs = async () => {
  const token = storage.getToken();
  return apiClient('/admin/audit-logs/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

/**
 * Fetch audit log details for a specific log
 */
export const getAuditLogDetails = async (id) => {
  const token = storage.getToken();
  return apiClient(`/admin/audit-logs/${id}/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

/**
 * Fetch vouchers
 */
export const getVouchers = async () => {
  const token = storage.getToken();
  return apiClient('/admin/vouchers/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

/**
 * Create a new voucher
 */
export const createVoucher = async (payload) => {
  const token = storage.getToken();
  return apiClient('/admin/vouchers/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: payload
  });
};

/**
 * Toggle voucher status
 */
export const toggleVoucherStatus = async (id) => {
  const token = storage.getToken();
  return apiClient(`/admin/vouchers/${id}/toggle-status/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
