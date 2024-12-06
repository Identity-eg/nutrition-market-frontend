import { useMutation, useQuery } from '@tanstack/react-query';
import {
	addReview,
	deleteReview,
	getSingleReview,
	updateReview,
} from 'features/reviews/apis/reviews';

export function useAddReview() {
	return useMutation({
		mutationFn: addReview,
	});
}

export function useGetSingleReview({ reviewId }: { reviewId: string }) {
	return useQuery({
		queryKey: ['review'],
		queryFn: async () => await getSingleReview({ reviewId }),
	});
}

export function useDeleteReview() {
	return useMutation({
		mutationFn: deleteReview,
	});
}

export function useUpdateReview() {
	return useMutation({
		mutationFn: updateReview,
	});
}
