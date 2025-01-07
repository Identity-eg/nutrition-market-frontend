import Link from 'next/link';
import Image from 'next/image';

import { SheetClose } from 'components/ui/sheet';

import { DeleteCartItemBtn } from 'features/cart/components/delete-cart-item-btn';
import { IncDecBtn } from 'features/cart/components/inc-dec-btn';

import type { TCartItem } from 'features/cart/types/cart';
import { Price } from 'components/utils/price';
import { TicketIcon } from 'lucide-react';

export function CartSideItem({
	amount,
	product,
	_id,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
}: TCartItem) {
	return (
		<li
			key={_id}
			className='flex gap-4 py-6'>
			<div className='w-24 space-y-2'>
				<div className='relative aspect-square h-auto w-full flex-shrink-0 rounded-md bg-gray-30'>
					<Image
						src={variant.images[0]?.url}
						width={70}
						height={70}
						alt={variant.name}
						className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
					/>
					<DeleteCartItemBtn itemId={_id} />
				</div>
				<IncDecBtn
					amount={amount}
					itemId={_id}
				/>
			</div>

			<div className='flex w-full flex-col justify-between'>
				<h3 className='flex justify-between'>
					<SheetClose asChild>
						<Link
							href={`/shop/${product.slug}?variant=${variant._id}`}
							className='line-clamp-2 text-green-700 typography-M16'>
							{variant.name}
						</Link>
					</SheetClose>
					{totalProductPriceAfterCoupon && (
						<div className='flex aspect-square size-6 items-center justify-center rounded-full bg-green-light-600'>
							<TicketIcon
								size={16}
								className='text-white'
							/>
						</div>
					)}
				</h3>
				<Price
					finalPriceClassName='typography-M16 text-gray-400'
					previousPriceClassName='typography-R14 text-gray-400'
					className='ms-auto'
					price={totalProductPrice}
					priceAfterDiscount={totalProductPriceAfterCoupon}
				/>
			</div>
		</li>
	);
}
