import Image from 'next/image';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';
// UI
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { ProfileDropdown } from './profileDropDown';
// Utils
import biovacLogo from 'assets/logo.png';
import { CartSidebar } from './cartSidebar';
import { getMe } from 'features/auth/api/user';
import { Searchbar } from './search/searchbar';
import { Suspense } from 'react';

export default async function HeaderLayout() {
	const user = await getMe();
	return (
		<>
			<nav className='max-h-fit border-b border-gray-50'>
				<div className='container flex items-center justify-between gap-2 py-4'>
					<MenuIcon className='text-green-500 media-md:hidden' />

					<Link
						href='/'
						className='ml-10 w-32 flex-shrink-0 media-md:ml-0'>
						<Image
							className='h-full w-full'
							alt='Biovac pharmacy supplements'
							src={biovacLogo}
							width={200}
						/>
					</Link>
					<Suspense>
						<Searchbar className='hidden media-md:block' />
					</Suspense>

					<div className='text-black-3 hidden items-center gap-6 media-md:flex'>
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
					{/* <div className='flex gap-2 media-md:hidden'>
						<SearchIcon className='text-green-500' />
						<Separator
							orientation='vertical'
							className='h-6'
						/>
						<CartSidebar contentClassName='w-full' />
					</div> */}
				</div>
			</nav>
		</>
	);
}
