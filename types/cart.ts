import { TImage } from './image';
import { TVariant } from './product';

export type TCartItem = {
	_id: string;
	product: {
		_id: string;
		name: string;
		price: number;
		priceAfterDiscount: number;
		images: TImage['image'];
	};
	selectedVariant: TVariant;
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

export type GetCartReturnType = {
	// categories: TCategory[];
};
