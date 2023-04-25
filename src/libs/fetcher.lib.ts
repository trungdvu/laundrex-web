import { API_BASE } from '@/constants/constant';

type GetOptions = {
  method: 'GET';
  data?: undefined;
};

type OtherOptions = {
  method: 'POST' | 'PATCH' | 'DELTE';
  data?: any;
};

type Options = GetOptions | OtherOptions;

export async function fetcher(path: string, { method, data }: Options) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: method !== 'GET' ? JSON.stringify(data) : undefined,
  });

  if (res.status > 399 && res.status < 200) {
    throw new Error('Fetcher error');
  }

  return res.json();
}
