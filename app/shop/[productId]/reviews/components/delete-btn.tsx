'use client';

import { useDeleteReview } from 'apis/reviews';
import { Button } from 'components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export default function DeleteBtn({ reviewId }: { reviewId: string }) {
	const [isPending, startTransition] = useTransition();
	const deleteReview = useDeleteReview();
	return (
		<Button
			data-state={isPending && 'deleting'}
			variant='secondary-white'
			className='text-red-300 hover:bg-red-30'
			onClick={() => {
				startTransition(() => {
					deleteReview.mutate({ reviewId });
				});
			}}>
			<Trash2
				size={16}
				className='mr-2'
			/>
			{isPending ? 'Deleting...' : 'Delete'}
		</Button>
	);
}
