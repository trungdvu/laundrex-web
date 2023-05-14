import { signIn } from '@/libs/auth.lib';
import { getAuthErrorMessage } from '@/utils/auth.util';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse,
) => NextAuthOptions;

export const authOptions: NextAuthOptionsCallback = (req, res) => {
  return {
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
          try {
            const { email, password } = credentials;
            const response = await signIn(email, password);
            const result = response.data;
            if (result.ok && result.data) {
              const cookies = response.headers['set-cookie'];
              if (cookies) {
                res.setHeader('Set-Cookie', cookies);
              }
              return result.data;
            }
            throw new Error(getAuthErrorMessage(result.data.errorCode));
          } catch (error) {
            console.log(error);
            throw error;
          }
        },
      }),
    ],
    callbacks: {
      async session({ session }) {
        return session;
      },
    },
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};
