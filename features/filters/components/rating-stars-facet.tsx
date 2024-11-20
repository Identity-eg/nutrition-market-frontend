'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { RatingStars } from 'components/ui/rating-stars';

export function RatingStarsFacet() {
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());

	const facetValue = searchParams.get('averageRating');

	return (
		<div className='space-y-4'>
			<RadioGroup
				className='space-y-1'
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				value={facetValue}
				onValueChange={val => {
					searchParams.set('averageRating', val);
					searchParams.set('page', '1');
					router.push(`?${searchParams.toString()}`);
				}}>
				{Array.from({ length: 5 }, (_, idx) => idx + 1)
					.reverse()
					.map(el => (
						<div
							key={el}
							className='flex items-center gap-x-4'>
							<RadioGroupItem
								value={el.toString()}
								id={el.toString()}
							/>
							<Label
								htmlFor={el.toString()}
								className='flex items-center gap-x-2'>
								<RatingStars
									averageRating={el}
									size={20}
								/>
							</Label>
						</div>
					))}
			</RadioGroup>
			{facetValue && (
				<Button
					variant='secondary-destructive'
					size='sm'
					className='w-full text-xs text-red-500'
					onClick={() => {
						searchParams.delete('averageRating');
						router.push(`?${searchParams.toString()}`);
					}}>
					Clear
				</Button>
			)}
		</div>
	);
}
