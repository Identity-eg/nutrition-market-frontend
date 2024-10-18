import qs from 'qs';
import React from 'react';
import { getProducts, TParams } from 'apis/server/products';
import { TSearchParams } from '../page';
import CardItem from './card-item';
import { PaginationContainer } from './pagination-container';

export default async function Products({
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
				<PaginationContainer
					lastPage={lastPage}
					currentPage={currentPage}
				/>
			)}
		</article>
	);
}
