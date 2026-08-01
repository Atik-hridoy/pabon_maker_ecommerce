import { apiClient } from './client';
import { storage } from '../utils/localStorage';

export const trackProductView = async (productId) => {
  const token = storage.getToken();
  if (!token) return null; // Don't track if not logged in

  return apiClient('/activity/track-view/', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: { product_id: productId }
  });
};

export const getRecentlyViewed = async () => {
  const token = storage.getToken();
  // We can pass empty headers if no token, backend might handle it
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
  return apiClient('/activity/recently-viewed/', {
    method: 'GET',
    headers
  });
};

export const toggleWishlist = async (productId) => {
  const token = storage.getToken();
  return apiClient('/activity/wishlist/toggle/', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: { product_id: productId }
  });
};

export const getWishlist = async () => {
  const token = storage.getToken();
  return apiClient('/activity/wishlist/', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};

export const getRecommendations = async () => {
  const token = storage.getToken();
  if (!token) return []; // Return empty if not logged in
  return apiClient('/activity/recommendations/', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  });
};
