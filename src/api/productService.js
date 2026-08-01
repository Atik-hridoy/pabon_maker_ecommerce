import { apiClient, API_BASE_URL } from './client';
import { storage } from '../utils/localStorage';

export const getCategories = async () => {
  return apiClient('/products/categories/', {
    method: 'GET'
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
  const token = storage.getToken();
  // We use fetch directly here to allow the browser to set the correct multipart/form-data boundary automatically
  const response = await fetch(`${API_BASE_URL}/products/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
};

export const updateProduct = async (id, formData) => {
  const token = storage.getToken();
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
};

export const deleteProduct = async (id) => {
  const token = storage.getToken();
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.status === 204) {
    return true;
  }
  
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
};

export const updateProductStock = async (id, stock_count) => {
  const token = storage.getToken();
  const response = await fetch(`${API_BASE_URL}/products/${id}/`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ stock_count })
  });

  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
};


export const getBanners = async () => {
  return apiClient('/products/banners/', {
    method: 'GET'
  });
};

export const uploadBanners = async (formData) => {
  const token = storage.getToken();
  const response = await fetch(`${API_BASE_URL}/products/banners/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw { status: response.status, data };
  }
  return data;
};

export const getProductReviews = async (productId) => {
  return apiClient(`/products/${productId}/reviews/`, {
    method: 'GET'
  });
};

export const submitProductReview = async (productId, payload) => {
  const token = storage.getToken();
  return apiClient(`/products/${productId}/reviews/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: payload
  });
};

export const getBestSellers = async (limit = 12) => {
  return apiClient(`/products/best-sellers/?limit=${limit}`, {
    method: 'GET'
  });
};
