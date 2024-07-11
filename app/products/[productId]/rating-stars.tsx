'use client';

import { StarHalf, StarIcon } from 'lucide-react';

export default function RatingStars({ averageRating, size = 16 }) {
	const rating = Array.from({ length: 5 }, (elem, i) => {
		const halfNumber = i + 0.5; // [0.5, 1.5 , 2.5, 3.5 , 4.5]
		return (
			<span key={i}>
				{averageRating >= i + 1 ? (
					<StarIcon
						fill="currentColor"
						className="text-orange-400"
						size={size}
					/>
				) : averageRating >= halfNumber ? (
					<StarHalf
						fill="currentColor"
						className="text-orange-400"
						size={size}
					/>
				) : (
					<StarIcon
						className="text-gray-100"
						size={size}
					/>
				)}
			</span>
		);
	});

	return <div className="flex gap-[2px]">{rating}</div>;
}
