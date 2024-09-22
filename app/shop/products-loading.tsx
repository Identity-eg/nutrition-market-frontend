import { CardItemSkeleton } from './components/card-item-skeleton';

export function ProductsLoading() {
	return (
		<div
			className='col-span-2 grid gap-4 self-baseline media-md:col-span-1'
			style={{
				gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
			}}>
			{Array.from({ length: 6 }, el => (
				<CardItemSkeleton />
			))}
		</div>
	);
}
