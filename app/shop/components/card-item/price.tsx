import { cn, convertToReadableNumber } from 'lib/utils';
import { HtmlHTMLAttributes } from 'react';
import { TVariant } from 'types/product';

interface PriceProp
	extends Pick<TVariant, 'price'>,
		HtmlHTMLAttributes<HTMLDivElement> {
	isForPage?: boolean;
	priceAfterDiscount?: number;
	finalPriceClassName?: HtmlHTMLAttributes<HTMLSpanElement>['className'];
	previousPriceClassName?: HtmlHTMLAttributes<HTMLSpanElement>['className'];
}

export default function Price({
	priceAfterDiscount,
	price,
	finalPriceClassName,
	previousPriceClassName,
	className,
}: PriceProp) {
	return (
		<div className={cn('mb-4 flex flex-wrap items-center gap-2', className)}>
			<span
				className={cn(
					'flex justify-start gap-1 text-[#bc6c25] typography-SB20',
					finalPriceClassName
				)}>
				{convertToReadableNumber(priceAfterDiscount || price)}
				<span>EGP</span>
			</span>
			{priceAfterDiscount ? (
				<span
					className={cn(
						'flex items-start gap-1 text-gray-400 line-through typography-R16',
						previousPriceClassName
					)}>
					{convertToReadableNumber(price)}
				</span>
			) : undefined}
		</div>
	);
}
