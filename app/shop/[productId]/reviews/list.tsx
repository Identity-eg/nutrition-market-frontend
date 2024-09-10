import React from 'react';
import ReviewItem from './item';
import Image from 'next/image';
import { getReviews } from 'apis/server/reviews';
import { TProduct } from 'types/product';
import noReviewFound from 'assets/no-review-found.svg';
import { getMe } from 'apis/server/user';

export default async function ReviewsList({
	productId,
}: {
	productId: TProduct['_id'];
}) {
	const user = await getMe();
	const { reviews, count } = await getReviews({ productId });

	if (!count) {
		return (
			<div className='flex h-full flex-col items-center justify-center gap-4'>
				<Image
					width={500}
					height={500}
					src={noReviewFound}
					className='w-[8%]'
					alt='No reviews on this product'
				/>
				<h1 className='text-center text-gray-800'>
					No reviews on this product
				</h1>
			</div>
		);
	}

	return (
		<ul className='flex flex-col gap-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50'>
			{reviews?.map(review => (
				<ReviewItem
					currentUserId={user?._id}
					key={review._id}
					{...review}
				/>
			))}
		</ul>
	);
}
