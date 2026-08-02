import { apiClient } from './client';

/**
 * Fetch billing settings
 */
export const getBillingSettings = async () => {
  return apiClient('/admin/billing-settings/', {
    method: 'GET'
  });
};

/**
 * Update billing settings
 */
export const updateBillingSettings = async (payload) => {
  return apiClient('/admin/billing-settings/', {
    method: 'PUT',
    body: payload
  });
};

/**
 * Fetch audit logs list
 */
export const getAuditLogs = async () => {
  return apiClient('/admin/audit-logs/', {
    method: 'GET'
  });
};

/**
 * Fetch audit log details for a specific log
 */
export const getAuditLogDetails = async (id) => {
  return apiClient(`/admin/audit-logs/${id}/`, {
    method: 'GET'
  });
};

/**
 * Fetch vouchers
 */
export const getVouchers = async () => {
  return apiClient('/admin/vouchers/', {
    method: 'GET'
  });
};

/**
 * Create a new voucher
 */
export const createVoucher = async (payload) => {
  return apiClient('/admin/vouchers/', {
    method: 'POST',
    body: payload
  });
};

/**
 * Toggle voucher status
 */
export const toggleVoucherStatus = async (id) => {
  return apiClient(`/admin/vouchers/${id}/toggle-status/`, {
    method: 'PATCH'
  });
};
