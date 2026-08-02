import { apiClient } from './client';

export const trackProductView = async (productId) => {
  return apiClient('/activity/track-view/', {
    method: 'POST',
    body: { product_id: productId }
  });
};

export const getRecentlyViewed = async () => {
  return apiClient('/activity/recently-viewed/', {
    method: 'GET'
  });
};

export const toggleWishlist = async (productId) => {
  return apiClient('/activity/wishlist/toggle/', {
    method: 'POST',
    body: { product_id: productId }
  });
};

export const getWishlist = async () => {
  return apiClient('/activity/wishlist/', {
    method: 'GET'
  });
};

export const getRecommendations = async () => {
  return apiClient('/activity/recommendations/', {
    method: 'GET'
  });
};
