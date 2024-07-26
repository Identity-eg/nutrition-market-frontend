import { useMutation } from '@tanstack/react-query';
import { addReview, deleteReview } from 'apis/server/reviews';

export function useAddReview() {
	return useMutation({
		mutationFn: addReview,
	});
}

export function useDeleteReview() {
	return useMutation({
		mutationFn: deleteReview,
	});
}
