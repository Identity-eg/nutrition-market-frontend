'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
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
	companyId: z.string().min(1, 'companyId is required'),
	variantId: z.string().min(1, 'variantId is required'),
	amount: z.number(),
});

export const addItemToCart = actionClient.schema(addItemToCartSchema).action(
	async ({ parsedInput: { amount = 1, productId, variantId, companyId } }) => {
		const data = await request({
			url: '/carts',
			body: {
				productId,
				companyId,
				amount,
				...(variantId && { variantId }),
			},
			method: 'POST',
		});

		if (data?.cartId) {
			const cookiesStore = await cookies();
			cookiesStore.set(process.env.CART_ID ?? '', data?.cartId);
		}

		return data;
	},
	{ onSettled: async () => revalidateTag(TTags.cart) }
);

// ##################### DELETE ITEM FROM CART ######################
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
			onSuccess: async data => {
				const cookiesStore = await cookies();
				if (data?.isCartEmpty) {
					cookiesStore.delete(process.env.CART_ID ?? '');
				}
			},
			onSettled: async () => revalidateTag(TTags.cart),
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
		{ onSettled: async () => revalidateTag(TTags.cart) }
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
		{ onSettled: async () => revalidateTag(TTags.cart) }
	);
