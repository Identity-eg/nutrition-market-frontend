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
	NotFoundPage: {
		title: 'الصفحة غير موجودة',
		description:
			'يبدو أنه لم يتم العثور على أي شيء في هذه الصفحة. ربما يمكنك محاولة البحث عما تبحث عنه؟',
		goHome: 'الرجوع إلي الصفحة الرئيسية',
	},
	...authAr,
	...homeAr,
	ShopPage: {
		pageMetadata: { title: 'منتجاتنا' },
	},
	OfferPage: {
		pageMetadata: { title: 'العروض' },
	},
	CartPage: {
		pageMetadata: { title: 'عربة التسوق' },
		cart: 'عربة التسوق',
		currency: 'ج.م',
	},
	CheckoutPage: {
		pageMetadata: {
			title: 'الدفع',
			description: '',
		},
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
