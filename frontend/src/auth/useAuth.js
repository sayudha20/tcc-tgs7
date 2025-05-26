import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';

export const useAuth = () => {
  return useContext(AuthContext);
};