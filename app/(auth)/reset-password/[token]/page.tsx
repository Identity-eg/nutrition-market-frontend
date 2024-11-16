'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

import CardAuthWrapper from 'components/utils/card-auth-wrapper';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { Button } from 'components/ui/button';

import { useResetPassword } from 'apis/auth';
import { useToast } from 'components/ui/use-toast';

const resetSchema = z
	.object({
		password: z.string().min(1, {
			message: 'Password is required',
		}),
		confirmPassword: z.string().min(1, {
			message: 'Confirm Password is required',
		}),
	})
	.refine(
		values => {
			return values.password === values.confirmPassword;
		},
		{
			message: 'Passwords must match!',
			path: ['confirmPassword'],
		}
	);

export default function ResetPasswordPage() {
	const router = useRouter();
	const { token } = useParams<{ token: string }>();

	const { toast } = useToast();

	// const authenticateUser = useAuthStore((state) => state.authenticateUser);
	const form = useForm<z.infer<typeof resetSchema>>({
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(resetSchema),
	});

	const resetPasswordMutation = useResetPassword();

	function onSubmit(values: z.infer<typeof resetSchema>) {
		resetPasswordMutation.mutate(
			{ ...values, token },
			{
				onSuccess: async data => {
					toast({
						title: data.msg,
					});
					router.push('/login');
				},
			}
		);
	}

	return (
		<CardAuthWrapper
			title='Reset Your password'
			description='Create your new password to login to your account'>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<Form {...form}>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your Password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>

								<FormControl>
									<Input
										type='password'
										placeholder='Confirm Your password'
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
					disabled={resetPasswordMutation.isPending}
					className='w-full'>
					{resetPasswordMutation.isPending ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Please wait
						</>
					) : (
						'Submit'
					)}
				</Button>
			</form>
		</CardAuthWrapper>
	);
}
