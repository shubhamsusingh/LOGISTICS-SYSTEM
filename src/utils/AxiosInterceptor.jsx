import axios from 'axios';
import { getToken } from '../services/localStorage';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use((request) => {
  if (!request.url.includes('auth/')) {
    request.headers['Authorization'] = 'Bearer ' + getToken();
  }
  return request;
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const responseUrl =
      error && error.response && error.response.config
        ? error.response.config.url
        : '';
    // Handle unauthorized errors
    console.log(error);
    if (
      error.response &&
      error.response.status === 401 &&
      !responseUrl.includes('auth/login')
    ) {
      localStorage.clear();
      window.location.href = 'http://localhost:5173/auth/login';
    }

    // Handle other errors
    let errorMessage = 'Server Error';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return Promise.reject(errorMessage);
  }
);

export default axiosInstance;
