import { Home, ShoppingCart } from 'lucide-react';

export const navLinks = [
	{
		label: 'Home',
		path: '/',
		icon: Home,
		children: [
			{ label: 'home1', to: '/shop' },
			{ label: 'home2', to: '/shop' },
			{ label: 'home3', to: '/shop' },
			{ label: 'home4', to: '/shop' },
		],
	},
	{ label: 'Shop', path: '/shop', icon: ShoppingCart },
];
