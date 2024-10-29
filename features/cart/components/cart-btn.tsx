import { convertToReadableNumber } from 'lib/utils';
import { ShoppingBasket } from 'lucide-react';

import { TCart } from 'features/cart/types/cart';

export function CartBtn({ cart }: { cart: TCart }) {
	return (
		<>
			<div className='relative'>
				<ShoppingBasket />
				<span className='absolute -top-3/4 right-1/2 flex size-[18px] translate-x-1/2 items-center justify-center rounded-full bg-[#dda15e] text-white typography-M12'>
					{cart.totalItems}
				</span>
			</div>
			<div className='hidden flex-col items-start typography-M14 media-md:flex'>
				<p className='text-black'>Cart</p>
				<p className='text-[#bc6c25]'>
					{convertToReadableNumber(cart.totalPrice)} EGP
				</p>
			</div>
		</>
	);
}
