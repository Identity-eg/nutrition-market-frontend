import qs from 'qs';
import React from 'react';
import { getProducts, TParams } from 'apis/server/products';
import { TSearchParams } from '../page';
import CardItem from '../[productId]/card-item';

export default async function Products({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	const queryParams = qs.parse(searchParams) as TParams;
	const { products } = await getProducts(queryParams);

	return (
		<article
			style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}
			className="col-span-2 grid gap-4 self-baseline media-md:col-span-1">
			{products.map(product => (
				<CardItem
					key={product._id}
					{...product}
				/>
			))}
		</article>
	);
}
