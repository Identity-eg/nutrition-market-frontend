'use client';

import { useEffect, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from 'components/ui/button';
import { Checkbox } from 'components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import CardAuthWrapper from '../card-auth-wrapper';

import { useLogin } from 'apis/auth';
import { useAuthStore } from 'store/auth';

const loginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z.string().min(1, {
		message: 'Password is required',
	}),
	rememberMe: z.boolean(),
});

export default function LoginPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const authenticateUser = useAuthStore(state => state.authenticateUser);
	const from = searchParams.get('from');
	const form = useForm<z.infer<typeof loginSchema>>({
		defaultValues: {
			email: 'mazen@amr.com',
			password: '123456',
			rememberMe: false,
		},
		resolver: zodResolver(loginSchema),
	});

	const [isPending, startTransition] = useTransition();

	const loginMutation = useLogin();

	function onSubmit(values: z.infer<typeof loginSchema>) {
		startTransition(() => {
			loginMutation.mutate(values, {
				onSuccess: data => {
					router.replace(from ? `${from}?from=login` : '/');
				},
			});
		});
	}

	return (
		<CardAuthWrapper
			description="Enter your email below to login to your account"
			title="Login">
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8">
				<Form {...form}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										required
										placeholder="Enter your email address"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<div className="flex items-center">
									<FormLabel>Password</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline">
										Forgot password?
									</Link>
								</div>
								<FormControl>
									<Input
										type="password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</Form>
				<Button
					type="submit"
					disabled={isPending}
					className="w-full">
					{isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Please wait
						</>
					) : (
						'Sign in'
					)}
				</Button>
				<p className="text-gray-6 typography-R14">
					Don’t have an account?{' '}
					<Link
						className="text-black-3 typography-M14"
						href="/signup">
						Sign up
					</Link>
				</p>
			</form>
		</CardAuthWrapper>
	);
}

