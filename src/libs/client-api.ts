import { API_BASE } from '@/constants/constants';
import axios from 'axios';

const clientApi = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default clientApi;
