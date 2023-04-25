import { API_BASE } from '@/constants/constant';

type Options = {
  url: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELTE';
  data?: any;
  apiBase?: string;
};

export async function fetcher({ url, method, data }: Options) {
  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.status > 399 && res.status < 200) {
    throw new Error('Fetcher error');
  }

  return res.json();
}
