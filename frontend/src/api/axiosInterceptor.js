import axios from './axiosInstance';
import { useAuth } from '../auth/useAuth';
import { toast } from 'react-toastify';

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - logout user
          const auth = useAuth();
          auth.logout();
          toast.error('Session expired. Please login again.');
          break;
        case 403:
          // Forbidden
          toast.error('You are not authorized to perform this action');
          break;
        case 404:
          // Not found
          toast.error('Resource not found');
          break;
        case 500:
          // Server error
          toast.error('Server error occurred');
          break;
        default:
          toast.error(error.response.data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // The request was made but no response was received
      toast.error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      toast.error('Request error: ' + error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;