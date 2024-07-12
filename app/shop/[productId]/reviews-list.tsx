import React from 'react';
import RatingStars from './rating-stars';
import { CheckCircle, Divide } from 'lucide-react';
import Comment from './comment';
import Image from 'next/image';

export default function ReviewsList() {
	const isReviewFound = true;
	return !isReviewFound ? (
		<div className="flex h-full flex-col items-center justify-center gap-4">
			<Image
				width={500}
				height={500}
				src={'imgReview'}
				className="w-[8%]"
				alt="No reviews on this product"
			/>
			<h1 className="text-center text-gray-800">No reviews on this product</h1>
		</div>
	) : (
		<ul className="flex flex-col gap-4 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-50">
			{[1, 2, 3, 4]?.map(review => <Comment />)}
		</ul>
	);
}
