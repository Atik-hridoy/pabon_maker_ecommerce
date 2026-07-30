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

export const authService = {
  register
};
