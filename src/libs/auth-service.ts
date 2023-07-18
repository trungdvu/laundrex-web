import laundrexApi from './laundrex-api';

const authService = Object.freeze({
  async signIn(email: string, password: string) {
    return laundrexApi.post(`/auth/sign-in`, {
      email,
      password,
    });
  },

  async signUp(email: string, password: string) {
    return laundrexApi.post('/auth/sign-up', {
      email,
      password,
    });
  },

  async getMe(url = '/auth/me') {
    return laundrexApi.get(url);
  },
});

export default authService;
