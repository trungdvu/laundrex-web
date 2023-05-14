import axios from 'axios';

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LAUNDREX_API,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default clientAxios;
