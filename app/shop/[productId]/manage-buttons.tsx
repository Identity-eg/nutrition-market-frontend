import { Pencil } from 'lucide-react';

import { getCredential } from 'apis/helpers';
import { DeleteBtn } from 'app/shop/[productId]/delete-btn';
import { Button } from 'components/ui/button';
import type { TReview } from 'types/review';

export async function ManageButtons({
	reviewId,
	user,
}: {
	reviewId: string;
	user: TReview['user'];
}) {
	const credential = await getCredential();
	const isMyReview = credential?.payload._id === user;

	if (!isMyReview) return null;

	return (
		<div className='flex gap-2'>
			<DeleteBtn reviewId={reviewId} />

			<Button variant='secondary-gray'>
				<Pencil
					size={16}
					className='mr-2'
				/>
				Edit
			</Button>
		</div>
	);
}
