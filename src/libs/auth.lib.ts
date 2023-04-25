import { fetcher } from './fetcher.lib';

export async function signIn(email: string, password: string) {
  return fetcher('/auth/sign-in', {
    method: 'POST',
    data: { email, password },
  });
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
