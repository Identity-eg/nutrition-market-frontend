import { Suspense } from 'react';
import qs from 'qs';

import { getProducts } from 'features/products/apis';
import { CardItem } from 'features/products/components/card-item';
import { PaginationContainer } from 'features/products/components/pagination-container';

import NoResultFound from 'assets/icons/no-result-found';
import type { TParams, TSearchParams } from 'types/searchparams';

export async function Products({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const queryParams = qs.parse(searchParams) as TParams;
	const { products, lastPage, currentPage } = await getProducts(queryParams);

	if (!products.length) {
		return (
			<div className='flex flex-col items-center justify-center pt-6'>
				<NoResultFound />
				<span className='mt-4 text-center typography-M16'>
					No Matches Found
				</span>
				<span className='mt-2 max-w-[43ch] text-center text-gray-200 typography-R14'>
					We couldn&apos;t find any supplement that match your filters Try
					adjusting your search criteria
				</span>
			</div>
		);
	}

	return (
		<article>
			<div className='grid grid-cols-2 gap-2 self-baseline overflow-hidden media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4'>
				{products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
			{lastPage > 1 && (
				<Suspense>
					<PaginationContainer
						lastPage={lastPage}
						currentPage={currentPage}
					/>
				</Suspense>
			)}
		</article>
	);
}
