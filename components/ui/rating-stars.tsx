import { StarHalf, StarIcon } from 'lucide-react';

export type SpanProps = React.ComponentProps<'span'> & {
	averageRating: number;
	size?: number;
};

export const RatingStars = ({
	size = 16,
	averageRating,
	className,
	...props
}: SpanProps) => {
	const rating = Array.from({ length: 5 }, (_, i) => {
		const halfNumber = i + 0.5;
		return (
			<span
				className={className}
				key={i}
				{...props}>
				{averageRating >= i + 1 ? (
					<StarIcon
						fill='currentColor'
						className='text-orange-400'
						size={size}
					/>
				) : averageRating >= halfNumber ? (
					<div className='relative'>
						<StarHalf
							fill='currentColor'
							className='text-orange-400'
							size={size}
						/>
						<StarHalf
							className='absolute inset-0 -scale-x-100 text-orange-400'
							size={size}
						/>
					</div>
				) : (
					<StarIcon
						className='text-gray-80'
						size={size}
					/>
				)}
			</span>
		);
	});

	return <div className='flex gap-[2px]'>{rating}</div>;
};
