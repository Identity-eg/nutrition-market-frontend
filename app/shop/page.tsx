import SortBy from './components/sortBy';
import FilterProducts from './components/filter';
import Products from './components/products';
import { Suspense } from 'react';

export type TSearchParams = { [key: string]: string };

export default function ShopPage({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	return (
		<section className="grid grid-cols-[278px,1fr] gap-x-4 gap-y-8">
			<SortBy />
			<FilterProducts />
			<Suspense fallback={'Loading...'}>
				<Products searchParams={searchParams} />
			</Suspense>
		</section>
	);
}

