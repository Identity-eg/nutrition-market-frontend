import dayjs from 'dayjs';
import { CheckCircle } from 'lucide-react';

import { RatingStars } from 'app/shop/[productId]/rating-stars';
import { ManageButtons } from 'app/shop/[productId]/manage-buttons';

import type { TReview } from 'types/review';

export default async function Comment({
	_id,
	user,
	title,
	comment,
	rating,
	createdAt,
}: TReview) {
	const formattedDate = dayjs(createdAt).format('MMMM D, YYYY hh:mm A');

	return (
		<li className='px-4 pb-4 [&:has(button[data-state=deleting])]:animate-pulse'>
			<div className='flex justify-between'>
				<span className='mb-1 capitalize text-gray-800 typography-B16'>
					{title}
				</span>

				<p className='flex items-center gap-2 text-sm text-gray-100'>
					<CheckCircle
						size={16}
						color='green'
					/>
					Verified reviewer
				</p>
			</div>

			<RatingStars
				className='mb-2'
				averageRating={rating}
			/>

			<p className='mb-3 text-gray-200 typography-R12'>{formattedDate}</p>

			<div className='flex flex-col justify-between gap-4 media-md:flex-row media-md:items-center'>
				<p className='flex-wrap typography-R16'>{comment}</p>

				<ManageButtons
					reviewId={_id}
					user={user}
				/>
			</div>
		</li>
	);
}
