import type { TCategory } from 'features/products/types/category';
import type { TCompany } from 'features/products/types/company';
import type { TDosageForm } from 'features/products/types/dosage-form';

export type TProduct = {
	_id: string;
	description: string;
	nutritionFacts: TNutritionFacts;
	company: Partial<TCompany>;
	dosageForm: Partial<TDosageForm>;
	directionOfUse: string;
	warnings: string;
	storageConditions: string;
	variants: TVariant[];
	NFSA_REG_NO: string;
	category: Partial<TCategory>[];
	freeShipping: boolean;
	numReviews: number;
	averageRating: number;
	featured: boolean;
	createdAt: string;
	updatedAt: string;
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
