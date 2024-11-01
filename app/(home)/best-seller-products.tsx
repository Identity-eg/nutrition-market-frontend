import { Button } from 'components/ui/button';
import { getProducts } from 'features/products/api/products';
import { CardItem } from 'features/products/components/card-item';
import { MoveRightIcon } from 'lucide-react';
import Link from 'next/link';

export default async function BestSellerProducts() {
	const products = await getProducts({
		sort: '-sold',
		limit: '5',
	});
	return (
		<div className='container py-10'>
			<div className='flex items-start justify-between'>
				<h3 className='mb-6 flex flex-col items-center text-center text-green-800 typography-B18 media-md:flex-row media-md:gap-4'>
					Best Seller{' '}
					<span className='text-gray-100 typography-R14'>
						Do not miss the current offers until the end of month.
					</span>
				</h3>
				<Button
					className='hidden gap-2 media-md:flex'
					variant='link'
					asChild>
					<Link href='/shop'>
						View All <MoveRightIcon size={16} />
					</Link>
				</Button>
			</div>
			<div className='grid grid-cols-2 gap-2 self-baseline overflow-hidden media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4'>
				{products.products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
		</div>
	);
}
