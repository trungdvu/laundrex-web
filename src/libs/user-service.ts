import laundrexApi from './laundrex-api';

const userService = Object.freeze({
  async updateMe(body: { avatar?: string; name?: string }) {
    return laundrexApi.put('/users/me', body);
  },
});

export default userService;
