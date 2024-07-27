'use client';

import { CheckCircle } from 'lucide-react';
import dayjs from 'dayjs';

import { RatingStars } from '../components/rating-stars';
import ActionBtns from './components/action-btns';

import type { TReview } from 'types/review';
import { Suspense, useState } from 'react';
import { EditableForm } from './editable-form';
import { useGetSingleReview } from 'apis/reviews';
import { Avatar, AvatarFallback } from 'components/ui/avatar';

export default function Comment({
	_id,
	user,
	title,
	comment,
	rating,
	createdAt,
	currentUserId,
}: TReview & { currentUserId: string | undefined }) {
	const [isEditable, setIsEditable] = useState(false);
	const isMyReview = currentUserId === user._id;

	const formattedDate = dayjs(createdAt).format('MMMM D, YYYY hh:mm A');

	if (isEditable) {
		return (
			<EditableForm
				title={title}
				_id={_id}
				comment={comment}
				rating={rating}
				closeEditableMode={() => setIsEditable(false)}
			/>
		);
	}

	return (
		<li className='flex gap-4 px-4 pb-4 [&:has(button[data-state=deleting])]:animate-pulse'>
			<Avatar className='size-10'>
				<AvatarFallback className='bg-gray-30 capitalize'>
					{user.name?.[0]}
				</AvatarFallback>
			</Avatar>
			<div className='flex-1'>
				<div className='mb-4 mt-2 flex items-center gap-2'>
					<p className='capitalize typography-M16'>{user.name}</p>
					<CheckCircle
						size={16}
						className='text-green-light-800'
					/>
				</div>

				<RatingStars
					className='mb-2'
					averageRating={rating}
				/>

				<p className='mb-1 capitalize text-gray-800 typography-B16'>{title}</p>

				<p className='mb-3 text-gray-200 typography-R12'>{formattedDate}</p>

				<div className='flex flex-col justify-between gap-4 media-md:flex-row media-md:items-center'>
					<p className='flex-wrap typography-R16'>{comment}</p>

					{isMyReview && (
						<ActionBtns
							openEditingMode={() => setIsEditable(true)}
							reviewId={_id}
						/>
					)}
				</div>
			</div>
		</li>
	);
}
