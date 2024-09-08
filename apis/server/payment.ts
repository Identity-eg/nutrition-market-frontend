import { actionClient } from 'apis/action-clients';
import { request } from 'apis/client';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const paySchema = z.object({
	cartId: z.string().min(1, 'Cart id is required'),
	addressId: z.string().min(1, 'address id is required'),
	paymentMethodId: z.string().min(1, 'payment method id is required'),
});

export const pay = actionClient
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
