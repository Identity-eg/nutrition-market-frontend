'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function ClearAllBtn() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const t = useTranslations('Filter');

	const isFilterFound = !!searchParams.size;

	if (!isFilterFound) return null;

	return (
		<Link
			href={pathname}
			className='me-8 mt-0 text-red-500 typography-M12 media-md:me-0'>
			{t('clearAll')}
		</Link>
	);
}
