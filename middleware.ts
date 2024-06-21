import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRouteMiddleware } from './middlewares/auth';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const refreshToken = request.cookies.get('ishop-refresh-token');
  // console.log({ refreshToken });
  let response = privateRouteMiddleware(request);
  if (response && response instanceof NextResponse) return response;
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/shop',
};
