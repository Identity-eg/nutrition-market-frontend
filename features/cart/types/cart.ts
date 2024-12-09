import type { TVariant } from 'features/products/types/product';

export type TCartItem = {
	_id: string;
	product: string;
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
