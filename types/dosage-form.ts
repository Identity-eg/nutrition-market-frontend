export type TDosageForm = {
	_id: string;
	name: string;
	slug: string;
	productsCount: number;
	createdAt: string;
	updatedAt: string;
};

export type GetDosgaeFormsReturnType = {
	dosageForms: TDosageForm[];
};
