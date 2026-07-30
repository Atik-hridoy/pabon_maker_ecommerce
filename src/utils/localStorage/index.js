const KEYS = {
  TOKEN: 'token',
  IS_LOGGED_IN: 'isLoggedIn',
  IS_ADMIN: 'isAdmin'
};

export const storage = {
  // Token methods
  setToken: (token) => localStorage.setItem(KEYS.TOKEN, token),
  getToken: () => localStorage.getItem(KEYS.TOKEN),
  removeToken: () => localStorage.removeItem(KEYS.TOKEN),

  // Auth Status methods
  setLoggedIn: (status) => localStorage.setItem(KEYS.IS_LOGGED_IN, status),
  isLoggedIn: () => localStorage.getItem(KEYS.IS_LOGGED_IN) === 'true',
  
  // Admin Status methods
  setAdmin: (status) => localStorage.setItem(KEYS.IS_ADMIN, status),
  isAdmin: () => localStorage.getItem(KEYS.IS_ADMIN) === 'true',

  // Utility to clear all auth related storage
  clearAuth: () => {
    localStorage.removeItem(KEYS.TOKEN);
    localStorage.removeItem(KEYS.IS_LOGGED_IN);
    localStorage.removeItem(KEYS.IS_ADMIN);
  }
};
