import type { TImage } from 'features/products/types/image';
import type { TVariant } from 'features/products/types/product';

export type TCartItem = {
	_id: string;
	product: {
		_id: string;
		name: string;
		price: number;
		priceAfterDiscount: number;
		images: TImage['image'];
	};
	company: string;
	variant: TVariant;
	amount: number;
	totalProductPrice: number;
};

export type TCart = {
	_id: string;
	user: string | undefined;
	items: TCartItem[];
	totalItems: number;
	totalPrice: number;
};
