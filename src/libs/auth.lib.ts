import { API_BASE } from '@/constants/constant';
import clientAxios from './client-axios';
import { fetcher } from './fetcher.lib';

export async function signIn(email: string, password: string) {
  const res = await clientAxios.post(`${API_BASE}/auth/sign-in`, {
    email,
    password,
  });
  return res;
}

export async function signUp(email: string, password: string) {
  return fetcher('/auth/sign-up', {
    method: 'POST',
    data: { email, password },
  });
}

export async function signOut() {
  return fetcher('auth/sign-out', {
    method: 'POST',
  });
}
