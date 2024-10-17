'use client';

import { decreaseItemByOne, increaseItemByOne } from 'apis/server/cart';
import { useToast } from 'components/ui/use-toast';
import { useAction } from 'next-safe-action/hooks';
import { LoadingDots } from './loading-dots';

export function IncDecBtn({
	amount,
	itemId,
}: {
	amount: number;
	itemId: string;
}) {
	const { toast } = useToast();
	const { execute: increaseItemByOneAction, isPending: isIncreasePending } =
		useAction(increaseItemByOne, {
			onError: ({ error }) => {
				toast({
					variant: 'destructive',
					title: 'Server Error',
					description: error.serverError,
				});
			},
		});
	const { execute: decreaseItemByOneAction, isPending: isDecreasePending } =
		useAction(decreaseItemByOne);

	return (
		<div className='flex max-w-[107px] flex-1 items-center justify-between rounded-md border border-gray-40'>
			<button
				onClick={() => {
					if (isIncreasePending || isDecreasePending) return;
					if (amount === 1) return;
					decreaseItemByOneAction({ itemId });
				}}
				className='cursor-pointer px-2'>
				-
			</button>

			<h3>
				{isIncreasePending || isDecreasePending ? <LoadingDots /> : amount}
			</h3>
			<button
				onClick={() => {
					if (isIncreasePending || isDecreasePending) return;
					increaseItemByOneAction({ itemId });
				}}
				className='cursor-pointer px-2 text-green-light-700'>
				+
			</button>
		</div>
	);
}
