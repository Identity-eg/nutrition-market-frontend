'use client';

import { decreaseItemByOne, increaseItemByOne } from 'apis/server/cart';
import { useToast } from 'components/ui/use-toast';
import { useAction } from 'next-safe-action/hooks';

export function IncDecBtn({
	amount,
	itemId,
}: {
	amount: number;
	itemId: string;
}) {
	const { toast } = useToast();
	const { execute: increaseItemByOneAction } = useAction(increaseItemByOne, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});
	const { execute: decreaseItemByOneAction } = useAction(decreaseItemByOne);

	return (
		<div className='flex max-w-[107px] flex-1 items-center justify-between rounded-md border border-gray-40'>
			<button
				onClick={() => {
					if (amount === 1) return;
					decreaseItemByOneAction({ itemId });
				}}
				className='cursor-pointer px-2'>
				-
			</button>

			<h3>{amount}</h3>
			<button
				onClick={() => increaseItemByOneAction({ itemId })}
				className='cursor-pointer px-2 text-green-light-700'>
				+
			</button>
		</div>
	);
}
