'use client';

import { useState } from 'react';
import { useAction } from 'next-safe-action/hooks';
import { CircleCheckIcon, LoaderCircleIcon, TicketIcon } from 'lucide-react';

import { TextField } from 'components/ui/text-field';
import { applyCoupon } from 'features/coupon/api';
import { toast } from 'components/ui/use-toast';
import type { TCart } from 'features/cart/types/cart';
import CouponBanner from './coupon-banner';
import { Button } from 'components/ui/button';

export function Coupon({ cart }: { cart: TCart }) {
	const { execute, isExecuting, hasSucceeded } = useAction(applyCoupon, {
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});
	const [couponCode, setCouponCode] = useState('');

	return (
		<div className='relative mb-4 overflow-hidden rounded-md'>
			<div className='mb-2 flex items-center gap-2'>
				<TicketIcon className='text-green-light-600' />
				<h4 className='text-gray-500 typography-SB14'>Discount code</h4>
			</div>
			{!cart.coupon && (
				<div className='flex gap-2'>
					<TextField
						size='xs'
						onChange={e => setCouponCode(e.target.value)}
						suffexIcon={
							<>
								{isExecuting && (
									<LoaderCircleIcon
										size={16}
										className='animate-spin text-gray-500'
									/>
								)}
								{hasSucceeded && !isExecuting && (
									<CircleCheckIcon
										className='text-green-light-700'
										size={16}
									/>
								)}
							</>
						}
					/>
					<Button
						variant={'outline'}
						size='sm'
						className='typography-SB13'
						onClick={() => {
							if (!couponCode) return;
							execute({ cartId: cart._id, couponCode });
						}}>
						Redeem
					</Button>
				</div>
			)}
			{cart.coupon && (
				<CouponBanner
					className='border border-green-light-200 bg-green-light-50 text-green-light-700'
					companyName={cart.coupon.company.name}
					sale={cart.coupon.sale}
				/>
			)}
		</div>
	);
}
