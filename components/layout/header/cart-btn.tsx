import { getCart } from 'apis/server/cart';
import { convertToReadableNumber } from 'lib/utils';
import { ShoppingBasket } from 'lucide-react';

export async function CartBtn() {
	const cart = await getCart();

	const totalPrice = convertToReadableNumber(
		!('err' in cart) ? cart.totalPrice : 0
	);

	return (
		<>
			<div className='relative'>
				<ShoppingBasket />
				<span className='absolute -top-3/4 right-1/2 flex size-[18px] translate-x-1/2 items-center justify-center rounded-full bg-[#dda15e] text-white typography-M12'>
					{!('err' in cart) ? cart.totalItems : 0}
				</span>
			</div>
			<div className='flex flex-col items-start typography-M14'>
				<p className='text-black'>Cart</p>
				<p className='text-[#bc6c25]'>{totalPrice} EGP</p>
			</div>
		</>
	);
}
