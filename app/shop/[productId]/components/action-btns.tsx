'use client';

import { useState } from 'react';
import { Counter } from './counter';
import { AddToCartButton } from 'app/shop/components/card-item/add-to-cart-btn';

export default function ActionBtns({
	productId,
	variantId,
	quantity,
}: {
	productId: string;
	variantId: string;
	quantity: number;
}) {
	const [count, setCount] = useState<number>(1);

	const increaseByOne = () => {
		if (count === quantity) return;
		setCount(prev => prev + 1);
	};
	const decreaseByOne = () => {
		if (count === 1) return;
		setCount(prev => prev - 1);
	};

	const resetCount = () => {
		setCount(1);
	};

	return (
		<div className='mt-auto flex w-[80%] gap-2'>
			<AddToCartButton
				quantity={quantity}
				resetCount={resetCount}
				amount={count}
				productId={productId}
				variantId={variantId}
			/>

			<Counter
				count={count}
				increaseByOne={increaseByOne}
				decreaseByOne={decreaseByOne}
			/>
		</div>
	);
}
