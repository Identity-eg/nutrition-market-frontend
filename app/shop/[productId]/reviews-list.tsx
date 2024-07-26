import React from 'react';
import Comment from './comment';
import Image from 'next/image';
import { getReviews } from 'apis/server/reviews';
import { TProduct } from 'types/product';

export default async function ReviewsList({
	productId,
}: {
	productId: TProduct['_id'];
}) {
	const { reviews, count } = await getReviews({ productId });

	console.log({ reviews, count });

	// if (!count) {
	// 	return (
	// 		<div className='flex flex-col items-center justify-center h-full gap-4'>
	// 			<Image
	// 				width={500}
	// 				height={500}
	// 				src={'imgReview'}
	// 				className='w-[8%]'
	// 				alt='No reviews on this product'
	// 			/>
	// 			<h1 className='text-center text-gray-800'>
	// 				No reviews on this product
	// 			</h1>
	// 		</div>
	// 	);
	// }

	return (
		<ul className='flex flex-col gap-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50'>
			{reviews?.map(review => (
				<Comment
					key={review._id}
					{...review}
				/>
			))}
		</ul>
	);
}
