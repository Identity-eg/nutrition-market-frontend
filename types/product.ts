import { TCategory } from 'types/category';
import { TCompany } from './company';
import { TDosageForm } from './dosage-form';

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
		name: string;
		amountPerServing: string;
		dailyValue: string;
	};
	otherIngredients: {
		name: string;
	};
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
	images: { url: string; name: string; size: number }[];
	createdAt: string;
	updatedAt: string;
};
