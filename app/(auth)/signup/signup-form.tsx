'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useAction } from 'next-safe-action/hooks';

import { Button } from 'components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';

import { toast } from 'components/ui/use-toast';
import { register } from 'features/auth/apis/auth';

const registerSchema = z.object({
	firstName: z.string().min(1, {
		message: 'First name is required',
	}),
	lastName: z.string().min(1, {
		message: 'Last name is required',
	}),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, {
			message: 'Password is required',
		})
		.min(6, { message: 'Password must be at least 6 characters' }),
	rememberMe: z.boolean(),
});
export function SignupForm() {
	const router = useRouter();
	const from = '/';
	const form = useForm<z.infer<typeof registerSchema>>({
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			rememberMe: false,
		},
		resolver: zodResolver(registerSchema),
	});

	const { execute, isPending } = useAction(register, {
		onSuccess: async () => router.replace(from),
		onError: async ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	function onSubmit(values: z.infer<typeof registerSchema>) {
		execute(values);
	}
	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8'>
			<Form {...form}>
				<div className='grid grid-cols-2 gap-x-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='John'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='lastName'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Doe'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type='email'
									placeholder='m@example.com'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>

			<Button
				type='submit'
				disabled={isPending}
				className='w-full'>
				{isPending ? (
					<>
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Please wait
					</>
				) : (
					'Register'
				)}
			</Button>
			<p className='text-gray-6 typography-R14'>
				Already have an account?{' '}
				<Link
					href='/login'
					className='text-black-3 typography-M14'>
					Log in
				</Link>
			</p>
		</form>
	);
}
