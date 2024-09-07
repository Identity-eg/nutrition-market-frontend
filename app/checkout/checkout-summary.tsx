import Link from 'next/link';
import { cn, convertToReadableNumber } from 'lib/utils';
import { Card } from 'components/ui/card';
import CartSideItem from 'components/layout/header/cartItem';
import { getCart } from 'apis/server/cart';
import CheckoutCartItem from './checkout-cart-item';
import { Button } from 'components/ui/button';

export async function CheckoutSummary({
	totalPrice,
	isCartEmpty,
}: {
	totalPrice: number;
	isCartEmpty: boolean;
}) {
	const cart = await getCart();
	return (
		<Card className='flex max-w-[380px] flex-col justify-between self-start p-6'>
			<h1 className='mb-4 border-b border-gray-40 pb-4 capitalize text-gray-800 typography-SB20'>
				Product summary
			</h1>
			<ul className='relative mb-4 flex-1 overflow-y-auto rounded-md border border-gray-40 bg-gray-20 p-4'>
				{cart?.items?.map(item => {
					return (
						<CheckoutCartItem
							key={item._id}
							{...item}
						/>
					);
				})}
			</ul>

			<div className='mb-4 border-b border-gray-40 pb-4 text-gray-200 typography-R14'>
				<div className='mb-2 flex items-center justify-between'>
					<p>Total Price</p>
					<span>{convertToReadableNumber(totalPrice)} EGP</span>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>Total Price After Discount</p>
					<span>{convertToReadableNumber(totalPrice)} EGP</span>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>Tax/Fee</p>
					<span>0 EGP</span>
				</div>
			</div>

			<div className='mb-4 flex items-center justify-between text-green-light-700 typography-SB18'>
				<p className='text-green-800'>Total Price</p>
				{convertToReadableNumber(totalPrice)} EGP
			</div>
			<Button className='rounded-md py-3 text-center'>Place order</Button>
		</Card>
	);
}
