import { useQuery } from '@tanstack/react-query';
import { getCategories } from 'apis/server/category';
import { Button } from 'components/ui/button';
import { Skeleton } from 'components/ui/skeleton';
import Link from 'next/link';

export function TrendingCategory() {
	const { data, isPending } = useQuery({
		queryKey: ['catgeories'],
		queryFn: () => getCategories(),
		placeholderData: previousData => previousData,
	});

	return (
		<div className='bg-white p-4'>
			<h6 className='mb-4 text-gray-200 typography-SB13'>Trending</h6>
			{isPending ? (
				<div className='flex flex-wrap items-center gap-2'>
					{[40, 20, 25, 15, 22.5, 19].map(el => (
						<Skeleton
							key={el}
							style={{ width: 110 + el }}
							className='h-10'
						/>
					))}
				</div>
			) : (
				<div className='flex flex-wrap items-center gap-2'>
					{data?.categories?.map(cat => (
						<Button
							key={cat._id}
							asChild
							variant='outline'
							className='rounded-md border border-gray-40 px-4 py-1 text-gray-500'
						>
							<Link href={`/shop?category=${cat._id}`}>{cat.name}</Link>
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
