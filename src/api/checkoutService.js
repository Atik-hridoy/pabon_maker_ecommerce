import { apiClient } from './client';
import { storage } from '../utils/localStorage';

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
 * Place the final order
 */
export const placeOrder = async (payload) => {
  const token = storage.getToken();
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient('/orders/place/', {
    method: 'POST',
    headers: headers,
    body: payload
  });
};

/**
 * Fetch orders for the logged-in user
 */
export const getMyOrders = async () => {
  const token = storage.getToken();
  return apiClient('/orders/my-orders/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};
