import * as React from 'react';
import Image, { ImageProps } from 'next/image';

import { cn } from 'lib/utils';

const Advertisement = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div className='container py-10'>
		<div
			ref={ref}
			className={cn(
				'grid-cols-2 items-center rounded-md media-md:grid',
				className
			)}
			{...props}
		/>
	</div>
));
Advertisement.displayName = 'Advertisement';

const AdvertisementContent = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('p-6', className)}
		{...props}
	/>
));
AdvertisementContent.displayName = 'AdvertisementContent';

const AdvertisementTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn('mb-2 typography-B28', className)}
		{...props}
	/>
));
AdvertisementTitle.displayName = 'AdvertisementTitle';

const AdvertisementDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn('mb-6 text-gray-200', className)}
		{...props}
	/>
));
AdvertisementDescription.displayName = 'AdvertisementDescription';

const AdvertisementFooter = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex gap-2', className)}
		{...props}
	/>
));
AdvertisementFooter.displayName = 'AdvertisementFooter';

const AdvertisementImage = React.forwardRef<HTMLImageElement, ImageProps>(
	({ className, src, alt, ...props }, ref) => (
		<div className='flex items-center justify-center p-6'>
			<Image
				ref={ref}
				src={src}
				alt={alt}
				className={cn('w-full max-w-[300px] mix-blend-multiply', className)}
				{...props}
			/>
		</div>
	)
);
AdvertisementImage.displayName = 'AdvertisementImage';

export {
	Advertisement,
	AdvertisementImage,
	AdvertisementContent,
	AdvertisementTitle,
	AdvertisementDescription,
	AdvertisementFooter,
};
