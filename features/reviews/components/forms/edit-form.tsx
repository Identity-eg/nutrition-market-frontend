'use client';

import { useTransition } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { RatingField } from 'components/ui/rating-field';

import { cn } from 'lib/utils';
import { useUpdateReview } from 'apis/reviews';

import type { TReview } from 'features/reviews/types/review';

const reviewSchema = z
	.object({
		rating: z.number({ required_error: 'Review rating is required' }),
		title: z.string().min(1, 'Review title is required'),
		comment: z.string().min(1, 'Review comment is required'),
	})
	.required({ title: true });

export const EditableForm = ({
	closeEditableMode,
	...review
}: {
	closeEditableMode: () => void;
} & Partial<TReview>) => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			rating: review?.rating,
			title: review?.title,
			comment: review?.comment,
		},
	});

	const updateReview = useUpdateReview();

	const onSubmit = (values: z.infer<typeof reviewSchema>) => {
		startTransition(() => {
			updateReview.mutate(
				{
					reviewId: review._id!,
					...values,
				},
				{
					onSuccess: async () => closeEditableMode(),
				}
			);
		});
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className={cn(
				'space-y-6 rounded-md border border-gray-50 p-4',
				updateReview.isError && `pointer-events-none opacity-50`
			)}>
			<Form {...form}>
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
					disabled={isPending}
					variant={'primary'}
					className='mr-2'>
					{isPending ? (
						<>
							<LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
							Please wait
						</>
					) : (
						'Update review'
					)}
				</Button>

				<Button
					onClick={closeEditableMode}
					variant={'outline'}
					type='submit'>
					Cancel
				</Button>
			</Form>
		</form>
	);
};
