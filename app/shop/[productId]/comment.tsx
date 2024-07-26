'use client';

import {
	CheckCircle,
	CircleCheck,
	CircleX,
	Pencil,
	Trash2,
} from 'lucide-react';
import React, { startTransition, useTransition } from 'react';
import RatingStars from './rating-stars';
import { Button } from 'components/ui/button';
import { TReview } from 'types/review';
import dayjs from 'dayjs';
import { useDeleteReview } from 'apis/reviews';

export default function Comment({
	_id,
	user,
	title,
	comment,
	rating,
	createdAt,
}: TReview) {
	const formattedDate = dayjs(createdAt).format('MMMM D, YYYY hh:mm A');
	const [isPending, startTransition] = useTransition();
	const deleteReview = useDeleteReview();
	const isMyReview = true;
	return (
		<li
			className={`flex items-start gap-2 px-4 pb-4 ${
				isPending ? 'opacity-50' : ''
			}`}>
			<div className='w-full'>
				<div className='flex justify-between'>
					<h1 className='mb-1 text-gray-800 capitalize typography-B16'>
						{title}
					</h1>
					<p className='flex items-center gap-2 text-sm text-gray-100'>
						<CheckCircle
							size={16}
							color='green'
						/>
						Verified reviewer
					</p>
				</div>
				<div className='flex mb-1 text-yellow-500'>
					<RatingStars averageRating={rating} />
				</div>
				<p className='mb-3 text-gray-400 typography-R14'>{formattedDate}</p>
				<div className='flex flex-col items-center justify-between gap-4 media-md:flex-row media-md:items-center'>
					<p className='flex-wrap typography-R16'>{comment}</p>
					{isMyReview && (
						<div className='flex gap-2'>
							<Button
								variant='secondary-white'
								className='text-red-300 hover:bg-red-30'
								onClick={() => {
									startTransition(() => {
										deleteReview.mutate({ reviewId: _id });
									});
								}}>
								<Trash2
									size={16}
									className='mr-2'
								/>
								Delete
							</Button>
							<Button
								variant='secondary-gray'

								// onClick={() => {
								// 	dispatch(enableEditing());
								// }}
							>
								<Pencil
									size={16}
									className='mr-2'
								/>
								Edit
							</Button>
						</div>
					)}
				</div>
			</div>
		</li>
	);
}
