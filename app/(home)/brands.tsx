import Link from 'next/link';
import parse from 'html-react-parser';

import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { getPopularCompanies } from 'apis/server/company';
import SectionWrapper from './section-wrapper';

export default async function Brands() {
	const { companies } = await getPopularCompanies({ limit: 5 });
	return (
		<SectionWrapper
			title='Popular brands'
			description='Featuring brands with the highest-selling products customers trust
						and love.'
			href='/companies'>
			<div
				className='grid gap-4 divide-y divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 px-4 media-md:divide-none'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
				}}>
				{companies.map(company => (
					<div
						key={company._id}
						className='flex gap-4 py-4'>
						<Avatar className='size-20 rounded-md'>
							<AvatarImage src={company.logo?.url} />
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
							<span className='line-clamp-2 text-gray-200 typography-R14'>
								{parse(company.description)}
							</span>
						</div>
					</div>
				))}
			</div>
		</SectionWrapper>
	);
}
