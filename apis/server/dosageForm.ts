'use server';

import { request } from 'apis/client';
import { TCategory } from 'types/category';
// import { GetCategoriesReturnType } from 'types/category';

export const getDosageForms = async (): Promise<{ dosageForms: TCategory[] }> => {
	const data = await request({
		url: `/dosage-forms`,
		method: 'GET',
	});

	return data;
};
