import { HTTP_STATUS } from '@/constants/constant';
import { signIn } from '@/libs/auth.lib';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials: any, _) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error('email/password missing');
        }

        const { data, statusCode } = await signIn(email, password);

        if (statusCode === HTTP_STATUS.OK && data) {
          return data;
        }

        throw new Error('wrong credentials');
      },
    }),
  ],
});
