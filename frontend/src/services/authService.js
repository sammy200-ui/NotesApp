import api from './api';
import { saveUser, removeUser } from '../utils/localStorage';

export const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  saveUser(response.data);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  saveUser(response.data);
  return response.data;
};

export const logout = () => {
  removeUser();
};

export const getProfile = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
