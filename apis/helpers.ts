import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { TUser } from 'types/user';

// export const setCookies = async (response: Response) => {
// 	const data = await response.json();
// 	cookies().set('at', data.accessToken, {
// 		httpOnly: true,
// 		sameSite: 'strict',
// 		secure: false,
// 		maxAge: 1000 * 60 * 30,
// 	});
// 	//   if (!!cookies().getAll().length) return;
// 	response.headers.getSetCookie().forEach(singleCookie => {
// 		const parsedCookie = cookie.parse(singleCookie);
// 		console.log({ parsedCookie });
// 		const cookieName = Object.keys(parsedCookie)[0];
// 		const cookieValue = parsedCookie[cookieName];

// 		const options: Partial<ResponseCookie> | undefined = {
// 			path: parsedCookie.Path,
// 			httpOnly: !!singleCookie.includes('HttpOnly'),
// 			sameSite: parsedCookie.SameSite,
// 			secure: !!singleCookie.includes('Secure'),
// 			maxAge: +parsedCookie['Max-Age'],
// 			expires: parsedCookie.Expires
// 				? new Date(parsedCookie.Expires)
// 				: undefined,
// 		};
// 		cookies().set(cookieName, cookieValue, options);
// 	});
// };

export const getCredential = async (
	cookiesParam?: RequestCookies | undefined
) => {
	const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
	const accessToken = cookiesParam
		? cookiesParam.get(process.env.ACCESS_TOKEN_NAME ?? '')?.value
		: cookies().get(process.env.ACCESS_TOKEN_NAME ?? '')?.value;

	if (!accessToken) return;

	try {
		const { payload } = await jwtVerify<TUser>(accessToken, secret, {
			algorithms: ['HS256'],
		});

		return {
			accessToken,
			payload,
		};
	} catch {
		return;
	}
};

