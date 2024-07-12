import { APP_COMPANIES, DOSAGE_FORMS } from 'constants/index';
import { TCategory } from 'types/category';

export type TProduct = {
	_id: string;
	name: string;
	slug: string;
	images: { url: string; name: string; size: number }[];
	description: string;
	nutritionFacts: string;
	company: (typeof APP_COMPANIES)[number];
	itemForm: (typeof DOSAGE_FORMS)[number];
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
