export type TCategory = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	cover: string;
	productsCount: number;
	createdAt: string;
	updatedAt: string;
};

export type TGetCategoriesReturn = {
	categories: TCategory[];
};

export type TGetTopSellingCategoriesReturn = {
	categories: {
		_id: string;
		totalSold: number;
		category: TCategory;
	}[];
};
