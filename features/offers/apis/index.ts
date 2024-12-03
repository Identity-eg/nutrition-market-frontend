'use server';

import { request } from 'apis/request';
import type { TProduct } from 'features/products/types/product';

type TGetOffersReturn = {
	currentPage: number;
	lastPage: number;
	offers: TProduct[];
	totalCount: number;
};

export type TOffersParams = {
	page: string;
	limit: string;
};

export const getOffers = async ({
	...params
}: TOffersParams): Promise<TGetOffersReturn> => {
	const data = await request({
		url: '/products/offers',
		method: 'GET',
		query: params,
	});

	return data;
};
