'use client';

import { useDeleteCartItem } from 'apis/cart';
import { X } from 'lucide-react';

export function DeleteCartItemBtn({ itemId }: { itemId: string }) {
	const deleteCartItem = useDeleteCartItem();
	return (
		<div
			onClick={() => {
				deleteCartItem.mutate({ itemId });
			}}
			className='absolute left-0 top-0 flex size-[18px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white'>
			<X size={14} />
		</div>
	);
}
