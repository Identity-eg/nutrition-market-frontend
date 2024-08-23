'use client';
import { addItemToCart } from 'apis/server/cart';
import { useFormState } from 'react-dom';
import { SubmitBtn } from './submit-btn';
import { useEffect } from 'react';

const AddToCartButton = ({
	resetCount,
	productId,
	variantId,
	amount,
}: {
	resetCount?: () => void;
	productId: string;
	variantId?: string;
	amount?: number;
}) => {
	const [state, addItemToCartAction] = useFormState(
		() =>
			addItemToCart({
				productId,
				variantId,
				amount,
			}),
		undefined
	);

	useEffect(() => {
		if (state && 'msg' in state && resetCount) {
			resetCount();
		}
	}, [state]);

	return (
		<form
			action={addItemToCartAction}
			className='relative w-full'>
			<SubmitBtn state={state} />
		</form>
	);
};

export default AddToCartButton;
