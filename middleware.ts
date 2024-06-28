import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRouteMiddleware } from './middlewares/auth';
import { refreshAccessTokenFn } from './apis/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let response = privateRouteMiddleware(request);
  if (response && response instanceof NextResponse) return response;
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/*',
// };
