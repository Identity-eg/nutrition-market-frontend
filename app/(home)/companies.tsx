import Link from 'next/link';
import parse from 'html-react-parser';

import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getPopularCompanies } from 'apis/server/company';
import { RatingStars } from 'components/ui/rating-stars';

export default async function Companies() {
	const { companies } = await getPopularCompanies();
	return (
		<div className='container py-10'>
			<h3 className='mb-6 flex flex-col items-center text-center text-green-800 typography-B18 media-md:flex-row media-md:gap-4'>
				Popular companies{' '}
				<span className='text-gray-100 typography-R14'>
					Featuring companies with the highest-selling products customers trust
					and love.
				</span>
			</h3>
			<div
				className='col-span-2 grid divide-y divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 media-md:col-span-1 media-md:divide-x'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				}}>
				{companies.map(company => (
					<div
						key={company._id}
						className='p-4'>
						<div
							key={company._id}
							className='mb-4 flex items-center gap-4 border-b border-gray-40 pb-4'>
							<Avatar className='size-16 rounded-md'>
								<AvatarImage />
								<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
									<BuildingPlaceholder />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<Link
									href={`/companies/${company.slug}`}
									className='mb-1 typography-SB16 hover:underline'>
									{company.name}{' '}
									<span className='text-gray-200 typography-R16'>
										({company.productsCount})
									</span>
								</Link>
								<RatingStars
									averageRating={4}
									size={14}
								/>
							</div>
						</div>
						<span className='line-clamp-2 text-gray-200 typography-R14'>
							{parse(company.description)}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
