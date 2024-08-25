'use server';

import { TCart } from 'types/cart';
import { request } from '../client';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { actionClient } from 'apis/action-clients';
import { z } from 'zod';

const Tags = {
	cart: 'get-cart',
} as const;

export const getCart = async (): Promise<TCart> => {
	const data = await request({
		url: '/carts',
		method: 'GET',
		next: { tags: [Tags.cart] },
	});
	return data.cart;
};

const addItemToCartSchema = z.object({
	productId: z.string(),
	amount: z.number(),
	variantId: z.string(),
});

export const addItemToCart = actionClient.schema(addItemToCartSchema).action(
	async ({ parsedInput: { amount = 1, productId, variantId } }) => {
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
	},
	{ onSettled: () => revalidateTag(Tags.cart) }
);

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

const increaseDecreaseSchema = z.object({
	itemId: z.string(),
});

export const increaseItemByOne = actionClient
	.schema(increaseDecreaseSchema)
	.action(
		async ({ parsedInput: { itemId } }) => {
			const data = await request({
				url: `/carts/${itemId}/increase-one`,
				method: 'POST',
			});

			return data;
		},
		{ onSettled: () => revalidateTag(Tags.cart) }
	);

export const decreaseItemByOne = actionClient
	.schema(increaseDecreaseSchema)
	.action(
		async ({ parsedInput: { itemId } }) => {
			const data = await request({
				url: `/carts/${itemId}/reduce
			-one`,
				method: 'POST',
			});

			return data;
		},
		{ onSettled: () => revalidateTag(Tags.cart) }
	);
