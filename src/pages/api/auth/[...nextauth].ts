import { signIn } from '@/libs/auth.lib';
import { getAuthErrorMessage } from '@/utils/auth.util';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    maxAge: +(process.env.JWT_EXPIRATION || 7200),
  },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials: any, _) {
        const { email, password } = credentials;
        try {
          const response = await signIn(email, password);
          if (response.ok && response.data) {
            return response.data;
          } else {
            throw new Error(getAuthErrorMessage(response.errorCode));
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
});
