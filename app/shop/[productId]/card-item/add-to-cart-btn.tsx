'use client';

import { Button } from 'components/ui/button';
import { Check, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';

// import { useAddToCart } from '@/apis/cart';
// import { useEffect, useState } from 'react';
// import { FaCircle } from 'react-icons/fa';
// import { BsCheck } from 'react-icons/bs';
// import { TProduct } from '@/types/products';
// import { Button } from '../ui/button';

type AddToCartButtonProp = {
	amount?: number;
	colorId: string;
	// productId: TProduct<string>['_id'];
};

const AddToCartButton = () => {
	// const { mutate: addToCart, isPending, isSuccess } = useAddToCart();
	const [isAddedEnd, setIsAddedEnd] = useState(false);
	const isPending = false;
	const isSuccess = false;

	// useEffect(() => {
	// 	setIsAddedEnd(false);
	// 	if (isSuccess) {
	// 		const id = setTimeout(() => setIsAddedEnd(true), 500);

	// 		return () => {
	// 			clearTimeout(id);
	// 		};
	// 	}
	// }, [isSuccess]);

	return (
		<Button
			// onClick={() =>
			// 	addToCart({
			// 		amount: amount,
			// 		color: colorId,
			// 		productId,
			// 	})
			// }
			className={`relative flex w-full flex-1 items-center justify-center capitalize`}>
			{isPending ? (
				<Circle
					size={10}
					className="animate-bounced"
				/>
			) : isSuccess && !isAddedEnd ? (
				<>
					<Check
						size={24}
						className="absolute"
					/>
				</>
			) : (
				<span>add to cart</span>
			)}
		</Button>
	);
};

export default AddToCartButton;
