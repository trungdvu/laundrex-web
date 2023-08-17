import { API_BASE, COOKIE_KEY, HTTP_STATUS } from '@/constants/constants';
import { ApiResponse } from '@/utils/types';
import axios, { AxiosError } from 'axios';
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

async function handleResponseError(error: AxiosError) {
  if (error.response) {
    return error.response.data;
  } else {
    return {
      ok: false,
      statusCode: error.request?.status || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      data: { message: 'unknown message' },
    } as ApiResponse;
  }
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

      if (accessToken) {
        injectAccessToken(accessToken);
      }

      res = await axiosInstance({
        method,
        url: endPoint(path),
        data: body,
      });
    }

    return res.data;
  } catch (error: any) {
    return handleResponseError(error);
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
      injectAccessToken(accessToken);
    }

    return getServerSidePropsFunc?.(context);
  };
}

export default laundrexApi;
