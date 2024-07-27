import React from 'react';
import ReviewItem from './item';
import Image from 'next/image';
import { getReviews } from 'apis/server/reviews';
import { TProduct } from 'types/product';
import { getCredential } from 'apis/helpers';

export default async function ReviewsList({
	productId,
}: {
	productId: TProduct['_id'];
}) {
	const credential = await getCredential();
	const { reviews, count } = await getReviews({ productId });
	const currentUserId = credential?.payload?._id;

	if (!count) {
		return (
			<div className='flex h-full flex-col items-center justify-center gap-4'>
				{/* <Image
					width={500}
					height={500}
					src={'imgReview'}
					className='w-[8%]'
					alt='No reviews on this product'
				/> */}
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
					currentUserId={currentUserId}
					key={review._id}
					{...review}
				/>
			))}
		</ul>
	);
}
