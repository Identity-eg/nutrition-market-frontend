import Image from 'next/image';
import Link from 'next/link';
// UI
import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import { Input } from 'components/ui/input';
import { ProfileDropdown } from './profileDropDown';
// Utils
import biovacLogo from 'assets/logo.png';
import { getCredential } from 'apis/helpers';
import { CartSidebar } from './cartSidebar';

export default async function HeaderLayout() {
	const credential = await getCredential();
	credential?.payload.name;
	return (
		<>
			<nav className='border-b border-gray-50'>
				<div className='container flex items-center justify-between gap-2 py-4'>
					<div className='flex w-1/2 items-center gap-4'>
						<Link
							href='/'
							className='w-36'>
							<Image
								className='h-full w-full'
								alt='Biovac pharmacy supplements'
								src={biovacLogo}
								width={500}
							/>
						</Link>
						<div className='md:block hidden w-full'>
							<Input placeholder='Explore vitamins, supplements, ...etc' />
						</div>
					</div>
					<div className='text-black-3 flex items-center gap-6'>
						<CartSidebar />
						<Separator
							orientation='vertical'
							className='h-6'
						/>
						{credential?.accessToken ? (
							<ProfileDropdown credential={credential} />
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
