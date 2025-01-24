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
	NotFoundPage: {
		title: 'Page Not Found',
		description:
			'It looks like nothing was found at this location. Maybe try to search for what you are looking for ?',
		goHome: 'Go to home',
	},
	...authEn,
	...homeEn,
	ShopPage: {
		pageMetadata: { title: 'Shop' },
	},
	OfferPage: {
		pageMetadata: { title: 'Offer' },
	},
	CartPage: {
		pageMetadata: { title: 'Cart' },
		cart: 'Cart',
		currency: 'EGP',
	},
	CheckoutPage: {
		pageMetadata: { title: 'Checkout' },
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
