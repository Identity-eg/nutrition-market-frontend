import type { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
	return (
		<section className='h-full min-h-[70vh] py-12 media-md:flex media-md:items-center media-md:justify-center'>
			{children}
		</section>
	);
}
