import React, { useState } from 'react';
import { StarIcon } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

export default function RatingField({
	onChange,
	value,
}: ControllerRenderProps<any, 'rating'>) {
	return (
		<>
			<div className='flex gap-2 mb-1 text-gray-400'>
				{[...Array(5)].map((star, i) => {
					const ratingValue = i + 1;
					return (
						<div
							onClick={() => onChange(ratingValue)}
							className={
								value && ratingValue <= value
									? 'border-neutral-300 group cursor-pointer rounded-md border p-2'
									: 'border-neutral-300 cursor-pointer rounded-md border p-2'
							}
							//   onMouseEnter={() => setHover(ratingValue)}
							//   onMouseLeave={() => setHover(null)}
						>
							{value && ratingValue <= value ? (
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
			<div className='mb-6 text-sm text-gray-400'>
				{value ? <p>Your rating is {value} star</p> : <p>Click To Rate</p>}
				{/* <span className='text-red-500'>{errors.rating?.message}</span> */}
			</div>
		</>
	);
}
