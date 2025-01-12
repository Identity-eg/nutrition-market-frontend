'use client';

import React from 'react';
import { cn } from 'lib/utils';
import { X } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { LoadingDots } from 'components/utils/loading-dots';
import { deleteItemFromCart } from 'features/cart/apis/cart';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	itemId: string;
}

export const DeleteCartItemBtn = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(({ className, itemId, ...props }, ref) => {
	const { execute: deleteCartItem, isPending } = useAction(deleteItemFromCart);
	return (
		<button
			{...props}
			ref={ref}
			onClick={() => {
				deleteCartItem({ itemId });
			}}
			className={cn(
				'absolute end-0 top-0 flex size-[20px] -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white',
				className
			)}>
			{isPending ? <LoadingDots className='[&>*]:bg-white' /> : <X size={14} />}
		</button>
	);
});
DeleteCartItemBtn.displayName = 'DeleteCartItemBtn';
