import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/', '/sign-in', '/sign-up'];

export const config = {
  matcher: ['/((?!.*\\.|api).*)'],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const isPublic = publicPages.includes(url.pathname);

  if (!isPublic) {
    const accessToken = req.cookies.get('Authentication');
    if (!accessToken) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }
}
