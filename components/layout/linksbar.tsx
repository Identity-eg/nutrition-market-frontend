'use client';

import { navLinks } from 'constants/navLinks';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu';

export function Linksbar() {
	const pathname = usePathname();
	return (
		<div className='hidden border-b border-gray-50 media-md:block'>
			<div className='container flex items-center'>
				<NavigationMenu>
					<NavigationMenuList>
						{navLinks.map(link => {
							if (link.children) {
								return (
									<NavigationMenuItem key={link.label}>
										<NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>

										<NavigationMenuContent className='grid grid-cols-2 gap-4 p-4'>
											{link.children?.map(child => {
												return (
													<NavigationMenuLink
														href={child.to}
														key={child.label}>
														{child.label}
													</NavigationMenuLink>
												);
											})}
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							} else {
								return (
									<NavigationMenuItem key={link.label}>
										<Link
											href='/shop'
											legacyBehavior
											passHref>
											<NavigationMenuLink
												className={navigationMenuTriggerStyle()}>
												{link.label}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								);
							}
						})}
					</NavigationMenuList>
				</NavigationMenu>
				{/* {navLinks.map(link => (
					<Link
						key={link.id}
						href={link.path}
						className={cn(
							'px-4 py-4 transition-all typography-M14 hover:text-[#bc6c25]',
							pathname === link.path && 'text-[#bc6c25]'
						)}>
						{link.label}
					</Link>
				))} */}
			</div>
		</div>
	);
}
