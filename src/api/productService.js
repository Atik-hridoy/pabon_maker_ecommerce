import { apiClient } from './client';
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

export const createProduct = async (formData) => {
  const token = storage.getToken();
  // We use fetch directly here to allow the browser to set the correct multipart/form-data boundary automatically
  const response = await fetch('http://127.0.0.1:8000/api/products/', {
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
  const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
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
  const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
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

export const getBanners = async () => {
  return apiClient('/products/banners/', {
    method: 'GET'
  });
};

export const uploadBanners = async (formData) => {
  const token = storage.getToken();
  const response = await fetch('http://127.0.0.1:8000/api/products/banners/', {
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
