import React, { Suspense } from 'react';
import qs from 'qs';

import { getProducts, TParams } from 'features/products/api/products';
import { CardItem } from 'features/products/components/card-item';
import { PaginationContainer } from 'features/products/components/pagination-container';

import type { TSearchParams } from 'types/searchparams';

export async function Products({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const queryParams = qs.parse(searchParams) as TParams;
	const { products, lastPage, currentPage } = await getProducts(queryParams);
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
