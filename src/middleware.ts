import { NextResponse } from 'next/server';
import { COOKIE_KEY } from './constants/constants';

const publicPages = ['/', '/sign-in', '/sign-up'];

export const config = {
  matcher: ['/((?!.*\\.|api).*)'],
};

export default function middleware(req: any) {
  const url = req.nextUrl.clone();
  const isPublic = publicPages.includes(url.pathname);

  if (!isPublic) {
    const token = req.cookies.get(COOKIE_KEY.AUTH);

    if (!token) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }
}
