'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import dayjs from 'dayjs';

import { Avatar, AvatarFallback } from 'components/ui/avatar';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'components/ui/tooltip';
import { RatingStars } from 'components/ui/rating-stars';

import { CommentBtns } from 'features/reviews/components/comment/comment-btns';
import { EditableForm } from 'features/reviews/components/forms/edit-form';

import type { TReview } from 'features/reviews/types/review';

export function Comment({
	_id,
	user,
	product,
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

	const isVerifiedPurchaser = user.purchasedProducts.includes(product);

	return (
		<li className='flex gap-2 px-4 pb-4 [&:has(button[data-state=deleting])]:animate-pulse'>
			<Avatar className='size-10'>
				<AvatarFallback className='bg-gray-30 capitalize text-gray-400 typography-R14'>
					{user.firstName?.[0]}
				</AvatarFallback>
			</Avatar>
			<div className='flex-1'>
				<div className='mb-4 mt-2 flex items-center gap-2'>
					<p className='capitalize typography-M16'>{user.firstName}</p>
					{isVerifiedPurchaser && (
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger>
									<CheckCircle
										size={16}
										className='text-green-light-800'
									/>
								</TooltipTrigger>
								<TooltipContent className='typography-B12'>
									Verified Purchaser
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
				</div>

				<RatingStars
					className='mb-2'
					averageRating={rating}
				/>

				<p className='mb-1 capitalize text-[#bc6c25] typography-SB16'>
					{title}
				</p>

				<p className='mb-3 text-gray-200 typography-R12'>{formattedDate}</p>

				<div className='flex flex-col justify-between gap-4 media-md:flex-row media-md:items-center'>
					<p className='flex-wrap typography-R16'>{comment}</p>

					{isMyReview && (
						<CommentBtns
							openEditingMode={() => setIsEditable(true)}
							reviewId={_id}
						/>
					)}
				</div>
			</div>
		</li>
	);
}
