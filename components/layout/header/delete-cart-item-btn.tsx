'use client';

import React from 'react';
import { useDeleteCartItem } from 'apis/cart';
import { cn } from 'lib/utils';
import { X } from 'lucide-react';
import { deleteItemFromCart } from 'apis/server/cart';
import { useAction } from 'next-safe-action/hooks';
import { LoadingDots } from 'app/shop/[productId]/components/inc-dec-btn/loading-dots';

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
				'absolute right-0 top-0 flex size-[20px] -translate-y-1/2 translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white',
				className
			)}>
			{isPending ? <LoadingDots className='[&>*]:bg-white' /> : <X size={14} />}
		</button>
	);
});
DeleteCartItemBtn.displayName = 'DeleteCartItemBtn';
