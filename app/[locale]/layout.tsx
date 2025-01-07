import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

import BaseLayout from 'components/layout/base-layout';
import { routing } from 'i18n/routing';
import type { TLocale } from 'i18n/config';

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }));
}

type TProps = {
	children: ReactNode;
	params: { locale: string };
};

export default async function LocaleLayout({
	children,
	params: { locale },
}: TProps) {
	if (!routing.locales.includes(locale as TLocale)) {
		notFound();
	}
	// Enable static rendering
	setRequestLocale(locale);
	return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
