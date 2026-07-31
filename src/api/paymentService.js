import { apiClient } from './client';
import { storage } from '../utils/localStorage';

export const getPaymentMethods = async () => {
  const token = storage.getToken();
  return apiClient('/accounts/payment-methods/', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const addPaymentMethod = async (payload) => {
  const token = storage.getToken();
  return apiClient('/accounts/payment-methods/', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: payload
  });
};

export const removePaymentMethod = async (id) => {
  const token = storage.getToken();
  return apiClient(`/accounts/payment-methods/${id}/`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const setDefaultPaymentMethod = async (id) => {
  const token = storage.getToken();
  return apiClient(`/accounts/payment-methods/${id}/set-default/`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
