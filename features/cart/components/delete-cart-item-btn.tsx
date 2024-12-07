'use client';

import React from 'react';
import { cn } from 'lib/utils';
import { X } from 'lucide-react';
import { useAction } from 'next-safe-action/hooks';
import { LoadingDots } from 'components/utils/loading-dots';
import { deleteItemFromCart } from 'features/cart/apis/cart';

export type ButtonProps = React.ComponentProps<'button'> & {
	itemId: string;
};

export const DeleteCartItemBtn = ({
	className,
	itemId,
	...props
}: ButtonProps) => {
	const { execute: deleteCartItem, isPending } = useAction(deleteItemFromCart);
	return (
		<button
			{...props}
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
};
