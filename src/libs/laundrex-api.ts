import { API_BASE } from '@/constants/constants';
import { ApiResponse } from '@/utils/types';

type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';

async function send(
  method: Method,
  path: string,
  body?: any,
  headerOptions?: any,
) {
  return fetch(endPoint(path), {
    method,
    body: JSON.stringify(body),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headerOptions,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error('Fetch error');
    });
}

function endPoint(path: string): string {
  return `${API_BASE}${path}`;
}

const laundrexApi = Object.freeze({
  async get(path: string, headerOptions: any): Promise<ApiResponse> {
    return send('GET', path, undefined, headerOptions);
  },

  async post(path: string, body?: any): Promise<ApiResponse> {
    return send('POST', path, body, {});
  },

  async put(path: string, body?: any): Promise<ApiResponse> {
    return send('PUT', path, body, {});
  },

  async delete(path: string): Promise<ApiResponse> {
    return send('PUT', path, undefined, {});
  },
});

export default laundrexApi;
