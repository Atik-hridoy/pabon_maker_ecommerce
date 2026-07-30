import { apiClient } from './client';
import { storage } from '../utils/localStorage';

/**
 * Registers a new user.
 * 
 * @param {Object} userData 
 * @param {string} userData.email - The user's technical email
 * @param {string} userData.password - The user's password
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
  // Map the payload to match what the Django backend UserSerializer expects
  const payload = {
    full_name: userData.full_name,
    email: userData.email,
    phonenumber: userData.phonenumber,
    password: userData.password,
    re_type_password: userData.re_type_password
  };

  return apiClient('/accounts/register/', {
    method: 'POST',
    body: payload
  });
};

/**
 * Logs in a user.
 * 
 * @param {string} email - The user's email (sent as username)
 * @param {string} password - The user's password
 * @returns {Promise<Object>}
 */
export const login = async (email, password) => {
  return apiClient('/accounts/login/', {
    method: 'POST',
    body: {
      username: email,
      password: password
    }
  });
};

export const getProfile = async () => {
  const token = storage.getToken();
  return apiClient('/accounts/profile/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

/**
 * Retrieves all users for admin dashboard.
 * 
 * @returns {Promise<Object>}
 */
export const getAdminUsers = async () => {
  const token = storage.getToken();
  return apiClient('/accounts/admin/users/', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export const authService = {
  register,
  login,
  getProfile,
  getAdminUsers
};
