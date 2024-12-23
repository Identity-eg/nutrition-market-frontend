'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { flattenValidationErrors } from 'next-safe-action';
import { z } from 'zod';

import { actionClient } from 'apis/action-clients';
import { ACCESS_COOKIE_OPTIONS, REFRESH_COOKIE_OPTIONS } from 'constants/auth';
import { request } from 'apis/request';

type TForgotPasswordResponse = {
	msg: string;
};

type TResetPasswordResponse = {
	msg: string;
};

const loginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(6, { message: 'Password must be greater than 6 characters' }),
	from: z.string().nullable(),
});

export const login = actionClient
	.metadata({ actionName: 'login-action' })
	.schema(loginSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: userData }) => {
			const data = await request({
				url: '/auth/login',
				body: userData,
				method: 'POST',
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
			cookies().delete(process.env.CART_ID ?? '');
			return data;
		},
		{
			onSuccess: data => {
				if (!data.hasRedirected) {
					redirect(data.parsedInput.from ?? '/');
				}
			},
		}
	);

const registerSchema = z.object({
	firstName: z.string().min(1, { message: 'First Name is required' }),
	lastName: z.string().min(1, { message: 'Last Name is required' }),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, { message: 'Password is required' })
		.min(6, { message: 'Password must be greater than 6 characters' }),
});

export const register = actionClient
	.metadata({ actionName: 'register-action' })
	.schema(registerSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(async ({ parsedInput: userData }) => {
		await request({
			url: '/auth/register',
			body: userData,
			method: 'POST',
		});
	});

const otpSchema = z.object({
	otp: z.string().min(1, { message: 'Otp is required' }),
});

export const verifyEmail = actionClient
	.metadata({ actionName: 'verifiy-email-action' })
	.schema(otpSchema, {
		// handleValidationErrorsShape: ve => flattenValidationErrors(ve).fieldErrors,
	})
	.action(
		async ({ parsedInput: { otp } }) => {
			const data = await request({
				url: '/auth/verify-email',
				body: { otp },
				method: 'POST',
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

			cookies().delete(process.env.CART_ID ?? '');
			return data;
		},
		{
			onSuccess: async () => redirect(`/`),
		}
	);

export const logout = actionClient
	.metadata({ actionName: 'logout-action' })
	.action(
		async () => {
			await request({ url: '/auth/logout' });
			cookies().delete(process.env.ACCESS_TOKEN_NAME ?? '');
			cookies().delete(process.env.REFRESH_TOKEN_NAME ?? '');
		},
		{ onSuccess: async () => redirect('/') }
	);

export const refreshAccessTokenFn = async () => {
	try {
		const data = await request({ url: '/auth/refresh', method: 'GET' });
		return data;
	} catch {
		logout();
	}
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

export const getUserForOtp = async ({
	id,
}: {
	id: string;
}): Promise<{ email: string }> => {
	const { user } = await request({
		url: `/users/verify-email/${id}`,
	});

	return user;
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

export const loginWithGoogle = actionClient
	.metadata({ actionName: 'login-with-google-action' })
	.action(async () => {
		const { url } = await request({ url: '/auth/google' });
		redirect(url);
	});
