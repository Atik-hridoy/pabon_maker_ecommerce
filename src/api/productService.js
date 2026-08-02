import { apiClient } from './client';

export const getCategories = async () => {
  return apiClient('/products/categories/', {
    method: 'GET'
  });
};

export const createCategory = async (formData) => {
  return apiClient('/products/categories/', {
    method: 'POST',
    body: formData
  });
};

export const getProducts = async () => {
  return apiClient('/products/', {
    method: 'GET'
  });
};

export const getProduct = async (id) => {
  return apiClient(`/products/${id}/`, {
    method: 'GET'
  });
};

export const getPublicProducts = async (page = 1, categories = null) => {
  let url = `/products/public/?page=${page}`;
  if (categories) {
    if (Array.isArray(categories) && categories.length > 0) {
      categories.forEach(cat => {
        url += `&category=${encodeURIComponent(cat)}`;
      });
    } else if (typeof categories === 'string' && categories.trim()) {
      url += `&category=${encodeURIComponent(categories)}`;
    }
  }
  return apiClient(url, {
    method: 'GET'
  });
};

export const createProduct = async (formData) => {
  return apiClient('/products/', {
    method: 'POST',
    body: formData
  });
};

export const updateProduct = async (id, formData) => {
  return apiClient(`/products/${id}/`, {
    method: 'PATCH',
    body: formData
  });
};

export const deleteProduct = async (id) => {
  return apiClient(`/products/${id}/`, {
    method: 'DELETE'
  });
};

export const updateProductStock = async (id, stock_count) => {
  return apiClient(`/products/${id}/`, {
    method: 'PATCH',
    body: { stock_count }
  });
};


export const getBanners = async () => {
  return apiClient('/products/banners/', {
    method: 'GET'
  });
};

export const uploadBanners = async (formData) => {
  return apiClient('/products/banners/', {
    method: 'POST',
    body: formData
  });
};

export const getProductReviews = async (productId) => {
  return apiClient(`/products/${productId}/reviews/`, {
    method: 'GET'
  });
};

export const submitProductReview = async (productId, payload) => {
  return apiClient(`/products/${productId}/reviews/`, {
    method: 'POST',
    body: payload
  });
};

export const getBestSellers = async (limit = 12) => {
  return apiClient(`/products/best-sellers/?limit=${limit}`, {
    method: 'GET'
  });
};
