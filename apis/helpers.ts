import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import type { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import type { TUser } from 'types/user';

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

