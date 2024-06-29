import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRIVATE_ROUTES, UNAUTHENTICATED_ROUTES } from "./constants/auth";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { cookies, nextUrl, url } = request;
  const isLoggedIn = cookies.get("ident-auth-flag")?.value === "true";

  if (
    UNAUTHENTICATED_ROUTES.some((route) => nextUrl.pathname.startsWith(route))
  ) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (PRIVATE_ROUTES.some((route) => nextUrl.pathname.startsWith(route))) {
    if (!isLoggedIn && nextUrl.searchParams.get("from") !== "login") {
      return NextResponse.redirect(
        new URL(`/login?from=${nextUrl.pathname.substring(1)}`, url)
      );
    }
  }

  if (response && response instanceof NextResponse) return response;
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
