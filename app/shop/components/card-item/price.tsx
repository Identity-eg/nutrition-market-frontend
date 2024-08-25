import { cn, convertToReadableNumber } from 'lib/utils';
import { HtmlHTMLAttributes } from 'react';
import { TVariant } from 'types/product';

interface PriceProp
	extends Pick<TVariant, 'price'>,
		HtmlHTMLAttributes<HTMLDivElement> {
	isForPage?: boolean;
	priceAfterDiscount?: number;
}

export default function Price({
	priceAfterDiscount,
	price,
	isForPage = false,
	className,
}: PriceProp) {
	return (
		<div className={cn('mb-4 flex flex-wrap items-center gap-2', className)}>
			<span
				className={`flex justify-start gap-1 text-[#bc6c25] typography-SB20 ${
					isForPage ? 'typography-SB24' : 'typography-M16'
				}`}>
				{convertToReadableNumber(priceAfterDiscount || price)}
				<span className='typography-B14'>EGP</span>
			</span>
			{priceAfterDiscount ? (
				<p className='flex items-start gap-1 text-gray-400 line-through typography-R16'>
					{convertToReadableNumber(price)}
				</p>
			) : undefined}
		</div>
	);
}
