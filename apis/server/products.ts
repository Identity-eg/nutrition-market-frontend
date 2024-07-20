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
	const data = await request({
		url: `/products?${queryString}`,
		method: 'GET',
	});

	return data;
};

export type TSimilarProductsProps = {
	productId: string;
	limit?: string;
};

export const getSimilarProducts = async ({
	productId,
	limit = '4',
}: TSimilarProductsProps): Promise<Pick<GetProductsReturnType, 'products'>> => {
	const data = await request({
		url: `/products/${productId}/similar?limit=${limit}`,
		method: 'GET',
	});

	return data;
};

export const getSingleProduct = async ({
	productId,
}: {
	productId: string | undefined;
}): Promise<Pick<GetProductsReturnType, 'products'>['products'][number]> => {
	const { product } = await request({
		url: `/products/${productId}`,
		method: 'GET',
	});
	return product;
};
