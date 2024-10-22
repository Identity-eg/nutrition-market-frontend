'use client';

import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from 'lib/utils';

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
import { Textarea } from 'components/ui/textarea';
import { Separator } from 'components/ui/separator';
import { RatingField } from 'components/ui/rating-field';

import { useAddReview } from 'apis/reviews';

import type { TUser } from 'features/auth/types/user';

const reviewSchema = z
	.object({
		rating: z.number({ required_error: 'Review rating is required' }),
		title: z.string().min(1, 'Review title is required'),
		comment: z.string().min(1, 'Review comment is required'),
	})
	.required({ title: true });

export const AddForm = ({
	user,
	hasUserReview,
	productId,
}: {
	hasUserReview: boolean;
	user?: TUser;
	productId: string;
}) => {
	const [isSuccessMsgAllowedToDisplay, setIsSuccessMsgAllowedToDisplay] =
		useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			title: '',
			comment: '',
		},
	});

	useEffect(() => {
		if (isSuccessMsgAllowedToDisplay) {
			setTimeout(() => setIsSuccessMsgAllowedToDisplay(false), 10000);
		}
	}, [isSuccessMsgAllowedToDisplay]);

	const addReview = useAddReview();

	const onSubmit = (values: z.infer<typeof reviewSchema>) => {
		startTransition(() => {
			addReview.mutate(
				{
					productId,
					...values,
				},
				{ onSuccess: () => setIsSuccessMsgAllowedToDisplay(true) }
			);
		});
	};

	if (hasUserReview) {
		return isSuccessMsgAllowedToDisplay ? (
			<div>
				<Separator className='mb-4 mt-8' />
				<span className='flex gap-2 text-green-light-700 typography-M16'>
					<CheckCircle2 />
					Your review added successfully
				</span>
			</div>
		) : null;
	}

	if (!user) {
		return (
			<div className='space-y-8'>
				<Separator />

				<p className='typography-SB18'>
					Review this product <br />
					<span className='text-gray-200 typography-R14'>
						Share your thoughts with other customers
					</span>
				</p>

				<Button
					asChild
					className='w-full capitalize'
				>
					<Link href={`/login?from=shop/${productId}`}>Write a review</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<Separator />

			<p className='mb-8 typography-SB18'>
				Review this product <br />
				<span className='text-gray-200 typography-R14'>
					Share your thoughts with other customers
				</span>
			</p>

			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'space-y-6',
					addReview.isError && `pointer-events-none opacity-50`
				)}
			>
				<Form {...form}>
					<FormField
						control={form.control}
						name='rating'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Rating</FormLabel>
								<FormControl>
									<RatingField {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Review Title</FormLabel>
								<FormControl>
									<Input
										placeholder='e.g. Easy To Use'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='comment'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Product Review</FormLabel>
								<FormControl>
									<Textarea
										placeholder='e.g. Easy To Use'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full'
						disabled={isPending}
					>
						{isPending ? (
							<>
								<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
								Please wait
							</>
						) : (
							'Submit'
						)}
					</Button>

					{addReview.isError && (
						<h1 className='-mt-2 mb-4 border-t border-gray-40 pt-2 text-red-500'>
							{addReview.error?.message}
						</h1>
					)}
				</Form>
			</form>
		</div>
	);
};
