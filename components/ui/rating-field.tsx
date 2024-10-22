import { StarIcon } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { cn } from 'lib/utils';

export function RatingField({
	onChange,
	value,
}: ControllerRenderProps<{ [key: string]: string | number }, 'rating'>) {
	return (
		<>
			<div className='mb-1 flex gap-2 text-gray-40'>
				{[...Array(5)].map((_, i) => {
					const ratingValue = i + 1;
					return (
						<div
							key={i}
							onClick={() => onChange(ratingValue)}
							className={cn(
								'cursor-pointer rounded-md border border-gray-50 p-2',
								value && ratingValue <= +value && 'group'
							)}>
							{value && ratingValue <= +value ? (
								<StarIcon
									fill='currentColor'
									className='text-orange-400'
									size={24}
								/>
							) : (
								<StarIcon
									className='text-gray-100'
									size={24}
								/>
							)}
						</div>
					);
				})}
			</div>
			<div className='mb-6 text-gray-400 typography-R12'>
				{value ? <p>Your rating is {value} star</p> : <p>Click To Rate</p>}
			</div>
		</>
	);
}
