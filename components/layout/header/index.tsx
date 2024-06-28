'use client';

import Image from 'next/image';
import Link from 'next/link';
// UI
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ProfileDropdown } from './profileDropDown';
import { CartSidebar } from './cartSidebar';
// Utils
import biovacLogo from '@/assets/logo.png';
import { useAuthStore } from '@/store/auth';

export default function HeaderLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <nav className='border-b border-gray-2'>
        <div className='container flex items-center justify-between gap-2 py-4'>
          <div className='flex w-1/2 items-center gap-4'>
            <Link href='/' className='w-36'>
              <Image
                className='h-full w-full'
                alt='Biovac pharmacy supplements'
                src={biovacLogo}
                width={500}
              />
            </Link>
            <div className='hidden w-full md:block'>
              <Input placeholder='Explore vitamins, supplements, ...etc' />
            </div>
          </div>
          <div className='flex items-center gap-6 text-black-3'>
            <CartSidebar />
            <Separator orientation='vertical' className='h-6' />
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Button asChild size='sm'>
                <Link href='/login' className='cursor-pointer typography-M16'>
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
