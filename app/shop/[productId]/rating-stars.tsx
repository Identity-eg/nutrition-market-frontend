import { StarHalf, StarIcon } from 'lucide-react';
import React, { forwardRef, HtmlHTMLAttributes } from 'react';

export interface SpanProps extends HtmlHTMLAttributes<HTMLSpanElement> {
	averageRating: number;
	size?: number;
}

export const RatingStars = forwardRef<HTMLSpanElement, SpanProps>(
	({ size = 16, averageRating, className, ...props }, ref) => {
		const rating = Array.from({ length: 5 }, (_, i) => {
			const halfNumber = i + 0.5;
			return (
				<span
					className={className}
					key={i}
					ref={ref}
					{...props}>
					{averageRating >= i + 1 ? (
						<StarIcon
							fill='currentColor'
							className='text-orange-400'
							size={size}
						/>
					) : averageRating >= halfNumber ? (
						<StarHalf
							fill='currentColor'
							className='text-orange-400'
							size={size}
						/>
					) : (
						<StarIcon
							className='text-gray-100'
							size={size}
						/>
					)}
				</span>
			);
		});

		return <div className='flex gap-[2px]'>{rating}</div>;
	}
);
