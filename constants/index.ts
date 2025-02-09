import { CashIcon } from 'assets/icons/cash-icon';
import { VisaIcon } from 'assets/icons/visa-icon';
import { WalletIcon } from 'assets/icons/wallet-icon';

export type TOrderStatus = keyof typeof ORDER_STATUS;
export const ORDER_STATUS = {
	processing: 'processing',
	shipped: 'shipped',
	delivered: 'delivered',
	cancelled: 'cancelled',
} as const;

export const IMAGES_PATHS = {
	hero: 'hero',
} as const;

export const PAYMENT_METHODS_IDS = {
	cashOnDelivery: '1',
	masterCard: '4827863',
	wallet: '3925355',
} as const;


