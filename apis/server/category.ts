'use server';

import { request } from 'apis/request';
import type { TGetCategoriesReturn } from 'features/products/types/category';

export const getCategories = async (): Promise<TGetCategoriesReturn> => {
	const data = await request({
		url: `/categories`,
		method: 'GET',
	});

	return data;
};
