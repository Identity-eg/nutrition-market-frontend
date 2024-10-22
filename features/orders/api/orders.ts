'use server';

import { request } from 'apis/request';
import type { TOrder } from 'features/orders/types/order';

export const getAllOrders = async (): Promise<TOrder[]> => {
	const { orders } = await request({
		url: `/orders/my-orders`,
		method: 'GET',
	});
	return orders;
};

export const getSingleOrder = async ({
	orderId,
}: {
	orderId: string | undefined;
}): Promise<TOrder> => {
	const { order } = await request({
		url: `/orders/${orderId}`,
		method: 'GET',
	});
	return order;
};
