import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import parse from 'htms-react-parser';

import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import { getSingleCategory } from 'apis/server/category';
import type { TSearchParams } from 'types/searchparams';

type TProps = {
	params: Promise<{ [key: string]: string }>;
	searchParams: Promise<TSearchParams>;
};
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	const slug = (await params).slug;
	const { category } = await getSingleCategory({ slug });
	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];
	return {
		title: category.name,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	};
}

export default async function CategoryPage(props: TProps) {
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
				<div className='absolute inset-0 z-[2] bg-gradient-to-r from-[#00000023] from-10% via-[#01210c96] via-30% to-[#00000023] to-90% bg-blend-multiply mix-blend-multiply' />
				<div className='z-[4] text-center text-white [&>p]:leading-normal [&>p]:text-gray-200 [&>p]:typography-R14'>
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
