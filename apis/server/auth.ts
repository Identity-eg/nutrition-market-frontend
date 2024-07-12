'use server';

import { request } from 'apis/client';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from 'constants/auth';
import { TUser } from 'types/user';

type TLoginResponse = {
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
	const data = await request({
		url: '/auth/login',
		method: 'POST',
		body: user,
	});

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
		const data = await request({ url: '/auth/refresh', method: 'GET' });

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
	const data = await request({
		url: '/auth/register',
		method: 'POST',
		body: user,
	});
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

export const forgotPassword = async ({
	email,
}: {
	email: string;
}): Promise<TForgotPasswordResponse> => {
	const data = await request({
		url: '/auth/forgot-password',
		method: 'POST',
		body: { email },
	});

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
	const data = await request({
		url: `/auth/reset-password/${token}`,
		method: 'PUT',
		body: { password, confirmPassword },
	});

	return data;
};
