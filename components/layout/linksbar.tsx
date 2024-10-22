'use client';

import { navLinks } from 'constants/navLinks';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Linksbar() {
	const pathname = usePathname();
	return (
		<div className='hidden border-b border-gray-50 media-md:block'>
			<div className='container flex items-center'>
				{navLinks.map(link => (
					<Link
						key={link.id}
						href={link.path}
						className={cn(
							'px-4 py-4 transition-all typography-M14 hover:text-[#bc6c25]',
							pathname === link.path && 'text-[#bc6c25]'
						)}
					>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
}
