import Image from 'next/image';
import { convertToReadableNumber } from 'lib/utils';
import type { TCartItem } from 'features/cart/types/cart';

export default function CheckoutCartItem({
	_id,
	totalProductPrice,
	variant,
	amount,
}: TCartItem) {
	const totalPrice = convertToReadableNumber(totalProductPrice);

	return (
		<li
			key={_id}
			className='flex gap-4'
		>
			<div className='relative size-16 flex-shrink-0 rounded-md border border-gray-40'>
				<Image
					src={variant.images[0].url}
					width={50}
					height={50}
					alt={variant.name}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div className='absolute right-0 top-0 flex size-[18px] -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-gray-50 py-2 typography-M12'>
					{amount}
				</div>
			</div>

			<div className='flex w-full flex-col justify-between text-gray-400 typography-M14'>
				<h3 className='line-clamp-2'>{variant.name}</h3>
				<span className='self-end'>{totalPrice} EGP</span>
			</div>
		</li>
	);
}
