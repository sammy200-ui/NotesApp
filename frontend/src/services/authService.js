import api from './api';
import { saveUser, removeUser } from '../utils/localStorage';

// Register a new user
export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  if (response.data) {
    saveUser(response.data);
  }
  return response.data;
};

// Login user
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  if (response.data) {
    saveUser(response.data);
  }
  return response.data;
};

// Logout user
export const logout = () => {
  removeUser();
};

// Get current user profile
export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
