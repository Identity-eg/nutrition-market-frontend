import Link from 'next/link';

import { SheetClose } from 'components/ui/sheet';

import Image from 'next/image';
import { TCartItem } from 'types/cart';
import { DeleteCartItemBtn } from './delete-cart-item-btn';
import { IncDecBtn } from 'app/shop/[productId]/components/inc-dec-btn';
import { convertToReadableNumber } from 'lib/utils';

export default function CartSideItem({
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
			<div className='w-20 space-y-2'>
				<div className='relative aspect-square h-auto w-full flex-shrink-0 rounded-md bg-gray-30'>
					<Image
						src={selectedVariant.images[0].url}
						width={500}
						height={500}
						alt={selectedVariant.name}
						className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
					/>
					<DeleteCartItemBtn itemId={_id} />
				</div>
				<IncDecBtn amount={amount} />
			</div>

			<div className='flex w-full flex-col justify-between'>
				<h3>
					<SheetClose asChild>
						<Link
							href={`/shop/${product._id}?variant=${selectedVariant._id}`}
							className='line-clamp-2 text-green-700 typography-M16'>
							{selectedVariant.name}
						</Link>
					</SheetClose>
				</h3>
				<span className='self-end'>{totalPrice} EGP</span>
			</div>
		</li>
	);
}
