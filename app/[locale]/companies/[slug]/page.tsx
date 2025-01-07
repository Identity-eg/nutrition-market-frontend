import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import parse from 'html-react-parser';

import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getSingleCompany } from 'apis/server/company';
import type { TSearchParams } from 'types/searchparams';

type TProps = {
	params: Promise<{ [key: string]: string }>;
	searchParams: Promise<TSearchParams>;
};
export async function generateMetadata({ params }: TProps): Promise<Metadata> {
	const slug = (await params).slug;
	const { company } = await getSingleCompany({ slug });
	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || [];
	return {
		title: company.name,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	};
}

export default async function CompanyPage(props: {
	params: Promise<{ [key: string]: string }>;
	searchParams: Promise<TSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { slug } = params;

	const { company } = await getSingleCompany({ slug });

	const newSearchParams = {
		...searchParams,
		company: slug,
	};

	return (
		<section>
			<div className='h-48'>
				<Image
					alt={`${company.name} cover photo`}
					width={1000}
					height={200}
					src={company.cover?.url ?? ''}
					className='h-full w-full origin-center object-cover object-center bg-blend-overlay'
				/>
			</div>
			<div className='container -mt-8'>
				<div className='flex flex-col gap-2 media-md:flex-row'>
					<Avatar className='size-36 flex-shrink-0 rounded-full border-8 border-white bg-gray-30'>
						<AvatarImage src={company.logo?.url} />
						<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
							<BuildingPlaceholder size={64} />
						</AvatarFallback>
					</Avatar>
					<div className='space-y-1 media-md:mt-10 [&>p]:leading-normal [&>p]:text-gray-200 [&>p]:typography-R14'>
						<div className='capitalize text-black typography-B28'>
							{company.name}
						</div>
						{parse(company.description)}
					</div>
				</div>

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
