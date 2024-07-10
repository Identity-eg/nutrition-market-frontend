'use server';

import { request } from 'apis/client';
import { GetCategoriesReturnType } from 'types/category';

export const getCategories = async (): Promise<GetCategoriesReturnType> => {
	const data = await request({
		url: `/categories`,
		method: 'GET',
	});

	return data;
};
