'use server';

import { request } from 'apis/client';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import {
	ACCESS_COOKIE_OPTIONS,
	REFRESH_COOKIE_OPTIONS,
} from 'constants/auth';
import { TUser } from 'types/apis';

export type TLoginResponse = {
	accessToken: string;
	refreshToken: string;
	user: TUser;
};

type TForgotPasswordResponse = {
	msg: string;
};

type TResetPasswordResponse = {
	msg: string;
};

export const login = async (user: {
	email: string;
	password: string;
}): Promise<TLoginResponse> => {
	const res = await request({
		url: '/auth/login',
		method: 'POST',
		body: user,
	});

	const data = await res.json();

	cookies().set(
		process.env.ACCESS_TOKEN_NAME ?? '',
		data.accessToken,
		ACCESS_COOKIE_OPTIONS
	);

	cookies().set(
		process.env.REFRESH_TOKEN_NAME ?? '',
		data.refreshToken,
		REFRESH_COOKIE_OPTIONS
	);

	return data;
};

export const logout = async () => {
	await request({ url: '/auth/logout' });
	cookies().delete(process.env.ACCESS_TOKEN_NAME ?? '');
	cookies().delete(process.env.REFRESH_TOKEN_NAME ?? '');
	redirect('/');
};

export const refreshAccessTokenFn = async () => {
	try {
		const res = await request({ url: '/auth/refresh', method: 'GET' });
		const data = await res.json();

		return data;
	} catch {
		logout;
	}
};

export const register = async (user: {
	name: string;
	email: string;
	password: string;
}): Promise<TLoginResponse> => {
	const res = await request({
		url: '/auth/register',
		method: 'POST',
		body: user,
	});
	const data = await res.json();

	return data;
};

export const forgotPassword = async ({
	email,
}: {
	email: string;
}): Promise<TForgotPasswordResponse> => {
	const res = await request({
		url: '/auth/forgot-password',
		method: 'POST',
		body: { email },
	});

	const data = await res.json();
	return data;
};

export const resetPassword = async ({
	password,
	confirmPassword,
	token,
}: {
	password: string;
	confirmPassword: string;
	token: string;
}): Promise<TResetPasswordResponse> => {
	const res = await request({
		url: `/auth/reset-password/${token}`,
		method: 'PUT',
		body: { password, confirmPassword },
	});

	const data = await res.json();
	return data;
};

