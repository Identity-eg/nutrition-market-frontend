export type TCompany = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	logo?: {
		name: string;
		size: number;
		url: string;
	};
	cover?: {
		name: string;
		size: number;
		url: string;
	};
	productsCount: number;
	ordersCount: number;
	createdAt: string;
	updatedAt: string;
};

export type TGetCompaniesReturn = {
	companies: TCompany[];
};
