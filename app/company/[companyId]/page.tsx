import { RatingStars } from 'app/shop/[productId]/components/rating-stars';
import parse from 'html-react-parser';
import FilterProducts from './filter';
import Products from 'app/shop/components/products';
import { ProductsLoading } from 'app/shop/products-loading';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Suspense } from 'react';
import { getSingleCompany } from 'apis/server/company';
import { CircleCheckIcon } from 'lucide-react';
import { Separator } from 'components/ui/separator';

export default async function CompanyPage({
	params,
	searchParams,
}: {
	params: { [key: string]: string };
	searchParams: { [key: string]: string };
}) {
	const { companyId } = params;
	const company = await getSingleCompany({ companyId });

	const newSearchParams = {
		...searchParams,
		company: companyId,
	};
	return (
		<section>
			<div className='h-48 w-full bg-gray-30' />
			<div className='container -mt-8'>
				<div className='flex gap-4'>
					<Avatar className='size-36 flex-shrink-0 rounded-full border-8 border-white bg-gray-30'>
						<AvatarImage />
						<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
							<BuildingPlaceholder size={64} />
						</AvatarFallback>
					</Avatar>
					<div className='mt-10 [&>p]:typography-R14 [&>p]:leading-normal'>
						<div className='mb-1 capitalize text-black typography-B28'>
							{company.name}
						</div>
						<div className='mb-3 flex items-center gap-4'>
							<RatingStars averageRating={2} />
							<Separator
								orientation='vertical'
								className='h-4'
							/>
							<span className='flex items-center gap-1 text-gray-200 typography-R14'>
								<CircleCheckIcon
									size={18}
									className='text-white'
									fill='#76828d'
								/>
								150 orders in last week
							</span>
						</div>
						{/* <span className='text-green-150 leading-snug typography-R14'> */}
						{parse(company.description)}
						{/* </span> */}
					</div>
				</div>

				<div className='grid media-md:grid-cols-[278px,1fr] gap-x-6 gap-y-8 py-12'>
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
