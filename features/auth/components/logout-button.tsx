'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { logout } from 'features/auth/api/auth';
import { useAction } from 'next-safe-action/hooks';
import { cn } from 'lib/utils';

export function LogoutButton({
	className,
	pending,
	...props
}: HTMLAttributes<HTMLButtonElement> & { pending?: JSX.Element }) {
	const { execute: executeLogout, isPending } = useAction(logout);
	if (isPending && pending) {
		return pending;
	}
	return (
		<button
			onClick={() => executeLogout()}
			className={cn('flex w-full items-center', className)}
			{...props}
		/>
	);
}
