import { Pencil } from 'lucide-react';

import DeleteBtn from './delete-btn';
import { Button } from 'components/ui/button';

export default async function ActionBtns({ reviewId }: { reviewId: string }) {
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
