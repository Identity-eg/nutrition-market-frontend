import { Pill } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

import { convertToReadableNumber } from 'lib/utils';

import type { TCartItem } from 'features/cart/types/cart';
import { IncDecBtn } from 'features/cart/components/inc-dec-btn';

import { DeleteCartItemBtn } from 'features/cart/components/delete-cart-item-btn';

export function CartItem({
	amount,
	product,
	_id,
	totalProductPrice,
	variant,
}: TCartItem) {
	const totalPrice = convertToReadableNumber(totalProductPrice);

	return (
		<li
			key={_id}
			className='relative flex gap-4 py-6'
		>
			<div className='self-center'>
				<DeleteCartItemBtn
					className='relative flex-1 translate-x-0 translate-y-0'
					itemId={_id}
				/>
			</div>
			<div className='relative aspect-square size-24 flex-shrink-0 rounded-md bg-gray-30'>
				<Image
					src={variant.images[0].url}
					width={500}
					height={500}
					alt={variant.name}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
			</div>

			<div className='flex w-full flex-col justify-between gap-4'>
				<h3 className='flex justify-between gap-4'>
					<Link
						href={`/shop/${product._id}?variant=${variant._id}`}
						className='mb-2 line-clamp-2 text-green-700 typography-SB16'
					>
						{variant.name}
					</Link>
					<span className='flex items-center justify-start gap-2 self-start rounded-md border border-gray-40 px-2 py-1'>
						{variant.unitCount} <Pill size={16} />
					</span>
				</h3>
				<div className='flex justify-between'>
					<span className='text-green-light-700 typography-SB18'>
						{totalPrice} EGP
					</span>
					<IncDecBtn
						amount={amount}
						itemId={_id}
					/>
				</div>
			</div>
		</li>
	);
}
