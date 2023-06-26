import { AUTH_EXPIRATION, COOKIE_KEY, NODE_ENV } from '@/constants/constants';
import authService from '@/libs/auth-service';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body;
  const signInRes = await authService.signIn(email, password);

  if (signInRes.ok) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(COOKIE_KEY.AUTH, signInRes.data.accessToken, {
        httpOnly: true,
        maxAge: +(AUTH_EXPIRATION || 0) * 1000,
        path: '/',
        sameSite: 'lax',
        secure: NODE_ENV === 'production',
      }),
    );
  }

  return res.json(signInRes);
}
