// Base configuration for all API calls
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
 * A wrapper around the native fetch API to handle base URLs, headers, and standard error handling.
 */
export const apiClient = async (endpoint, { method = 'GET', body, headers = {}, ...customConfig } = {}) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customConfig,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Attempt to parse JSON regardless of status
    let data;
    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }

    if (!response.ok) {
      // If the backend returned field-specific errors, we throw them
      throw {
        status: response.status,
        data: data || { detail: 'An unexpected error occurred' }
      };
    }

    return data;
  } catch (error) {
    // Network errors or thrown errors from above
    return Promise.reject(error);
  }
};
