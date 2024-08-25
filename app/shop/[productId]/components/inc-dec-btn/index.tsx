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
	const { execute: decreaseItemByOneAction, result } =
		useAction(decreaseItemByOne);

	console.log({ result });

	return (
		<div className='flex max-w-[107px] flex-grow items-center justify-center gap-6 rounded-md border border-gray-40 px-4'>
			<button
				onClick={() => {
					if (amount === 1) return;
					decreaseItemByOneAction({ itemId });
				}}
				className='cursor-pointer'>
				-
			</button>

			<h3>{amount}</h3>
			<button
				onClick={() => increaseItemByOneAction({ itemId })}
				className='cursor-pointer text-green-light-700'>
				+
			</button>
		</div>
	);
}
