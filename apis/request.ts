'use server';

import { cookies } from 'next/headers';
import { getAccessToken } from './helpers';
import qs from 'qs';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type TOptions =
	| (Omit<RequestInit, 'body'> & {
			url: `/${string}`;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			body?: number | string | { [x: string]: any };
			baseUrl?: string;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			query?: Record<string, any>;
	  })
	| undefined;

export const request = async ({ ...options }: TOptions) => {
	const accessToken = await getAccessToken();

	const queryString = qs.stringify(options.query, {
		addQueryPrefix: true,
		allowEmptyArrays: true,
		skipNulls: true,
	});

	const defaultHeaders = {
		...(accessToken && {
			Authorization: `Bearer ${accessToken}`,
		}),
		cookie: (await cookies()).toString(),
		'Content-Type': 'application/json',
		...(process.env.NEXT_PUBLIC_API_KEY && {
			'api-key': process.env.NEXT_PUBLIC_API_KEY,
		}),
	};

	const finalBaseUrl = options.baseUrl ?? baseURL;

	try {
		const res = await fetch(`${finalBaseUrl}${options.url}${queryString}`, {
			credentials: 'include',
			...options,

			headers: { ...defaultHeaders, ...options.headers },
			body: options.body ? JSON.stringify(options.body) : undefined,
		});

		if (!res.ok) {
			const data = await res.json();
			throw new Error(data.msg);
		}
		return await res.json();
	} catch (err) {
		throw new Error((err as Error).message);
	}
};
