export const locales = ['en', 'ar'] as const;
export type TLocale = (typeof locales)[number];
