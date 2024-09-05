'use server';

import { cookies } from 'next/headers';
import { getCredential } from './helpers';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type TOptions =
	| (Omit<RequestInit, 'body'> & {
			url: `/${string}`;
			body?: number | string | { [x: string]: string | number | boolean };
	  })
	| undefined;

export const request = async ({ ...options }: TOptions) => {
	const credential = await getCredential();

	const defaultHeaders = {
		...(credential?.accessToken && {
			Authorization: `Bearer ${credential.accessToken}`,
		}),
		cookie: cookies().toString(),
		'Content-Type': 'application/json',
		...(process.env.NEXT_PUBLIC_API_KEY && {
			'api-key': process.env.NEXT_PUBLIC_API_KEY,
		}),
	};

	try {
		const res = await fetch(baseURL + options.url, {
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
		if ((err as Error).name === 'SyntaxError') {
			throw new Error('Something went wrong');
		}
		throw new Error((err as Error).message);
	}
};
