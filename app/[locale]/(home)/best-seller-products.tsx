import { getProducts } from 'features/products/apis';
import { CardItem } from 'features/products/components/card-item';
import SectionWrapper from './section-wrapper';

export default async function BestSellerProducts() {
	const products = await getProducts({
		sort: '-sold',
		limit: '5',
	});
	return (
		<SectionWrapper
			title='Best Seller'
			description='Shop our top-rated and most-loved products, handpicked by our
						customers.'
			href='/shop?sort=-sold'>
			<div className='grid grid-cols-2 gap-2 self-baseline overflow-hidden media-sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] media-sm:gap-4'>
				{products.products.map(product => (
					<CardItem
						key={product._id}
						{...product}
					/>
				))}
			</div>
		</SectionWrapper>
	);
}
