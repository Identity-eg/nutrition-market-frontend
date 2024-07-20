import Link from 'next/link';
import React from 'react';
import CardItem from './card-item';
import { getSimilarProducts } from 'apis/server/products';

export default async function SimilarProducts({
	productId,
}: {
	productId: string;
}) {
	const { products } = await getSimilarProducts({ productId });

	return (
		<div>
			<div className="mb-6 flex items-center justify-between">
				<h3 className="typography-M16">Related products</h3>
				<Link
					className="typography-R14 hover:underline"
					href="/shop">
					See all
				</Link>
			</div>
			<div className="mb-10 flex items-center gap-4">
				{products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
		</div>
	);
}
