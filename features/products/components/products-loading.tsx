import { CardItemSkeleton } from 'features/products/components/card-item/skeleton';

export function ProductsLoading({ number = 6 }: { number?: number }) {
	return (
		<div
			className='col-span-2 grid h-[350px] gap-4 self-baseline media-md:col-span-1'
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
			}}>
			{Array.from({ length: number }).map((el, i) => (
				<CardItemSkeleton key={i} />
			))}
		</div>
	);
}
