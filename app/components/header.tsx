import Image from 'next/image';
import Link from 'next/link';
import { User } from 'lucide-react';

import biovacLogo from '@/app/assets/logo.png';
import { TextField } from '@/app/ui/components/text-field';
import Icon from '../ui/icons';

export function Header() {
    return (
        <>
            <nav className="border-gray-2 border-b">
                <div className="container flex items-center justify-between gap-[8px] py-4">
                    <div className="flex w-1/2 items-center gap-[16px]">
                        <Link href="/" className="w-[150px]">
                            <Image
                                className="h-full w-full"
                                alt="Biovac pharmacy supplements"
                                src={biovacLogo}
                                width={500}
                            />
                        </Link>
                        <div className="media-md:block hidden w-full">
                            <TextField placeholder="Explore vitamins, supplements, ...etc" />
                        </div>
                    </div>
                    <div className="text-black-3 flex items-center gap-6">
                        <div className="border-gray-2 flex h-12 items-center justify-center gap-2 rounded-md border px-4 py-2 text-[14px] font-semibold">
                            <Icon name="cart" />
                            <span>4</span>
                        </div>

                        <div className="border-gray-2 flex h-12 items-center gap-2 rounded-md border px-4 py-2 text-[14px] font-semibold">
                            <User />
                            <div className="flex flex-col">
                                <span className="text-gray-6">Welcome</span>
                                <span className="text-black-3">Hady</span>
                            </div>
                        </div>

                        <Link href="/login" className="cursor-pointer typography-M16">
                            Login
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}
