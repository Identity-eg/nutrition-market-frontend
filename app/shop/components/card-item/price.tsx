import { formatPrice } from 'lib/format-price';
import { cn } from 'lib/utils';

import { HtmlHTMLAttributes } from 'react';
import { TProduct } from 'types/product';

type TPriceProps = Pick<TProduct, 'price'> & HtmlHTMLAttributes<HTMLDivElement>;

const Price = ({ price }: TPriceProps) => {
	const isDiscount = false;
	return (
		<div className={cn('mb-4 flex flex-wrap items-center gap-2')}>
			<span className={`flex justify-start gap-1 font-semibold text-gray-900`}>
				<span className="font-medium typography-R12">EGP</span>
				{/* {formatPrice(null || price)} */}
				{formatPrice(price)}
			</span>
			{isDiscount ? (
				<p className="text-neutral-500 flex items-start gap-1 line-through typography-R14">
					{formatPrice(price)}
				</p>
			) : undefined}
		</div>
	);
};

export default Price;
