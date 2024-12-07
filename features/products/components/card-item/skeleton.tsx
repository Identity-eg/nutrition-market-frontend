import { Skeleton } from 'components/ui/skeleton';

export function CardItemSkeleton() {
	return (
		<div className='flex h-[328px] animate-pulse flex-col rounded-md border border-gray-40 bg-white p-6 media-md:p-4'>
			<Skeleton className='mb-4 h-[192px] w-full' />
			<Skeleton className='mb-4 h-4 w-[50%]' />
			<Skeleton className='h-4 w-[80%]' />
			<Skeleton className='mt-auto h-4 w-[30%]' />
		</div>
	);
}
