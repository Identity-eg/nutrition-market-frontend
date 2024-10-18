'use client';

import {
	ChevronDown,
	CircleUserRound,
	LogOutIcon,
	MessageCircleQuestionIcon,
	SendToBackIcon,
	UserRoundPenIcon,
} from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { useLogout } from 'apis/auth';
import { TUser } from 'types/user';
import Link from 'next/link';

export function ProfileDropdown({ user }: { user: TUser }) {
	const logoutMutation = useLogout();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex cursor-pointer items-center gap-2 rounded-md text-sm font-semibold'>
					<CircleUserRound className='text-green-500' />
					<div className='flex max-w-20 flex-col items-start'>
						<span className='text-gray-100 typography-R14'>Welcome</span>
						<span className='line-clamp-1 flex items-center justify-center gap-1 capitalize text-black typography-M14'>
							{user.firstName}
							<ChevronDown
								strokeWidth={1.5}
								size={16}
							/>
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-44'>
				<DropdownMenuGroup>
					<DropdownMenuItem className='gap-x-4'>
						<UserRoundPenIcon
							size={18}
							className='text-gray-400'
						/>
						<Link href='/profile'>My Profile</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className='gap-x-4'>
						<SendToBackIcon
							size={18}
							className='text-gray-400'
						/>
						<Link href='/orders'>My orders</Link>
					</DropdownMenuItem>
					<DropdownMenuItem className='gap-x-4'>
						<MessageCircleQuestionIcon
							size={18}
							className='text-gray-400'
						/>
						<Link href='/orders'>
							Need Help ?<DropdownMenuShortcut></DropdownMenuShortcut>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='gap-x-4 text-red-500 focus:bg-red-30 focus:text-red-500'
					onClick={() => {
						logoutMutation.mutate();
					}}>
					<LogOutIcon size={16} />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
