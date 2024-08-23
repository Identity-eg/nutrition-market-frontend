'use client';

import AddToCartButton from 'app/shop/components/card-item/add-to-cart-btn';
import { Counter } from './counter';
import { useState } from 'react';
import { CircleAlert } from 'lucide-react';

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
		<>
			<div className='mt-auto flex w-[80%] gap-2'>
				<AddToCartButton
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
			{count === quantity && (
				<span className='mt-2 flex items-center gap-2 text-red-500 typography-R14'>
					<CircleAlert size={16} /> {quantity} is Maximum Quantity for this
					product
				</span>
			)}
		</>
	);
}
