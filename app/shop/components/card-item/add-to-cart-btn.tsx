'use client';

import { addItemToCart } from 'apis/server/cart';
import { useEffect, useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { Button } from 'components/ui/button';
import { Check, Circle } from 'lucide-react';
import { useToast } from 'components/ui/use-toast';

const AddToCartButton = ({
	resetCount,
	productId,
	variantId,
	amount = 1,
}: {
	resetCount?: () => void;
	productId: string;
	variantId?: string;
	amount?: number;
}) => {
	const { toast } = useToast();
	const [isAddedEnd, setIsAddedEnd] = useState(false);
	const { execute, isPending, hasSucceeded, result } = useAction(
		addItemToCart,
		{
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
		}
	);

	useEffect(() => {
		setIsAddedEnd(false);
		if (hasSucceeded) {
			const id = setTimeout(() => setIsAddedEnd(true), 2000);

			return () => {
				clearTimeout(id);
			};
		}
	}, [hasSucceeded]);

	return (
		<Button
			onClick={() => {
				if (isPending) return;
				execute({ amount, productId, variantId: variantId ?? '' });
			}}
			type='submit'
			className='relative flex items-center justify-center flex-1 w-full capitalize'>
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
