import { Card, CardDescription, CardTitle } from 'components/ui/card';
import type { ReactNode } from 'react';

type TCardAuthWrapper = {
	title: string;
	description: string;
	children: ReactNode;
};

export default function CardAuthWrapper({
	title,
	description,
	children,
}: TCardAuthWrapper) {
	return (
		<Card className="w-full border-0 p-0 media-md:max-w-[500px] media-md:border media-md:p-8">
			<CardTitle className="mb-[12px] typography-B24">{title}</CardTitle>
			<CardDescription className="mb-[32px]">{description}</CardDescription>
			{children}
		</Card>
	);
}
