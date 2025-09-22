
import apiClient from './apiClient';


export const login = (email, password) => {
  return apiClient.post('/admin/login', { email, password });
};



