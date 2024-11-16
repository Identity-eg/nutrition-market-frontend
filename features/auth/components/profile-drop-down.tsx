import Link from 'next/link';
import { ChevronDown, CircleUserRound, LogOutIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { LogoutButton } from 'features/auth/components/logout-button';
import { loggedinLinks } from 'constants/navLinks';
import type { TUser } from 'features/auth/types/user';

export function ProfileDropdown({ user }: { user: TUser }) {
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
					{loggedinLinks.map(link => (
						<DropdownMenuItem className='gap-x-4'>
							<link.Icon
								size={18}
								className='text-gray-400'
							/>
							<Link href={link.to}>{link.label}</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogoutButton className='gap-x-4 text-red-500 focus:bg-red-30 focus:text-red-500'>
						<LogOutIcon size={16} />
						Log out
					</LogoutButton>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
