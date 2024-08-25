import Link from 'next/link';

import Image from 'next/image';
import { TCartItem } from 'types/cart';
import { IncDecBtn } from 'app/shop/[productId]/components/inc-dec-btn';
import { convertToReadableNumber } from 'lib/utils';
import { Pill } from 'lucide-react';
import { DeleteCartItemBtn } from 'components/layout/header/delete-cart-item-btn';

export function CartItem({
	amount,
	product,
	_id,
	totalProductPrice,
	selectedVariant,
}: TCartItem) {
	const totalPrice = convertToReadableNumber(totalProductPrice);

	return (
		<li
			key={_id}
			className='relative flex gap-4 py-6'>
			<div className='self-center'>
				<DeleteCartItemBtn
					className='relative flex-1 translate-x-0 translate-y-0'
					itemId={_id}
				/>
			</div>
			<div className='relative flex-shrink-0 rounded-md aspect-square size-24 bg-gray-30'>
				<Image
					src={selectedVariant.images[0].url}
					width={500}
					height={500}
					alt={selectedVariant.name}
					className='object-contain object-center w-full h-full p-2 mix-blend-multiply'
				/>
			</div>

			<div className='flex flex-col justify-between w-full gap-4'>
				<h3 className='flex justify-between gap-4'>
					<Link
						href={`/shop/${product._id}?variant=${selectedVariant._id}`}
						className='mb-2 text-green-700 line-clamp-2 typography-SB18'>
						{selectedVariant.name}
					</Link>
					<span className='flex items-center self-start justify-start gap-2 px-2 py-1 border rounded-md border-gray-40'>
						{selectedVariant.unitCount} <Pill size={16} />
					</span>
				</h3>
				<div className='flex justify-between'>
					<span className='text-green-light-700 typography-SB18'>
						{totalPrice} EGP
					</span>
					<IncDecBtn amount={amount} itemId={_id} />
				</div>
			</div>
		</li>
	);
}
