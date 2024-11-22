'use client';

import NavLink from 'next/link';
import { useRouter } from 'next/navigation';

export const Link: typeof NavLink = ({ children, ...props }) => {
	const router = useRouter();
	return (
		<NavLink
			prefetch={false}
			onMouseEnter={() => {
				router.prefetch(String(props.href));
			}}
			onMouseDown={e => {
				const url = new URL(String(props.href), window.location.href);
				if (
					url.origin === window.location.origin &&
					e.button === 0 &&
					!e.altKey &&
					!e.ctrlKey &&
					!e.metaKey &&
					!e.shiftKey
				) {
					e.preventDefault();
					router.push(String(props.href));
				}
			}}
			{...props}>
			{children}
		</NavLink>
	);
};
