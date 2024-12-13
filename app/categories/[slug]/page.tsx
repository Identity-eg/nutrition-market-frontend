import { Suspense } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';

import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import { getSingleCategory } from 'apis/server/category';
import type { TSearchParams } from 'types/searchparams';

export default async function CategoryPage(props: {
	params: Promise<{ [key: string]: string }>;
	searchParams: Promise<TSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { slug } = params;

	const { category } = await getSingleCategory({ slug });

	const newSearchParams = {
		...searchParams,
		category: slug,
	};
	return (
		<section>
			<div className='relative flex h-48 w-full items-center justify-center bg-gray-30'>
				<div className='absolute inset-0 z-30 bg-gradient-to-r from-[#00000023] from-10% via-[#01210c96] via-30% to-[#00000023] to-90% bg-blend-multiply mix-blend-multiply' />
				<div className='z-40 text-center text-white [&>p]:leading-normal [&>p]:text-gray-200 [&>p]:typography-R14'>
					<h3 className='mb-1 capitalize typography-B28'>{category.name}</h3>
					<span className='text-white'>{parse(category.description)}</span>
				</div>
				<Image
					alt={`${category.name} cover photo`}
					width={1000}
					height={200}
					src={category.cover?.url}
					className='absolute inset-0 h-full w-full origin-center object-cover object-center bg-blend-overlay'
				/>
			</div>
			<div className='container -mt-8'>
				<div className='grid gap-x-6 gap-y-8 py-12 media-md:grid-cols-[278px,1fr]'>
					<FilterProducts />
					<Suspense
						key={JSON.stringify(newSearchParams)}
						fallback={<ProductsLoading />}>
						<Products searchParams={newSearchParams} />
					</Suspense>
				</div>
			</div>
		</section>
	);
}
