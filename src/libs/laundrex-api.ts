import { API_BASE } from '@/constants/constants';
import { ApiResponse, ErrorData } from '@/utils/types';
import axios, { AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function send(method: Method, path: string, body?: any) {
  try {
    const res = await axiosInstance({
      method,
      url: endPoint(path),
      data: body,
    });

    return res.data;
  } catch (error: any) {
    throw new Error('internal server error');
  }
}

function endPoint(path: string): string {
  return `${API_BASE}${path}`;
}

const laundrexApi = Object.freeze({
  async get(path: string): Promise<ApiResponse> {
    return send('GET', path);
  },

  async post(path: string, body?: any): Promise<ApiResponse> {
    return send('POST', path, body);
  },

  async put(path: string, body?: any): Promise<ApiResponse> {
    return send('PUT', path, body);
  },

  async delete(path: string): Promise<ApiResponse> {
    return send('DELETE', path);
  },
});

export async function setLaundrexAxiosCookie(cookies: string) {
  axiosInstance.defaults.headers.common.Cookie = cookies;
}

export function withLaundrexApi(
  getServerSidePropsFunc?: (context: GetServerSidePropsContext) => Promise<any>,
) {
  return async (context: GetServerSidePropsContext) => {
    const cookies = context.req.headers.cookie;
    cookies && setLaundrexAxiosCookie(cookies);
    return getServerSidePropsFunc?.(context);
  };
}

export default laundrexApi;
