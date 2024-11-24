import { redirect } from 'next/navigation';
import { convertToReadableNumber } from 'lib/utils';
import { Card } from 'components/ui/card';
import CheckoutCartItem from 'app/checkout/checkout-cart-item';
import { PlaceOrderBtn } from 'features/orders/components/place-order-btn';
import { TCart } from 'features/cart/types/cart';
import { Input } from 'components/ui/input';
import { TicketIcon } from 'lucide-react';

export function CheckoutSummary({
	cart,
	paymentMethodId,
	addressId,
}: {
	cart: TCart;
	paymentMethodId: string;
	addressId: string;
}) {
	if (cart?.items.length === 0) redirect('/');
	const priceBeforeDiscount = cart.items.reduce((acc, item) => {
		acc += item.variant.price * item.amount;
		return acc;
	}, 0);
	return (
		<Card className='hidden max-w-[380px] flex-1 flex-col justify-between self-start p-6 media-md:flex'>
			<h1 className='mb-4 border-b border-gray-40 pb-4 capitalize text-gray-800 typography-SB20'>
				Product summary
			</h1>
			<ul className='relative mb-4 flex-1 space-y-4 rounded-md border-b border-gray-40 pb-4'>
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
					<span>{convertToReadableNumber(priceBeforeDiscount)} EGP</span>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>Total Price After Discount</p>
					<span>{convertToReadableNumber(cart.totalPrice)} EGP</span>
				</div>
				<div className='mb-2 flex items-center justify-between'>
					<p>Shipping Fee</p>
					<span>0 EGP</span>
				</div>
			</div>
			<div className='relative'>
				<TicketIcon className='absolute left-2 top-2' />
				<Input size='sm' />
			</div>
			<div className='mb-4 flex items-center justify-between text-green-light-700 typography-SB18'>
				<p className='text-green-800'>Total Price</p>
				{convertToReadableNumber(cart.totalPrice)} EGP
			</div>
			<PlaceOrderBtn
				paymentMethodId={paymentMethodId}
				addressId={addressId}
				cartId={cart._id}
			/>
		</Card>
	);
}
