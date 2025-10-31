export const saveUser = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  if (userData.token) {
    localStorage.setItem('token', userData.token);
  }
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeUser = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const isLoggedIn = () => {
  return !!getToken();
};
