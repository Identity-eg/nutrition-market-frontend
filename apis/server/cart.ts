'use server';

import { TCart } from 'types/cart';
import { request } from '../client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const Tags = {
	cart: 'get-cart',
} as const;

export const getCart = async (): Promise<TCart | { err: string }> => {
	try {
		const data = await request({
			url: '/carts',
			method: 'GET',
			next: { tags: [Tags.cart] },
		});
		return data.cart;
	} catch (err) {
		return { err: (err as Error).message };
	}
};

export const addItemToCart = async ({
	productId,
	amount = 1,
	variantId,
}: {
	productId: string;
	amount?: number;
	variantId?: string;
}): Promise<{ msg: string; cartId?: string } | { err: string }> => {
	try {
		const data = await request({
			url: '/carts',
			body: {
				productId,
				amount,
				...(variantId && { variantId }),
			},
			method: 'POST',
		});

		if (data?.cartId) {
			cookies().set(process.env.CART_ID ?? '', data?.cartId);
		}

		return data;
	} catch (err) {
		return { err: (err as Error).message };
	} finally {
		revalidateTag(Tags.cart);
	}
};

export const deleteItemFromCart = async ({
	itemId,
}: {
	itemId: string;
}): Promise<{ msg: string; isCartEmpty?: boolean } | { err: string }> => {
	try {
		const data = await request({
			url: `/carts/${itemId}`,
			method: 'DELETE',
		});

		if (data?.isCartEmpty) {
			cookies().delete(process.env.CART_ID ?? '');
		}

		return data;
	} catch (err) {
		return { err: (err as Error).message };
	} finally {
		revalidateTag(Tags.cart);
	}
};
