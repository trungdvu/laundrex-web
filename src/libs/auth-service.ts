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

  async verifyToken(userId: string, token: string) {
    return laundrexApi.get(`/auth/verify/${userId}/${token}`);
  },

  async resendVerifyToken(email: string) {
    return laundrexApi.post('/auth/verify/resend', {
      email,
    });
  },

  async getMe(url = '/auth/me') {
    return laundrexApi.get(url);
  },
});

export default authService;
