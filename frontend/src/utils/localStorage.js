// Save user data and token to localStorage
export const saveUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  if (userData.token) {
    localStorage.setItem('token', userData.token);
  }
};

// Get user data from localStorage
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Remove user data and token from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};
