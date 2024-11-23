'use server';

import { request } from 'apis/request';
import type {
	TCategory,
	TGetCategoriesReturn,
	TGetTopSellingCategoriesReturn,
} from 'features/products/types/category';
import { notFound } from 'next/navigation';

export const getCategories = async (): Promise<TGetCategoriesReturn> => {
	const data = await request({
		url: `/categories`,
		method: 'GET',
	});

	return data;
};

export const getTopSellingCategory = async (props?: {
	limit: number;
}): Promise<TGetTopSellingCategoriesReturn> => {
	const data = await request({
		url: `/statistics/top-selling-categories`,
		method: 'GET',
		query: { limit: props?.limit },
	});

	return data;
};

export const getSingleCategory = async ({
	slug,
}: {
	slug: string;
}): Promise<TCategory> => {
	try {
		const data = await request({
			url: `/categories/slug/${slug}`,
			method: 'GET',
		});

		return data.category;
	} catch {
		notFound();
	}
};
