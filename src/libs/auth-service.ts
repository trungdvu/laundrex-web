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

  async getMe() {
    return laundrexApi.get('/auth/me');
  },
});

export default authService;
