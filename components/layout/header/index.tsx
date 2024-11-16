import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { ProfileDropdown } from './profileDropDown';

import biovacLogo from 'assets/logo.png';
import { CartSidebar } from './cartSidebar';
import { getMe } from 'features/auth/api/user';
import { Searchbar } from './search/searchbar';
import { MobileMenu } from './mobile-menu';

export default async function HeaderLayout() {
	const user = await getMe();

	const desktop = (
		<div className='container hidden items-center justify-between gap-2 py-4 media-md:flex'>
			<Link
				href='/'
				className='ml-0 w-32 flex-shrink-0'>
				<Image
					className='h-full w-full'
					alt='Biovac pharmacy supplements'
					src={biovacLogo}
					width={200}
				/>
			</Link>
			<Suspense>
				<Searchbar />
			</Suspense>
			<div className='text-black-3 flex items-center gap-6'>
				<CartSidebar />
				<Separator
					orientation='vertical'
					className='h-6'
				/>
				{user ? (
					<ProfileDropdown user={user} />
				) : (
					<Button
						asChild
						size='sm'>
						<Link href='/login'>Login</Link>
					</Button>
				)}
			</div>
		</div>
	);

	const mobile = (
		<div className='container sticky top-0 flex items-center justify-between gap-2 py-4 media-md:hidden'>
			<MobileMenu />

			<Link
				href='/'
				className='ml-0 w-32 flex-shrink-0'>
				<Image
					className='h-full w-full'
					alt='Biovac pharmacy supplements'
					src={biovacLogo}
					width={200}
				/>
			</Link>

			{/* <Searchbar /> */}

			<CartSidebar />
		</div>
	);

	return (
		<nav className='max-h-fit border-b border-gray-50'>
			{desktop}
			{mobile}
		</nav>
	);
}
