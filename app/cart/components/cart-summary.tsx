import Link from 'next/link';
import { cn, convertToReadableNumber } from 'lib/utils';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { TCartItem } from 'types/cart';

export function CartSummary({
	totalPrice,
	isCartEmpty,
	items,
}: {
	totalPrice: number;
	isCartEmpty: boolean;
	items: TCartItem[];
}) {
	const priceBeforeDiscount = items.reduce((acc, item) => {
		acc += item.variant.price * item.amount;
		return acc;
	}, 0);

	return (
		<Card className='flex min-w-[380px] flex-col justify-between self-start p-6'>
			<h1 className='mb-4 border-b border-gray-40 pb-4 capitalize text-gray-800 typography-SB20'>
				Product summary
			</h1>

			<div className='mb-4 border-b border-gray-40 pb-4 text-gray-200'>
				<div className='mb-2 flex items-center justify-between'>
					<p>Total Price</p>
					<span>{convertToReadableNumber(priceBeforeDiscount)} EGP</span>
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
			<Button
				className={cn(
					isCartEmpty
						? 'pointer-events-none bg-green-50 text-green-200'
						: 'bg-green-500 text-white'
				)}
				asChild>
				<Link href='/checkout'>Checkout</Link>
			</Button>
		</Card>
	);
}
