'use server';

import { revalidateTag } from 'next/cache';
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';
import { z } from 'zod';

import { request } from 'apis/request';
import { actionClient } from 'apis/action-clients';

import { TTags } from 'types/revalidate-tags';
import type { TCart } from 'features/cart/types/cart';

export const getCart = async (): Promise<TCart> => {
	const data = await request({
		url: '/carts',
		method: 'GET',
		next: { tags: [TTags.cart] },
	});
	return data.cart;
};

// ##################### ADD ITEM TO CART ######################
const addItemToCartSchema = z.object({
	productId: z.string().min(1, 'productId is required'),
	amount: z.number(),
	variantId: z.string().min(1, 'variantId is required'),
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
	{ onSettled: () => revalidateTag(TTags.cart) }
);

// ##################### DELETE ITEM FROM CART ######################
// export const deleteItemFromCart = async ({
// 	itemId,
// }: {
// 	itemId: string;
// }): Promise<{ msg: string; isCartEmpty?: boolean } | { err: string }> => {
// 	try {
// 		const data = await request({
// 			url: `/carts/${itemId}`,
// 			method: 'DELETE',
// 		});

// 		if (data?.isCartEmpty) {
// 			cookies().delete(process.env.CART_ID ?? '');
// 		}

// 		return data;
// 	} catch (err) {
// 		return { err: (err as Error).message };
// 	} finally {
// 		revalidateTag(TTags.cart);
// 	}
// };

const itemOperationSchema = z.object({
	itemId: z.string().min(1, 'ItemId is required'),
});
export const deleteItemFromCart = actionClient
	.schema(itemOperationSchema)
	.action(
		async ({ parsedInput: { itemId } }) => {
			const data = await request({
				url: `/carts/${itemId}`,
				method: 'DELETE',
			});

			return data;
		},
		{
			onSuccess: data => {
				if (data?.isCartEmpty) {
					(cookies() as unknown as UnsafeUnwrappedCookies).delete(
						process.env.CART_ID ?? ''
					);
				}
			},
			onSettled: () => revalidateTag(TTags.cart),
		}
	);

// ##################### INCREASE & DECREASE BY ONE ######################
const increaseDecreaseSchema = z.object({
	itemId: z.string().min(1, 'ItemId is required'),
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
		{ onSettled: () => revalidateTag(TTags.cart) }
	);

export const decreaseItemByOne = actionClient
	.schema(increaseDecreaseSchema)
	.action(
		async ({ parsedInput: { itemId } }) => {
			const data = await request({
				url: `/carts/${itemId}/reduce-one`,
				method: 'POST',
			});

			return data;
		},
		{ onSettled: () => revalidateTag(TTags.cart) }
	);
