import { cookies } from 'next/headers';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import {
	ACCESS_COOKIE_OPTIONS,
	PRIVATE_ROUTES,
	UNAUTHENTICATED_ROUTES,
} from 'constants/auth';

import { getCredential } from 'apis/helpers';
import { refreshAccessTokenFn } from 'apis/server/auth';

import { CustomMiddleware } from 'middlewares/chain';

export function unAuthenticatedRoutesMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		const { nextUrl, url, cookies } = request;
		const credential = await getCredential(cookies);
		if (
			UNAUTHENTICATED_ROUTES.some(route => nextUrl.pathname.startsWith(route))
		) {
			if (credential) {
				return NextResponse.redirect(new URL('/', url));
			}
		}
		return middleware(request, event, response);
	};
}

export const refreshToken = (middleware: CustomMiddleware) => {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		const credential = await getCredential();
		if (
			!credential &&
			cookies().get(process.env.REFRESH_TOKEN_NAME ?? '')?.value
		) {
			const data = await refreshAccessTokenFn();

			request.cookies.set(
				process.env.ACCESS_TOKEN_NAME ?? '',
				data?.accessToken ?? ''
			);
			response = NextResponse.next({
				request: {
					headers: request.headers,
				},
			});
			response.cookies.set(
				process.env.ACCESS_TOKEN_NAME ?? '',
				data?.accessToken ?? '',
				ACCESS_COOKIE_OPTIONS
			);
		}

		return middleware(request, event, response);
	};
};

export function privateRoutesMiddleware(middleware: CustomMiddleware) {
	return async (
		request: NextRequest,
		event: NextFetchEvent,
		response: NextResponse
	) => {
		const { nextUrl, url, cookies } = request;
		const credential = await getCredential(cookies);

		if (PRIVATE_ROUTES.some(route => nextUrl.pathname.startsWith(route))) {
			if (!credential) {
				return NextResponse.redirect(
					new URL(`/login?from=${nextUrl.pathname.substring(1)}`, url)
				);
			}
		}

		return middleware(request, event, response);
	};
}
