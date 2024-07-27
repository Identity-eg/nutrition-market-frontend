'use server';

import { request } from 'apis/client';
import { revalidatePath } from 'next/cache';
import { TReview } from 'types/review';

type GetReviewsReturnType = { reviews: TReview[]; count: number };

export const getReviews = async ({
	productId,
}: {
	productId: string;
}): Promise<GetReviewsReturnType> => {
	const data = await request({
		url: `/products/${productId}/reviews`,
	});

	return data;
};

type TAddReviewProps = Pick<TReview, 'comment' | 'title' | 'rating'> & {
	productId: string;
};

type TUpdateReviewProps = Pick<TReview, 'comment' | 'title' | 'rating'> & {
	reviewId: string;
};

export const addReview = async ({ productId, ...rest }: TAddReviewProps) => {
	const data = await request({
		url: `/reviews`,
		method: 'POST',
		body: {
			product: productId,
			...rest,
		},
	});

	revalidatePath('/shop/[productId]', 'page');
	return data;
};

export const getSingleReview = async ({ reviewId }: { reviewId: string }) => {
	const data = await request({
		url: `/reviews/${reviewId}`,
	});

	return data;
};

export const deleteReview = async ({ reviewId }: { reviewId: string }) => {
	const data = await request({
		url: `/reviews/${reviewId}`,
		method: 'DELETE',
	});

	revalidatePath('/shop/[productId]', 'page');
	return data;
};

export const updateReview = async ({
	reviewId,
	...rest
}: TUpdateReviewProps) => {
	const data = await request({
		url: `/reviews/${reviewId}`,
		method: 'PATCH',
		body: {
			...rest,
		},
	});

	revalidatePath('/shop/[productId]', 'page');
	return data;
};
