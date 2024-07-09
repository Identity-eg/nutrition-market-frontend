'use server';
import {
	keepPreviousData,
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { request } from 'apis/client';
import { TProduct } from 'types/product';

type GetProductsReturnType = {
	currentPage: number;
	lastPage: number;
	products: TProduct[];
	totalCount: number;
};

const getProducts = async ({
	pageParam,
	...rest
}: {
	pageParam: number;
}): Promise<GetProductsReturnType> => {
	const params = { page: pageParam, ...rest };

	const res = await request({
		url: 'products',
		method: 'GET',
		params,
	});

	const data = await res.json();

	return data;
};

