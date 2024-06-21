import { useAuthStore } from '@/store/auth';
import { NextRequest, NextResponse } from 'next/server';

export function privateRouteMiddleware(req: NextRequest) {
  const accessToken = useAuthStore.getState().isAuthenticated;
  console.log({ accessToken });

  // if (!token) {
  //   return NextResponse.redirect('/login');
  // }
  return NextResponse.next();
}
