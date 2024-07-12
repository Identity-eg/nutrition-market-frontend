'use server';

import qs from 'qs';
import { request } from 'apis/client';
import { TProduct } from 'types/product';

type GetProductsReturnType = {
	currentPage: number;
	lastPage: number;
	products: TProduct[];
	totalCount: number;
};

export type TParams = {
	name: string;
	sort: string;
	page: string;
	limit: string;
	averageRating: string;
	price: string;
	company: string;
	category: string;
	itemForm: string;
};

export const getProducts = async ({
	...params
}: TParams): Promise<GetProductsReturnType> => {
	const queryString = qs.stringify(params, { skipNulls: true });
	console.log({ url: `/products?${queryString}` });
	const data = await request({
		url: `/products?${queryString}`,
		method: 'GET',
	});

	return data;
};
