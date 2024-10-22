'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

export function ClearAllBtn() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const isFilterFound = !!searchParams.size;

	if (!isFilterFound) return null;

	return (
		<Link
			href={pathname}
			className='text-red-500 typography-M12'
		>
			Clear all
		</Link>
	);
}
