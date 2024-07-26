import { TCategory } from 'types/category';
import { TCompany } from './company';
import { TDosageForm } from './dosage-form';
import { TUser } from './user';

export type TProduct = {
	_id: string;
	name: string;
	slug: string;
	images: { url: string; name: string; size: number }[];
	description: string;
	nutritionFacts: TNutritionFacts;
	company: Partial<TCompany>;
	dosageForm: Partial<TDosageForm>;
	directionOfUse: string;
	warnings: string;
	storageConditions: string;
	NFSA_REG_NO: string;
	category: Partial<TCategory>[];
	freeShipping: boolean;
	numReviews: number;
	averageRating: number;
	price: number;
	quantity: number;
	featured: boolean;
	sold: number;
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
