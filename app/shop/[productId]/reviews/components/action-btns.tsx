import { Pencil } from 'lucide-react';

import DeleteBtn from './delete-btn';
import { Button } from 'components/ui/button';

export default function ActionBtns({
	reviewId,
	openEditingMode,
}: {
	reviewId: string;
	openEditingMode: () => void;
}) {
	return (
		<div className='flex gap-2'>
			<DeleteBtn reviewId={reviewId} />

			<Button
				onClick={openEditingMode}
				size={'icon'}
				variant='secondary-gray'>
				<Pencil size={16} />
			</Button>
		</div>
	);
}
