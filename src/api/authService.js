import { apiClient } from './client';

/**
 * Registers a new user.
 * 
 * @param {Object} userData 
 * @param {string} userData.email - The user's technical email
 * @param {string} userData.password - The user's password
 * @returns {Promise<Object>}
 */
export const register = async (userData) => {
  const payload = {
    full_name: userData.full_name,
    email: userData.email,
    phonenumber: userData.phonenumber,
    password: userData.password,
    re_type_password: userData.re_type_password,
    agreed_terms: userData.agreed_terms !== undefined ? userData.agreed_terms : true
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
  return apiClient('/accounts/profile/', {
    method: 'GET'
  });
};

/**
 * Retrieves all users for admin dashboard.
 * 
 * @returns {Promise<Object>}
 */
export const getAdminUsers = async () => {
  return apiClient('/accounts/admin/users/', {
    method: 'GET'
  });
};

export const changePassword = async (current_password, new_password, confirm_password) => {
  return apiClient('/accounts/change-password/', {
    method: 'PUT',
    body: {
      current_password,
      new_password,
      confirm_password
    }
  });
};

export const userDashboardSearch = async (query) => {
  return apiClient(`/accounts/search/?q=${encodeURIComponent(query)}`, {
    method: 'GET'
  });
};

export const authService = {
  register,
  login,
  getProfile,
  getAdminUsers,
  changePassword,
  userDashboardSearch
};
