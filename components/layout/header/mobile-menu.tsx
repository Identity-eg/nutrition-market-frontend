import Link from 'next/link';
import { CircleUserRoundIcon, LogOutIcon, MenuIcon } from 'lucide-react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from 'components/ui/sheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { loggedinLinks } from 'constants/navLinks';
import { Separator } from 'components/ui/separator';
import { LogoutButton } from 'features/auth/components/logout-button';
import type { TUser } from 'features/auth/types/user';
import { getTopSellingCategories } from 'apis/server/category';

function MobileNavLink({
	link,
}: {
	link: {
		label: string;
		to: string;
	};
}) {
	return (
		<SheetClose asChild>
			<Link href={link.to}>
				<li className='rounded-md px-2 py-4 text-green-800 typography-R16 hover:bg-green-50'>
					{link.label}
				</li>
			</Link>
		</SheetClose>
	);
}

export async function MobileMenu({ user }: { user?: TUser }) {
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
		<Sheet>
			<SheetTrigger className='relative flex items-center gap-2 text-green-500'>
				<MenuIcon className='text-green-500' />
			</SheetTrigger>

			<SheetContent className='flex w-full flex-col'>
				<SheetHeader className='border-b border-gray-40 pb-4'>
					<SheetTitle>Menu</SheetTitle>
				</SheetHeader>

				<ul>
					{mainLinks.concat(popularCategories).map(link => {
						return (
							<MobileNavLink
								key={link.label}
								link={link}
							/>
						);
					})}
				</ul>

				<Separator className='bg-gray-40' />
				<ul>
					{user ? (
						<>
							{loggedinLinks.map(link => (
								<SheetClose
									key={link.label}
									asChild>
									<Link href={link.to}>
										<li className='flex items-center gap-2 rounded-md px-2 py-4 text-green-800 typography-R16 hover:bg-green-50'>
											<link.Icon className='text-green-500' />
											{link.label}
										</li>
									</Link>
								</SheetClose>
							))}
							<SheetClose className='w-full'>
								<LogoutButton className='gap-2 rounded-md px-2 py-4 text-green-800 typography-R16 hover:bg-green-50'>
									<LogOutIcon className='text-green-500' />
									Log out
								</LogoutButton>
							</SheetClose>
						</>
					) : (
						<SheetClose asChild>
							<Link href='/login'>
								<li className='flex items-center gap-2 rounded-md px-2 py-4 text-green-800 typography-R16 hover:bg-green-50'>
									<CircleUserRoundIcon className='text-green-500' />
									Login
								</li>
							</Link>
						</SheetClose>
					)}
				</ul>
			</SheetContent>
		</Sheet>
	);
}
