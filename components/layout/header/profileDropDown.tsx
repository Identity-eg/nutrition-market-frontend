'use client';

import {
	ChevronDown,
	CircleUserRound,
	LogOutIcon,
	UserIcon,
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
import { JWTPayload } from 'jose';
import { TUser } from 'types/user';

type TProfileDropdownProps = {
	credential: {
		accessToken: string;
		payload: TUser & JWTPayload;
	};
};

export function ProfileDropdown({ credential }: TProfileDropdownProps) {
	const logoutMutation = useLogout();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex cursor-pointer items-center gap-2 rounded-md text-sm font-semibold'>
					<CircleUserRound className='text-green-500' />
					<div className='flex max-w-20 flex-col items-start'>
						<span className='text-gray-100 typography-R14'>Welcome</span>
						<span className='line-clamp-1 flex items-center justify-center gap-1 capitalize text-black typography-M14'>
							{credential.payload.name.split(' ')[0]}
							<ChevronDown
								strokeWidth={1.5}
								size={16}
							/>
						</span>
					</div>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-52'>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						My orders
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent>
								<DropdownMenuItem>Email</DropdownMenuItem>
								<DropdownMenuItem>Message</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>More...</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='text-red-500 focus:bg-red-30 focus:text-red-500'
					onClick={() => {
						logoutMutation.mutate();
					}}>
					Log out
					<DropdownMenuShortcut>
						<LogOutIcon size={16} />
					</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
