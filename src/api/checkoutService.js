import { apiClient } from './client';

/**
 * Calculate checkout totals based on cart and payment method
 */
export const calculateCheckout = async (payload) => {
  return apiClient('/checkout/calculate/', {
    method: 'POST',
    body: payload
  });
};

/**
 * Fetch active public vouchers
 */
export const getPublicVouchers = async () => {
  return apiClient('/orders/active-vouchers/', {
    method: 'GET'
  });
};

/**
 * Place the final order
 */
export const placeOrder = async (payload) => {
  return apiClient('/orders/place/', {
    method: 'POST',
    body: payload
  });
};

/**
 * Fetch orders for the logged-in user
 */
export const getMyOrders = async () => {
  return apiClient('/orders/my-orders/', {
    method: 'GET'
  });
};
