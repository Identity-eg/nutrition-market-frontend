import type { TUser } from 'features/auth/types/user';

export type TReview = {
	rating: number;
	title: string;
	comment: string;
	user: Partial<TUser>;
	product: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
};
