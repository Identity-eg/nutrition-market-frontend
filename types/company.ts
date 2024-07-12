export type TCompany = {
	_id: string;
	name: string;
	slug: string;
	productsCount: number;
	createdAt: string;
	updatedAt: string;
};

export type GetCompaniesReturnType = {
	companies: TCompany[];
};
