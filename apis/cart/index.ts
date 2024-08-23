import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from 'apis/client';
import { addItemToCart, deleteItemFromCart, getCart } from 'apis/server/cart';
import { TCart } from 'types/cart';

// ######################### Get Cart #########################
// export function useGetCart() {
// 	return useQuery({
// 		queryKey: ['get-cart'],
// 		queryFn: () => getCart(),
// 	});
// }

// ######################### Add To Cart #########################
export function useAddToCart() {
	return useMutation({
		mutationFn: addItemToCart,
	});
}
// ######################### Increase Item By One #########################
export function useIncreaseItemByOne() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
			const { data } = await request({
				url: `/carts/${itemId}/increase-one`,
				method: 'POST',
			});
			return data;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
	});
}

// ######################### Reduce Item By One #########################
export function useReduceItemByOne() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
			const { data } = await request({
				url: `/carts/${itemId}/reduce-one`,
				method: 'POST',
			});
			return data;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
	});
}

// ######################### Reduce Item By One #########################
export function useDeleteCartItem() {
	return useMutation({
		mutationFn: deleteItemFromCart,
	});
}

// ######################### Reduce Item By One #########################
export function useDeleteCart() {
	return useMutation({
		mutationFn: deleteItemFromCart,
	});
}
