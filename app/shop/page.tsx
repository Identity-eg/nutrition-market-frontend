import { Suspense } from 'react';
import SortBy from './components/sortBy';
import FilterProducts from './components/filter';
import Products from './components/products';
import { ProductsLoading } from 'app/shop/products-loading';

export type TSearchParams = { [key: string]: string };

export default function ShopPage({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	return (
		<section className='container grid grid-cols-[278px,1fr] gap-x-6 gap-y-8 py-12'>
			<SortBy />
			<FilterProducts searchParams={searchParams} />
			<Suspense
				key={JSON.stringify(searchParams)}
				fallback={<ProductsLoading />}>
				<Products searchParams={searchParams} />
			</Suspense>
		</section>
	);
}
