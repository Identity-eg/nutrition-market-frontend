import {
	MessageCircleQuestionIcon,
	SendToBackIcon,
	UserRoundPenIcon,
} from 'lucide-react';

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
