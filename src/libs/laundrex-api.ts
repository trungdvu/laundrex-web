import { API_BASE, COOKIE_KEY } from '@/constants/constants';
import { ApiResponse } from '@/utils/types';
import axios from 'axios';
import cookie from 'cookie';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function injectAccessToken(token: string) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

async function send(method: Method, path: string, body?: any) {
  try {
    let res: ApiResponse;

    if (typeof window === 'undefined') {
      // fetch on next server. include token via req headers
      res = await axiosInstance({
        method,
        url: endPoint(path),
        data: body,
      });
    } else {
      // fetch on browser. include token into req header
      const accessToken = Cookies.get(COOKIE_KEY.AUTH);

      if (!accessToken) {
        throw new Error('Unauthorized');
      }

      injectAccessToken(accessToken);

      res = await axiosInstance({
        method,
        url: endPoint(path),
        data: body,
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        },
      });
    }

    return res.data;
  } catch (error: any) {
    throw new Error('Internal server error');
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

export function withLaundrexApi(
  getServerSidePropsFunc?: (context: GetServerSidePropsContext) => Promise<any>,
) {
  return async (context: GetServerSidePropsContext) => {
    const accessToken = cookie.parse(context.req.headers.cookie || '')[
      COOKIE_KEY.AUTH
    ];

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    injectAccessToken(accessToken);

    return getServerSidePropsFunc?.(context);
  };
}

export default laundrexApi;
