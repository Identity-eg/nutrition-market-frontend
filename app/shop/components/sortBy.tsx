'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select';
import { SORT_OPTIONS } from 'constants/index';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SortBy() {
	const router = useRouter();
	const searchParams = new URLSearchParams(useSearchParams());
	const facet = searchParams.get('sort') ?? '';

	return (
		<article className='col-span-2 flex w-auto justify-between gap-x-4 media-sm:justify-self-end'>
			<div className='flex items-center justify-center gap-x-4'>
				<span className={'capitalize text-gray-100 typography-M13'}>
					sort by :
				</span>
				<Select
					value={facet}
					onValueChange={v => {
						searchParams.set('sort', v);
						router.push(`?${searchParams.toString()}`);
					}}>
					<SelectTrigger className='w-48'>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent>
						{SORT_OPTIONS.map(option => (
							<SelectItem
								key={option.value}
								value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</article>
	);
}
