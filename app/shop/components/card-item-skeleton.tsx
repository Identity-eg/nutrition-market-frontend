import { Skeleton } from 'components/ui/skeleton';

export function CardItemSkeleton() {
	return (
		<div className='animate-pulse rounded-md border border-gray-40 bg-white p-6 media-md:p-4'>
			<Skeleton className='mb-4 h-44 w-full' />
			<Skeleton className='mb-2 h-6 w-[90%]' />
			<Skeleton className='mb-6 h-4 w-[30%]' />
			<Skeleton className='mb-6 h-6 w-[30%]' />
			<Skeleton className='mt-auto h-10 w-full' />
		</div>
	);
}
