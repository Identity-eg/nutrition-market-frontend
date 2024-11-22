import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { CircleCheckIcon } from 'lucide-react';
import parse from 'html-react-parser';

import { RatingStars } from 'components/ui/rating-stars';
import FilterProducts from './filter';
import { Products } from 'features/products/components';
import { ProductsLoading } from 'features/products/components/products-loading';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getSingleCompany } from 'apis/server/company';
import { Separator } from 'components/ui/separator';
import type { TSearchParams } from 'types/searchparams';

export default async function CompanyPage(props: {
	params: Promise<{ [key: string]: string }>;
	searchParams: Promise<TSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { slug } = params;

	const company = await getSingleCompany({ slug });

	const newSearchParams = {
		...searchParams,
		company: slug,
	};
	return (
		<section>
			<div className='h-48 w-full bg-gray-30' />
			<div className='container -mt-8'>
				<div className='flex flex-col gap-2 media-md:flex-row'>
					<Avatar className='size-36 flex-shrink-0 rounded-full border-8 border-white bg-gray-30'>
						<AvatarImage />
						<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
							<BuildingPlaceholder size={64} />
						</AvatarFallback>
					</Avatar>
					<div className='media-md:mt-10 [&>p]:leading-normal [&>p]:typography-R14'>
						<div className='mb-1 capitalize text-black typography-B28'>
							{company.name}
						</div>
						<div className='mb-3 flex flex-row items-center gap-4'>
							<RatingStars averageRating={2} />
							<Separator
								orientation='vertical'
								className='h-4'
							/>
							<span className='flex gap-1 text-gray-200 typography-R14'>
								<CircleCheckIcon
									size={18}
									className='flex-shrink-0 text-white'
									fill='#76828d'
								/>
								150 orders in last week
							</span>
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
