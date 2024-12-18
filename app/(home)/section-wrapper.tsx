import Link from 'next/link';
import type { ReactNode } from 'react';
import { MoveRightIcon } from 'lucide-react';

import { Button } from 'components/ui/button';

export default function SectionWrapper({
	title,
	description,
	href,
	children,
}: {
	title: string;
	description: string;
	href: string;
	children: ReactNode;
}) {
	return (
		<section className='container space-y-4 py-10'>
			<div className='flex items-end justify-between'>
				<h3 className='flex flex-col items-center text-center text-green-800 typography-B18 media-sm:gap-4 media-md:flex-row'>
					{title}
					<span className='text-gray-100 typography-R14'>{description}</span>
				</h3>
				<Button
					className='h-auto shrink-0 gap-2 px-0 media-md:flex'
					variant='link'
					asChild>
					<Link href={href}>
						View All <MoveRightIcon size={16} />
					</Link>
				</Button>
			</div>
			{children}
		</section>
	);
}
