import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from 'apis/client';
import { getCart } from 'apis/server/cart';

export type TCartItem = {
	_id: string;
	product: {
		_id: string;
		name: string;
		price: number;
		images: string[];
	};
	selectedSize: string;
	amount: number;
	totalProductPrice: number;
};

export type TCart = {
	_id: string;
	user: string;
	items: TCartItem[];
	totalItems: number;
	totalPrice: number;
	shippingFee: number;
};

// ######################### Get Cart #########################
export function useGetCart() {
	return useQuery({
		queryKey: ['get-cart'],
		queryFn: () => getCart(),
	});
}

// ######################### Add To Cart #########################
export function useAddToCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (cartData: {
			amount: number;
			color: string;
			productId: string;
			size: string;
		}): Promise<{ cart: TCart }> => {
			const { data } = await request({
				url: `/carts`,
				method: 'POST',
				data: cartData,
			});
			return data;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
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
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (itemId: string): Promise<{ cart: TCart }> => {
			const { data } = await request({
				url: `/carts/${itemId}`,
				method: 'DELETE',
			});
			return data;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
	});
}

// ######################### Reduce Item By One #########################
export function useDeleteCart() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (): Promise<{ cart: TCart }> => {
			const { data } = await request({
				url: `/carts`,
				method: 'DELETE',
			});
			return data;
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['get-cart'] }),
	});
}

