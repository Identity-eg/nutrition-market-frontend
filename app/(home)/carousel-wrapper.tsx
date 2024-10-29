'use client';

import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselProps } from 'components/ui/carousel';

export default function CarouselWrapper(
	props: React.HTMLAttributes<HTMLDivElement> & CarouselProps
) {
	return (
		<Carousel
			plugins={[
				Autoplay({
					delay: 3000,
				}),
			]}
			{...props}
		>
			{props.children as React.ReactNode}
		</Carousel>
	);
}
