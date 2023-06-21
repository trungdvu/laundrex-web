import clientApi from './client-api';

export async function signIn(email: string, password: string) {
  return clientApi.post(`/auth/sign-in`, {
    email,
    password,
  });
}

export async function signUp(email: string, password: string) {
  return clientApi.post('/auth/sign-up', {
    email,
    password,
  });
}

export async function signOut() {
  return clientApi.post('auth/sign-out');
}
