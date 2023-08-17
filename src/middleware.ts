import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_KEY } from './constants/constants';

const publicRoutes = ['/sign-in', '/sign-up', '/verify'];
const whiteListPublicRoutes = ['/'];

export const config = {
  matcher: ['/((?!.*\\.|api).*)'],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isPublic = (() => {
    if (whiteListPublicRoutes.includes(url.pathname)) {
      return true;
    }
    for (const path of publicRoutes) {
      if (url.pathname.startsWith(path)) {
        return true;
      }
    }
    return false;
  })();

  if (!isPublic) {
    const token = req.cookies.get(COOKIE_KEY.AUTH);

    if (!token) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }
}
