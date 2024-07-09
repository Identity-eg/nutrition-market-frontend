import React from 'react';
import ShoppingItem from 'app/shop/components/shoppingItem';
import { TSearchParams } from '../page';

export default async function Products({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	

	return (
		<article className="col-span-2 media-md:col-span-1">
			<ShoppingItem
				name="shopping"
				description="description"
				price={200}
				images={[{ name: 'image', size: 90, url: '' }]}
				numReviews={4}
				_id="dfdddfdf"
			/>
		</article>
	);
}

