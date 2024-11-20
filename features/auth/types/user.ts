export type TUser = {
	_id: string;
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	role: 'admin' | 'user';
	ordersCount: number;
	purchasedProducts: string[];
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
};
