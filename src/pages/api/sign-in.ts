import {
  AUTH_EXPIRATION,
  COOKIE_KEY,
  HTTP_STATUS,
  NODE_ENV,
} from '@/constants/constants';
import { getAuthErrorMessage } from '@/features/auth/auth.util';
import authService from '@/libs/auth-service';
import { ApiResponse } from '@/utils/types';
import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = req.body;
    const signInRes = await authService.signIn(email, password);

    if (signInRes.ok) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(COOKIE_KEY.AUTH, signInRes.data.accessToken, {
          httpOnly: false,
          maxAge: +(AUTH_EXPIRATION || 3600),
          path: '/',
          sameSite: 'lax',
          secure: NODE_ENV === 'production',
        }),
      );
      res.status(HTTP_STATUS.OK).json(signInRes);
    } else {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        ok: false,
        statusCode: HTTP_STATUS.BAD_REQUEST,
        data: {
          message: getAuthErrorMessage(signInRes.data.errorCode),
        },
      } as ApiResponse);
    }
  } catch (error: any) {
    throw new Error('Internal server error');
  }
}
