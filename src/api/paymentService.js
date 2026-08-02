import { apiClient } from './client';

export const getPaymentMethods = async () => {
  return apiClient('/accounts/payment-methods/', {
    method: 'GET'
  });
};

export const addPaymentMethod = async (payload) => {
  return apiClient('/accounts/payment-methods/', {
    method: 'POST',
    body: payload
  });
};

export const removePaymentMethod = async (id) => {
  return apiClient(`/accounts/payment-methods/${id}/`, {
    method: 'DELETE'
  });
};

export const setDefaultPaymentMethod = async (id) => {
  return apiClient(`/accounts/payment-methods/${id}/set-default/`, {
    method: 'PATCH'
  });
};
