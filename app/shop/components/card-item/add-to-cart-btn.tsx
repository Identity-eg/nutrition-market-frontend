'use client';

import { addItemToCart } from 'apis/server/cart';
import { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button } from 'components/ui/button';
import { Check, Circle, CircleX } from 'lucide-react';
import { useToast } from 'components/ui/use-toast';

const AddToCartButton = ({
	quantity,
	resetCount,
	productId,
	variantId,
	amount = 1,
}: {
	quantity: number;
	resetCount?: () => void;
	productId: string;
	variantId?: string;
	amount?: number;
}) => {
	const { toast } = useToast();
	const [isAddedEnd, setIsAddedEnd] = useState(false);
	const { execute, isPending, hasSucceeded } = useAction(addItemToCart, {
		onSuccess: () => {
			resetCount?.();
		},
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});

	useEffect(() => {
		setIsAddedEnd(false);
		if (hasSucceeded) {
			const id = setTimeout(() => setIsAddedEnd(true), 2000);

			return () => {
				clearTimeout(id);
			};
		}
	}, [hasSucceeded]);

	if (quantity === 0) {
		return (
			<Button
				disabled
				variant='secondary-gray'
				className='relative flex w-full flex-1 items-center justify-center gap-2 capitalize text-red-500'>
				<CircleX size={16} />
				Out of stock
			</Button>
		);
	}

	return (
		<Button
			onClick={() => {
				if (isPending) return;
				execute({ amount, productId, variantId: variantId ?? '' });
			}}
			type='submit'
			className='relative flex w-full flex-1 items-center justify-center capitalize'>
			{isPending ? (
				<Circle
					size={10}
					fill='white'
					className='animate-bounced'
				/>
			) : hasSucceeded && !isAddedEnd ? (
				<Check
					size={20}
					className='absolute'
				/>
			) : (
				<span>add to cart</span>
			)}
		</Button>
	);
};

export default AddToCartButton;
