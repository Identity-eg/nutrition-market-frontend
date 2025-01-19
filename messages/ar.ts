import authAr from './auth/ar';
import homeAr from './home/ar';

const ar = {
	LayoutMetadata: {
		title: {
			template: '%s | ماركت التغذية',
			default: 'ماركت التغذية',
		},
		description: 'المكملات الغذائية | الأختيار الأول لصحتك',
		applicationName: 'ماركت التغذية',
	},
	LocaleSwitcher: {
		label: '{locale, select, ar {عربي} en {English} other {Unknown}}',
	},
	...authAr,
	...homeAr,
	ShopPage: {
		pageMetadata: 'منتجاتنا',
	},
	OfferPage: {
		pageMetadata: 'العروض',
	},
	CartPage: {
		pageMetadata: 'عربة التسوق',
		cart: 'عربة التسوق',
		currency: 'ج.م',
	},
	Filter: {
		filter: 'الفلتر',
		brand: 'العلامة التجارية',
		category: 'الفئة',
		price: 'السعر',
		rating: 'التقيم',
		dosageForm: 'شكل المنتج',
		from: 'من',
		to: 'إلي',
		apply: 'فلتر',
		clear: 'مسح',
		clearAll: 'مسح الكل',
	},
};
export default ar;
