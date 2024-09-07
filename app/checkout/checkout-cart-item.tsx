import Image from 'next/image';
import { TCartItem } from 'types/cart';
import { convertToReadableNumber } from 'lib/utils';

export default function CheckoutCartItem({
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
			className='flex gap-4 py-2'>
			<div className='relative aspect-square h-auto w-14 flex-shrink-0 rounded-md'>
				<Image
					src={selectedVariant.images[0].url}
					width={500}
					height={500}
					alt={selectedVariant.name}
					className='h-full w-full object-contain object-center mix-blend-multiply'
				/>
			</div>

			<div className='flex w-full flex-col justify-between text-gray-400 typography-M14'>
				<h3 className='line-clamp-1'>{selectedVariant.name}</h3>
				<span className='self-end'>{totalPrice} EGP</span>
			</div>
		</li>
	);
}
