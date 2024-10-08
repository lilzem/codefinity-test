import { useAuthStore } from '@/store/auth';
import axios, { AxiosInstance } from 'axios';
import { BACKEND_URL } from './config';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { isLoggedIn, logout } = useAuthStore.getState();
    if (error.response.status === 401 || (error.response.status === 403 && isLoggedIn)) {
      console.log('Make logout!');
      logout();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
