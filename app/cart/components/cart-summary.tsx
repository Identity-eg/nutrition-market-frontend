import Link from 'next/link';
import { cn, convertToReadableNumber } from 'lib/utils';
import { Card } from 'components/ui/card';

export function CartSummary({
	totalPrice,
	isCartEmpty,
}: {
	totalPrice: number;
	isCartEmpty: boolean;
}) {
	return (
		<Card className='flex min-w-[380px] flex-col justify-between self-start  p-6'>
			<h1 className='pb-4 mb-4 text-gray-800 capitalize border-b border-gray-40 typography-SB20'>
				Product summary
			</h1>

			<div className='pb-4 mb-4 text-gray-200 border-b border-gray-40'>
				<div className='flex items-center justify-between mb-2'>
					<p>Total Price</p>
					<span>{convertToReadableNumber(totalPrice)} EGP</span>
				</div>
				<div className='flex items-center justify-between mb-2'>
					<p>Total Price After Discount</p>
					<span>{convertToReadableNumber(totalPrice)} EGP</span>
				</div>
				<div className='flex items-center justify-between mb-2'>
					<p>Tax/Fee</p>
					<span>0 EGP</span>
				</div>
			</div>

			<div className='flex items-center justify-between mb-4 text-green-light-700 typography-R20'>
				<p className='text-gray-900'>Total Price</p>
				<span>
					{convertToReadableNumber(totalPrice)}
					EGP
				</span>
			</div>
			<Link
				href='/checkout'
				className={cn(
					`rounded-md py-3 text-center`,
					isCartEmpty
						? 'pointer-events-none bg-green-50 text-green-200'
						: 'bg-green-500 text-white'
				)}>
				Checkout
			</Link>
		</Card>
	);
}
