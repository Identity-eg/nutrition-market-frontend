import * as React from 'react';
import { cn } from 'lib/utils';
import Image, { ImageProps } from 'next/image';

const Banner = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div className='container'>
		<div
			ref={ref}
			className={cn(
				'relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-md border p-4 text-center media-md:flex-row media-md:text-start',
				className
			)}
			{...props}
		/>
	</div>
));
Banner.displayName = 'Banner';

const BannerContent = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={className}
		{...props}
	/>
));
BannerContent.displayName = 'BannerContent';

const BannerTitle = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
	<h4
		ref={ref}
		className={cn('typography-B20', className)}
		{...props}
	/>
));
BannerTitle.displayName = 'BannerTitle';

const BannerDescription = React.forwardRef<
	HTMLParagraphElement,
	React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
	<span
		ref={ref}
		className={cn('text-gray-200 typography-R14', className)}
		{...props}
	/>
));
BannerDescription.displayName = 'BannerDescription';

const BannerImage = React.forwardRef<HTMLImageElement, ImageProps>(
	({ className, src, alt, ...props }, ref) => (
		<Image
			ref={ref}
			src={src}
			alt={alt}
			className={cn(
				'-top-10 end-4 w-[300px] media-md:absolute media-lg:w-[500px]',
				className
			)}
			{...props}
		/>
	)
);
BannerImage.displayName = 'BannerImage';

export { Banner, BannerImage, BannerContent, BannerTitle, BannerDescription };
