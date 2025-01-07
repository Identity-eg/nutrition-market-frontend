import { ReactNode } from 'react';
import { Inter, Noto_Kufi_Arabic } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Header } from 'components/layout/header';
import { Topbar } from 'components/layout/topbar';
import { Linksbar } from 'components/layout/linksbar';
import { Toaster } from 'components/ui/toaster';

import Footer from 'components/layout/footer';
import RTLdirection from './RTL-direction';
// import Navigation from '@/components/Navigation';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800'],
});

const notoKufiArabic = Noto_Kufi_Arabic({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '800'],
});

type Props = {
	children: ReactNode;
	locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
	const messages = await getMessages();
	return (
		<html
			lang={locale}
			dir={locale === 'ar' ? 'rtl' : 'ltr'}>
			<body
				className={`text-black ${locale === 'ar' ? notoKufiArabic.className : inter.className}`}>
				<NextIntlClientProvider messages={messages}>
					<RTLdirection>
						<Topbar />
						<Header />
						<Linksbar />
						<main className='min-h-[calc(100vh-150px)]'>{children}</main>
						<Footer />
						<Toaster />
					</RTLdirection>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
