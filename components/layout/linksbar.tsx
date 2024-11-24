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
import { getTopSellingCategories } from 'apis/server/category';

export async function Linksbar() {
	const data = await getTopSellingCategories({ limit: 7 });
	const popularCategories = data.categories.map(cat => ({
		label: cat.category.name,
		to: `/categories/${cat.category.slug}`,
	}));
	const mainLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Offers', to: '/shop' },
	];

	return (
		<div className='hidden border-b border-gray-50 media-md:block'>
			<div className='container flex items-center'>
				{/* <NavigationMenu>
					<NavigationMenuList>
						{mainLinks.concat(popularCategories).map(link => {
							if (link.children) {
								return (
									<NavigationMenuItem key={link.label}>
										<NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>

										<NavigationMenuContent className='grid grid-cols-2 gap-4 p-4'>
											{link.children?.map(child => {
												return (
													<Link
														key={child.label}
														href={child.to}
														legacyBehavior
														passHref>
														<NavigationMenuLink
															className={navigationMenuTriggerStyle()}>
															{child.label}
														</NavigationMenuLink>
													</Link>
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
				</NavigationMenu> */}
				{mainLinks.concat(popularCategories).map(link => (
					<Link
						key={link.label}
						href={link.to}
						className={cn(
							'px-4 py-4 transition-all typography-M14 hover:text-[#bc6c25]'
						)}>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
}
