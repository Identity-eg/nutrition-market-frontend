'use server';

import { request } from 'apis/request';
import type { TCategory } from 'features/products/types/category';

export const getDosageForms = async (): Promise<{
	dosageForms: TCategory[];
}> => {
	const data = await request({
		url: `/dosage-forms`,
		method: 'GET',
	});

	return data;
};
