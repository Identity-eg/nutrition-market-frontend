import {
	MessageCircleQuestionIcon,
	SendToBackIcon,
	UserRoundPenIcon,
} from 'lucide-react';

export const navLinks = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Shop',
		to: '/shop',
		children: [
			{ label: 'home1', to: '/shop', children: [{ label: '22', to: '/shop' }] },
			{ label: 'home2', to: '/shop' },
			{ label: 'home3', to: '/shop' },
			{ label: 'home4', to: '/shop' },
		],
	},
];

export const loggedinLinks = [
	{
		label: 'My Profile',
		to: '/profile',
		Icon: UserRoundPenIcon,
	},
	{
		label: 'My orders',
		to: '/orders',
		Icon: SendToBackIcon,
	},
	{
		label: 'Need Help ?',
		to: '/orders',
		Icon: MessageCircleQuestionIcon,
	},
];
