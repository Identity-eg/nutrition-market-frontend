import { CashIcon } from 'assets/icons/cash-icon';
import { VisaIcon } from 'assets/icons/visa-icon';
import { WalletIcon } from 'assets/icons/wallet-icon';

export type TOrderStatus = keyof typeof ORDER_STATUS;
export const ORDER_STATUS = {
	processing: 'processing',
	shipped: 'shipped',
	delivered: 'delivered',
	canceled: 'canceled',
} as const;

export const IMAGES_PATHS = {
	hero: 'hero',
} as const;

export const PAYMENT_METHODS_IDS = {
	cashOnDelivery: '1',
	AmrMasterCard: '4827863',
	HadyMasterCard: '3922403',
	wallet: '3925355',
} as const;

export const PAYMENT_METHODS = [
	'wallet',
	'cashOnDelivery',
	'masterCard',
] as const;

export const PAYMENT_METHODS_MAPPER = [
	{
		id: PAYMENT_METHODS_IDS.cashOnDelivery,
		name: 'Cash on delivery',
		Icon: CashIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.AmrMasterCard,
		name: 'Online Master Card - Amr',
		Icon: VisaIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.HadyMasterCard,
		name: 'Online Master Card - Hady',
		Icon: VisaIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.wallet,
		name: 'Mobile Wallet',
		Icon: WalletIcon,
	},
];

export const SORT_OPTIONS = [
	{
		label: 'best selling',
		value: '-sold',
	},
	{
		label: 'best customer rating',
		value: '-averageRating',
	},
	{
		label: 'Alphabetically, A-Z',
		value: 'name',
	},
	{
		label: 'Alphabetically, Z-A',
		value: '-name',
	},
	{
		label: 'Price, Low To High',
		value: 'price',
	},
	{
		label: 'Price, High To Low',
		value: '-price',
	},
	{
		label: 'Date, New To Old',
		value: '-createdAt',
	},
	{
		label: 'Date, Old To New',
		value: 'createdAt',
	},
];
