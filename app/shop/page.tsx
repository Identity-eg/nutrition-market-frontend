import { Suspense } from 'react';
import SortBy from './components/sortBy';
import FilterProducts from './components/filter';
import Products from './components/products';
import { ProductsLoading } from 'app/shop/products-loading';
import adPhoto from 'assets/ad.png';
import Image from 'next/image';

export type TSearchParams = { [key: string]: string };

export default function ShopPage({
	searchParams,
}: {
	searchParams: TSearchParams;
}) {
	return (
		<section className='container h-full grid-cols-[278px,1fr] gap-x-6 gap-y-8 py-12 media-md:grid'>
			<FilterProducts />
			<div>
				<div className='mb-4 flex min-h-56 flex-col items-center justify-between gap-6 rounded-md bg-[#d9f3fa] p-6 pr-10 media-sm:flex-row'>
					<div>
						<span className='mb-2 inline-block rounded-md bg-gray-500 px-2 py-1 text-white typography-R12'>
							Sale up to 50%
						</span>
						<div className='text-balance leading-tight tracking-tight text-gray-500 typo-SB-[24-32]'>
							Shop the vitamins and <br /> supplements
						</div>
						<span className='text-gray-200 typography-R14'>
							We have prepared special discounts for you on grocery products...
						</span>
					</div>
					<div>
						<Image
							width={225}
							height={225}
							alt=''
							className='w-full min-w-[200px] max-w-[150px] brightness-110 media-md:max-w-[225px]'
							src={adPhoto}
						/>
					</div>
				</div>
				<SortBy />
				<Suspense
					key={JSON.stringify(searchParams)}
					fallback={<ProductsLoading />}>
					<Products searchParams={searchParams} />
				</Suspense>
			</div>
		</section>
	);
}
