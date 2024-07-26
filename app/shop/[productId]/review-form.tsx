'use client';

import { useState } from 'react';
// import { useAddReview } from '@/apis/reviews';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { revalidateAction } from '@/actions/revalidateAction';

// import { ReviewFormValues } from '@/types/forms';
import { LoaderCircle, StarIcon } from 'lucide-react';
import { Checkbox } from 'components/ui/checkbox';
import { Button } from 'components/ui/button';
import RatingField from './rating-field';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Input } from 'components/ui/input';
import { cn } from 'lib/utils';
import { Textarea } from 'components/ui/textarea';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddReview } from 'apis/reviews';

const reviewSchema = z
	.object({
		rating: z.number({ required_error: 'Review rating is required' }),
		title: z.string().min(1, 'Review title is required'),
		comment: z.string().min(1, 'Review comment is required'),
	})
	.required({ title: true });

const ReviewForm = ({ productId }: { productId: string }) => {
	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: {
			title: '',
			comment: '',
		},
	});

	const addReview = useAddReview();

	const onSubmit = (values: z.infer<typeof reviewSchema>) => {
		addReview.mutate({
			productId,
			...values,
		});
	};

	return (
		<>
			{addReview.isError && (
				<h1 className='pt-2 mb-4 -mt-2 text-red-500 border-t border-gray-40'>
					{addReview.error?.message}
				</h1>
			)}
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={cn(
					'space-y-6',
					addReview.isError && `pointer-events-none opacity-50`
				)}>
				<Form {...form}>
					<FormField
						control={form.control}
						name='rating'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Review Title</FormLabel>
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
										placeholder='Example: Easy To Use'
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
										placeholder='Example: Easy To Use'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full'>
						{addReview.isPending ? (
							<>
								<LoaderCircle className='w-4 h-4 mr-2 animate-spin' />
								Please wait
							</>
						) : (
							'Submit'
						)}
					</Button>
				</Form>
			</form>
		</>
	);
};

export default ReviewForm;
