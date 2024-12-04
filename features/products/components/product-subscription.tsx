'use client';

import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { TProduct, TVariant } from '../types/product';
import { useState } from 'react';
import { Price } from 'components/utils/price';

export function ProductSubscription({
	product,
	variant,
}: {
	product: TProduct;
	variant: TVariant;
}) {
	const [isSubscribable, setIsSubscribable] = useState(false);
	return (
		<RadioGroup
			defaultValue='oneTime'
			onValueChange={value =>
				value === 'oneTime' ? setIsSubscribable(false) : setIsSubscribable(true)
			}
			className='mb-4'>
			<Label
				htmlFor='oneTime'
				className='flex h-[55px] cursor-pointer flex-row items-center gap-2 space-y-0 rounded-md border border-gray-20 bg-gray-20 p-4 transition-all typography-R14 has-[[data-state=checked]]:border-green-300 has-[[data-state=checked]]:bg-green-50'>
				<RadioGroupItem
					value='oneTime'
					id='oneTime'
				/>
				One-time purchase
			</Label>

			<Label
				className='flex h-[55px] cursor-pointer flex-row items-center justify-between space-y-0 rounded-md border border-gray-20 bg-gray-20 p-4 transition-all typography-R14 has-[[data-state=checked]]:border-green-300 has-[[data-state=checked]]:bg-green-50'
				htmlFor='subscription'>
				<div className='flex items-center gap-2'>
					<RadioGroupItem
						value='subscription'
						id='subscription'
					/>
					Subscribe{' '}
					<span className='ml-1 inline-block rounded-full bg-red-500 bg-gradient-to-tr from-[#ED5B5E] to-[#F1905C] px-2 py-1 text-white typography-R13'>
						Save {product.subscriptionDiscount}%
					</span>
				</div>
				<Price
					finalPriceClassName='typography-M14 text-gray-400'
					previousPriceClassName='typography-R12 text-gray-200'
					price={variant.priceAfterDiscount ?? variant.price}
					priceAfterDiscount={variant.priceAfterSubscription}
				/>
			</Label>
		</RadioGroup>
	);
}
