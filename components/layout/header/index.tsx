import Image from 'next/image';
import Link from 'next/link';
// UI
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { ProfileDropdown } from './profileDropDown';
// Utils
import biovacLogo from 'assets/logo.png';
import { CartSidebar } from './cartSidebar';
import { getMe } from 'apis/server/user';
import { Searchbar } from './search/searchbar';

export default async function HeaderLayout() {
	const user = await getMe();
	return (
		<>
			<nav className='max-h-fit border-b border-gray-50'>
				<div className='container flex items-center justify-between gap-2 py-4'>
					<Link
						href='/'
						className='w-32 flex-shrink-0'>
						<Image
							className='h-full w-full'
							alt='Biovac pharmacy supplements'
							src={biovacLogo}
							width={200}
						/>
					</Link>

					<Searchbar />

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
			</nav>
		</>
	);
}
