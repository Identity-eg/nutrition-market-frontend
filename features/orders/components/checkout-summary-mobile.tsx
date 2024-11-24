import { PlaceOrderBtn } from 'features/orders/components/place-order-btn';
import { Button } from 'components/ui/button';
import { convertToReadableNumber } from 'lib/utils';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from 'components/ui/drawer';
import CheckoutCartItem from '../../../app/checkout/checkout-cart-item';
import { TCart } from 'features/cart/types/cart';
import { Input } from 'components/ui/input';

export function CheckoutSummaryMobile({
	cart,
	paymentMethodId,
	addressId,
}: {
	cart: TCart;
	paymentMethodId: string;
	addressId: string;
}) {
	const priceBeforeDiscount = cart.items.reduce((acc, item) => {
		acc += item.variant.price * item.amount;
		return acc;
	}, 0);
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant='secondary-gray'>View Order</Button>
			</DrawerTrigger>
			<DrawerContent className='bg-white'>
				<DrawerHeader>
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

					<div className='mb-4 flex items-center justify-between text-green-light-700 typography-SB18'>
						<p className='text-green-800'>Total Price</p>
						{convertToReadableNumber(cart.totalPrice)} EGP
					</div>
				</DrawerHeader>
				<DrawerFooter>
					<PlaceOrderBtn
						paymentMethodId={paymentMethodId}
						addressId={addressId}
						cartId={cart._id}
					/>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
