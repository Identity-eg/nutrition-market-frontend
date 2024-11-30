'use server';

import { actionClient } from 'apis/action-clients';
import { request } from 'apis/request';
import { revalidateTag } from 'next/cache';
import { TTags } from 'types/revalidate-tags';
import { z } from 'zod';

const applyCouponSchema = z.object({
	cartId: z.string().min(1, {
		message: 'Cart id is required',
	}),
	couponCode: z.string().min(1, {
		message: 'Coupon Code is required',
	}),
});
const removeCouponFromCartSchema = z.object({
	cartId: z.string().min(1, {
		message: 'Cart id is required',
	}),
	couponId: z.string().min(1, {
		message: 'Coupon Code is required',
	}),
});

export const applyCoupon = actionClient.schema(applyCouponSchema).action(
	async ({ parsedInput: { cartId, couponCode } }) => {
		const data = await request({
			url: `/coupons/apply-coupon`,
			method: 'POST',
			body: { cartId, couponCode },
		});
		return data;
	},
	{
		onSuccess: () => revalidateTag(TTags.cart),
	}
);

export const removeCouponFromCart = actionClient
	.schema(removeCouponFromCartSchema)
	.action(
		async ({ parsedInput: { cartId, couponId } }) => {
			const data = await request({
				url: `/coupons/remove-coupon`,
				method: 'POST',
				body: { cartId, couponId },
			});
			return data;
		},
		{
			onSuccess: () => revalidateTag(TTags.cart),
		}
	);
