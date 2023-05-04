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
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials: any, _) {
        const { email, password } = credentials;
        try {
          const { ok, data, errorCode } = await signIn(email, password);
          if (ok && data) {
            return data;
          } else {
            throw new Error(getAuthErrorMessage(errorCode));
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
});
