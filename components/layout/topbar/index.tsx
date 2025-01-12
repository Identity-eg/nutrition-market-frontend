import { useLocale } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Topbar() {
	const locale = useLocale();
	return (
		<nav className='bg-green-500'>
			<div className='container relative flex w-full items-center justify-center'>
				<div className='mx-auto py-2 text-center text-white typography-R14'>
					Free shipping for any order above 712 EGP
				</div>
				<LocaleSwitcher defaultLocale={locale} />
			</div>
		</nav>
	);
}
