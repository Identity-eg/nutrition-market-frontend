'use client';

import React from 'react';
import { useDeleteCartItem } from 'apis/cart';
import { cn } from 'lib/utils';
import { X } from 'lucide-react';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	itemId: string;
}

export const DeleteCartItemBtn = React.forwardRef<
	HTMLButtonElement,
	ButtonProps
>(({ className, itemId, ...props }, ref) => {
	const deleteCartItem = useDeleteCartItem();
	return (
		<button
			{...props}
			ref={ref}
			onClick={() => {
				deleteCartItem.mutate({ itemId });
			}}
			className={cn(
				'absolute right-0 top-0 flex size-[18px] translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white',
				className
			)}>
			<X size={14} />
		</button>
	);
});
DeleteCartItemBtn.displayName = 'DeleteCartItemBtn';
