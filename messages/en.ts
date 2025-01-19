import authEn from './auth/en';
import homeEn from './home/en';

const en = {
	LayoutMetadata: {
		title: {
			template: '%s | The Nutrition Market',
			default: 'The Nutrition Market default',
		},
		description: 'Supplement | Your healthy choice',
		applicationName: 'The Nutrition Market',
	},
	LocaleSwitcher: {
		label: '{locale, select, ar {عربي} en {English} other {Unknown}}',
	},
	...authEn,
	...homeEn,
	ShopPage: {
		pageMetadata: 'Shop',
	},
	OfferPage: {
		pageMetadata: 'Offer',
	},
	CartPage: {
		pageMetadata: 'Cart',
		cart: 'Cart',
		currency: 'EGP',
	},
	Filter: {
		filter: 'Filter',
		brand: 'Brand',
		category: 'Category',
		price: 'Price',
		rating: 'Rating',
		dosageForm: 'Dosage Form',
		from: 'from',
		to: 'to',
		apply: 'Apply',
		clear: 'Clear',
		clearAll: 'Clear all',
	},
};

export default en;
