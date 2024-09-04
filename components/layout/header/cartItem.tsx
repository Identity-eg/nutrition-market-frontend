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
			className='flex gap-4 py-6'>
			<div className='w-24 space-y-2'>
				<div className='relative flex-shrink-0 w-full h-auto rounded-md aspect-square bg-gray-30'>
					<Image
						src={selectedVariant.images[0].url}
						width={500}
						height={500}
						alt={selectedVariant.name}
						className='object-contain object-center w-full h-full p-2 mix-blend-multiply'
					/>
					<DeleteCartItemBtn itemId={_id} />
				</div>
				<IncDecBtn
					amount={amount}
					itemId={_id}
				/>
			</div>

			<div className='flex flex-col justify-between w-full'>
				<h3>
					<SheetClose asChild>
						<Link
							href={`/shop/${product._id}?variant=${selectedVariant._id}`}
							className='text-green-700 line-clamp-2 typography-M16'>
							{selectedVariant.name}
						</Link>
					</SheetClose>
				</h3>
				<span className='self-end'>{totalPrice} EGP</span>
			</div>
		</li>
	);
}
