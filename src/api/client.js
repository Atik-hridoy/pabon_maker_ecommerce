import { storage } from '../utils/localStorage';

export const BASE_URL = 'https://pobon-meker-backend.onrender.com';
export const API_BASE_URL = `${BASE_URL}/api`;

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.includes('res.cloudinary.com') || path.startsWith('//')) {
    return path;
  }
  return `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

/**
 * A wrapper around the native fetch API to handle base URLs, headers, token injection, and standard error handling.
 */
export const apiClient = async (endpoint, { method = 'GET', body, headers = {}, ...customConfig } = {}) => {
  const token = storage.getToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Auto-inject token if available
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    // Handle FormData for file uploads automatically
    if (body instanceof FormData) {
      delete config.headers['Content-Type']; // Let browser set boundary
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Global 401 Unauthorized Handling
    if (response.status === 401) {
      storage.clearAuth();
      // Optionally emit an event or redirect to login here
    }

    if (response.status === 204) {
      return true; // No content
    }
    
    // Attempt to parse JSON regardless of status
    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }

    if (!response.ok) {
      throw {
        status: response.status,
        data: data || { detail: 'An unexpected error occurred' }
      };
    }

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
