import { CardItemSkeleton } from 'features/products/components/card-item/skeleton';

export function ProductsLoading() {
	return (
		<div
			className='col-span-2 grid gap-4 self-baseline media-md:col-span-1'
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			}}>
			{[0, 0, 0, 0, 0, 0].map((el, i) => (
				<CardItemSkeleton key={i} />
			))}
		</div>
	);
}
