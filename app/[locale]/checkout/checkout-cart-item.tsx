import Image from 'next/image';
import type { TCartItem } from 'features/cart/types/cart';
import { TicketIcon } from 'lucide-react';
import { Price } from 'components/utils/price';
import { cn } from 'lib/utils';
import { useLocale } from 'next-intl';

export default function CheckoutCartItem({
	_id,
	totalProductPrice,
	totalProductPriceAfterCoupon,
	variant,
	amount,
}: TCartItem) {
	const locale = useLocale();
	return (
		<li
			key={_id}
			className='flex gap-4'>
			<div className='relative size-16 flex-shrink-0 rounded-md border border-gray-40'>
				<Image
					src={variant.images[0].url}
					width={50}
					height={50}
					alt={variant.name_en}
					className='h-full w-full object-contain object-center p-2 mix-blend-multiply'
				/>
				<div
					className={cn(
						'absolute end-0 top-0 flex size-[18px] -translate-y-1/2 items-center justify-center rounded-full bg-gray-50 py-2 typography-M12',
						{
							'-translate-x-1/2': locale === 'ar',
							'translate-x-1/2': locale === 'en',
						}
					)}>
					{amount}
				</div>
			</div>

			<div className='flex w-full flex-col justify-between text-gray-400 typography-M14'>
				<div className='flex justify-between'>
					<h3 className='line-clamp-2 text-left'>
						{locale === 'ar' ? variant.name_ar : variant.name_en}
					</h3>
					{totalProductPriceAfterCoupon && (
						<div className='flex aspect-square size-5 items-center justify-center rounded-full bg-green-light-600'>
							<TicketIcon
								size={14}
								className='text-white'
							/>
						</div>
					)}
				</div>
				<Price
					className='mb-0 ms-auto'
					finalPriceClassName='typography-M14 text-gray-200'
					price={totalProductPriceAfterCoupon ?? totalProductPrice}
				/>
			</div>
		</li>
	);
}
