import { PRIVATE_ROUTES, UNAUTHENTICATED_ROUTES } from "@/constants/auth";
import { NextRequest, NextResponse } from "next/server";

export function unAuthenticatedRoutesMiddleware(req: NextRequest) {
  const { cookies, nextUrl, url } = req;
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

  return NextResponse.next();
}

export function privateRoutesMiddleware(req: NextRequest) {
  const { cookies, nextUrl, url } = req;
  const isLoggedIn = cookies.get("ident-auth-flag")?.value === "true";

  if (PRIVATE_ROUTES.some((route) => nextUrl.pathname.startsWith(route))) {
    if (!isLoggedIn && nextUrl.searchParams.get("from") !== "login") {
      return NextResponse.redirect(
        new URL(`/login?from=${nextUrl.pathname.substring(1)}`, url)
      );
    }
  }

  return NextResponse.next();
}
