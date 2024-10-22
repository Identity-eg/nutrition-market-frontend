export type TCompany = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	logo?: string;
	cover?: string;
	productsCount: number;
	ordersCount: number;
	createdAt: string;
	updatedAt: string;
};

export type TGetCompaniesReturn = {
	companies: TCompany[];
};
