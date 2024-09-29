'use server';

import { actionClient } from 'apis/action-clients';
import { request } from 'apis/client';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { Tags } from 'types/tags';
import { z } from 'zod';

const paySchema = z.object({
	cartId: z.string().min(1, 'Cart id is required'),
	addressId: z.string().min(1, 'Address id is required'),
	paymentMethodId: z.string().optional(),
});

export const payOnline = actionClient
	.schema(paySchema)
	.action(async ({ parsedInput: { addressId, cartId, paymentMethodId } }) => {
		const data = await request({
			method: 'POST',
			url: '/payment',
			body: {
				cartId,
				addressId,
				paymentMethodId,
			},
		});

		return data;
	});
export const payCash = actionClient.schema(paySchema).action(
	async ({ parsedInput: { addressId, cartId } }) => {
		const data = await request({
			method: 'POST',
			url: '/orders/cash-on-delivery',
			body: {
				cartId,
				addressId,
			},
		});

		return data;
	},
	{
		onSettled: () => revalidateTag(Tags.cart),
	}
);
