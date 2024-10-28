import { getCompanies } from 'apis/server/company';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import Link from 'next/link';

export default async function Companies() {
	const { companies } = await getCompanies();
	return (
		<div className='container py-10'>
			<h3 className='mb-6 flex flex-col items-center text-center text-green-800 typography-B18 media-md:flex-row media-md:gap-4'>
				Popular companies{' '}
				<span className='text-gray-100 typography-R14'>
					Shop the store by company
				</span>
			</h3>
			<div
				className='col-span-2 grid divide-x divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 media-md:col-span-1'
				style={{
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				}}>
				{companies.map(company => (
					<div
						key={company._id}
						className='flex items-center gap-4 p-4'>
						<Avatar className='size-16 rounded-md'>
							<AvatarImage />
							<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
								<BuildingPlaceholder />
							</AvatarFallback>
						</Avatar>
						<div className='flex flex-col'>
							<Link
								href={`/company/${company._id}`}
								className='typography-SB16 hover:underline'>
								{company.name}
							</Link>
							<span className='line-clamp-1 text-gray-200 typography-R14'>
								{company.description}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
