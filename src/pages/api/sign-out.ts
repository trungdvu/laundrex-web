import { COOKIE_KEY } from '@/constants/constants';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signOut(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize(COOKIE_KEY.AUTH, '', {
        maxAge: -1,
        path: '/',
      }),
    );
    res.json({ ok: true });
  } catch (error) {
    throw new Error('sign out error');
  }
}
