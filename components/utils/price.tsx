import { HtmlHTMLAttributes } from 'react';
import { useTranslations } from 'next-intl';

import { cn, convertToReadableNumber } from 'lib/utils';
import type { TVariant } from 'features/products/types/product';

interface PriceProp
	extends Pick<TVariant, 'price'>,
		HtmlHTMLAttributes<HTMLDivElement> {
	isForPage?: boolean;
	priceAfterDiscount?: number;
	finalPriceClassName?: HtmlHTMLAttributes<HTMLSpanElement>['className'];
	previousPriceClassName?: HtmlHTMLAttributes<HTMLSpanElement>['className'];
}

export function Price({
	priceAfterDiscount,
	price,
	finalPriceClassName,
	previousPriceClassName,
	className,
}: PriceProp) {
	const t = useTranslations('Cart');
	return (
		<div className={cn('mb-4 flex flex-wrap items-center gap-2', className)}>
			<span
				className={cn(
					'flex justify-start gap-1 text-[#bc6c25] typography-SB20',
					finalPriceClassName
				)}>
				{convertToReadableNumber(priceAfterDiscount || price)} {t('currency')}
			</span>
			{priceAfterDiscount ? (
				<span
					className={cn(
						'flex items-start gap-1 text-gray-800 line-through underline-offset-2 typography-R16',
						previousPriceClassName
					)}>
					{convertToReadableNumber(price)} EGP
				</span>
			) : undefined}
		</div>
	);
}
