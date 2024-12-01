import type { TCategory } from 'features/products/types/category';
import type { TCompany } from 'features/products/types/company';
import type { TDosageForm } from 'features/products/types/dosage-form';

type PartialOrId<T, K extends keyof T> = Partial<T> | T[K];

export type TProduct = {
	_id: string;
	name: string;
	slug: string;
	description: string;
	directionOfUse: string;
	warnings: string;
	storageConditions: string;
	NFSA_REG_NO: string;
	createdAt: string;
	updatedAt: string;
	numReviews: number;
	averageRating: number;
	freeShipping: boolean;
	featured: boolean;
	nutritionFacts: TNutritionFacts;
	company: TCompany;
	dosageForm: TDosageForm;
	variants: TVariant;
	category: TCategory[];
};

export type TProductWithMultipleVariants = {
	[k in keyof TProduct]: k extends 'variants' ? TVariant[] : TProduct[k];
};

export type TNutritionFacts = {
	servingSize: string;
	servingPerContainer: string;
	ingredients: {
		_id: string;
		name: string;
		amountPerServing: string;
		dailyValue: string;
	}[];
	otherIngredients: {
		name: string;
	}[];
};

export type TVariant = {
	_id: string;
	name: string;
	slug: string;
	unitCount: number;
	quantity: number;
	flavor: string;
	price: number;
	priceAfterDiscount: number;
	images: { url: string; name: string; size: number; _id: string }[];
	createdAt: string;
	updatedAt: string;
};
