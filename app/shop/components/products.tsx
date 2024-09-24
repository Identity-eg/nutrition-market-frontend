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
			<div
				className='col-span-2 grid divide-x divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 media-md:col-span-1'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
				}}>
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
