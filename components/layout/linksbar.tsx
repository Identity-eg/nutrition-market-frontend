import Link from 'next/link';
import parse from 'html-react-parser';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from 'components/ui/navigation-menu';

import { cn } from 'lib/utils';
import { getCategories } from 'apis/server/category';
import { getCompanies } from 'apis/server/company';

export async function Linksbar() {
	const categoriesData = await getCategories();
	const categories = categoriesData.categories.map(cat => ({
		_id: cat._id,
		label: cat.name,
		description: cat.description,
		to: `/categories/${cat.slug}`,
	}));

	const companiesData = await getCompanies();
	const companies = companiesData.companies.map(com => ({
		_id: com._id,
		label: com.name,
		description: com.description,
		to: `/companies/${com.slug}`,
	}));

	const mainLinks = [
		{ label: 'Home', to: '/' },
		{ label: 'Offers', to: '/shop/offers' },
		{ label: 'Categories', to: '/categories', children: categories },
		{ label: 'Brands', to: '/companies', children: companies },
	];

	return (
		<div className='hidden border-b border-gray-50 media-md:block'>
			<div className='container flex items-center'>
				<NavigationMenu>
					<NavigationMenuList>
						{mainLinks.map((link, idx, arr) => {
							if (link.children) {
								return (
									<NavigationMenuItem
										key={link.label}
										className='typography-M14 hover:text-orange-700'>
										<NavigationMenuTrigger>
											<Link href={link.to}>{link.label}</Link>
										</NavigationMenuTrigger>

										<NavigationMenuContent
											className={cn('grid list-none gap-4 p-4', {
												'grid-cols-2 media-lg:grid-cols-3':
													arr[idx].children && arr[idx].children?.length < 13,
												'grid-cols-3 media-lg:grid-cols-4':
													arr[idx].children &&
													arr[idx].children?.length > 12 &&
													arr.length < 21,
												'grid-cols-4 media-lg:grid-cols-5':
													arr[idx].children && arr[idx].children?.length > 20,
											})}>
											{link.children?.map(child => {
												return (
													<li key={child._id}>
														<NavigationMenuLink asChild>
															<Link
																href={child.to}
																className={cn(
																	'block cursor-pointer select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-20 focus:bg-gray-20'
																)}>
																<div className='text-sm font-medium leading-none'>
																	{child.label}
																</div>
																<p className='line-clamp-2 text-xs leading-snug text-gray-100'>
																	{parse(child.description)}
																</p>
															</Link>
														</NavigationMenuLink>
													</li>
												);
											})}
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							} else {
								return (
									<NavigationMenuItem
										key={link.label} //[#bc6c25]
										className='typography-M14 hover:text-orange-700'>
										<Link
											href={link.to}
											legacyBehavior
											passHref>
											<NavigationMenuLink
												className={navigationMenuTriggerStyle()}>
												{link.label}
												{link.label === 'Offers' && (
													<span className='ms-2 rounded-full bg-red-500 px-2 text-white typography-R12'>
														Up to 50%
													</span>
												)}
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								);
							}
						})}
					</NavigationMenuList>
				</NavigationMenu>
			</div>
		</div>
	);
}
