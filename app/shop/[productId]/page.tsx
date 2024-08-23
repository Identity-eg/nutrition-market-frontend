import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import {
	BeanOff,
	Calendar,
	CircleAlert,
	CircleCheck,
	DnaOff,
	WheatOff,
} from 'lucide-react';
import { getSingleProduct } from 'apis/server/products';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';

import { TSearchParams } from 'app/shop/page';
import { RatingStars } from 'app/shop/[productId]/components/rating-stars';
import Reviews from 'app/shop/[productId]/reviews';
import SimilarProducts from 'app/shop/[productId]/similar-products';
import ProductImages from 'app/shop/[productId]/images';
import { TVariant } from 'types/product';
import AddToCartButton from '../components/card-item/add-to-cart-btn';
import { convertToReadableNumber } from 'lib/utils';
import Price from '../components/card-item/price';
import ActionBtns from './components/action-btns';

const accordionToDisplay = [
	{
		id: '1',
		icon: (
			<CircleCheck
				size={20}
				strokeWidth={1.5}
			/>
		),
		displayName: 'Description',
		name: 'description',
	},
	{
		id: '2',
		icon: (
			<Calendar
				size={20}
				strokeWidth={1.5}
			/>
		),
		displayName: 'How to use',
		name: 'directionOfUse',
	},
	{
		id: '3',
		icon: (
			<CircleAlert
				size={20}
				strokeWidth={1.5}
			/>
		),
		displayName: 'Warnings',
		name: 'warnings',
	},
] as const;

export default async function ProductPage({
	searchParams,
	params,
}: {
	searchParams: TSearchParams;
	params: { productId: string };
}) {
	const variantId: string = searchParams.variant;
	const manipulatedSp = new URLSearchParams(searchParams);

	const product = await getSingleProduct({ productId: params.productId });

	const defaultVariant = product.variants[0];

	const setVariant = (variantId: string) => {
		if (!variantId) {
			manipulatedSp.delete('variant');
		} else {
			manipulatedSp.set('variant', variantId);
		}
		return `?${manipulatedSp.toString()}`;
	};

	const variantsObj: Record<string, TVariant> = product.variants.reduce(
		(acc, variant) => {
			acc[variant._id] = variant;
			return acc;
		},
		{} as Record<string, TVariant>
	);

	return (
		<div className='container pb-10'>
			<div className='grid grid-cols-2'>
				<div className='flex flex-col justify-center gap-6 p-6 border-r in self-baseline border-gray-50'>
					<ProductImages
						images={variantsObj[variantId]?.images || defaultVariant.images}
					/>

					<div>
						<p className='mb-4 typography-B18'>Allergen notice</p>
						<div className='flex gap-4 text-green-500'>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-6 mb-2 border border-green-500 rounded-full'>
									<BeanOff />
								</div>
								<span className='typography-M16'>Soy-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-6 mb-2 border border-green-500 rounded-full'>
									<WheatOff />
								</div>
								<span className='typography-M16'>Gluten-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-6 mb-2 border border-green-500 rounded-full'>
									<DnaOff />
								</div>
								<span className='typography-M16'>No-gmo</span>
							</div>
						</div>
					</div>
				</div>

				<div className='p-6'>
					<div className='mb-8 border-b border-gray-50 pb-[12px]'>
						<h2 className='mb-1 text-green-500 typography-SB32'>
							{variantsObj[variantId]?.name || defaultVariant.name}
						</h2>

						<div className='flex items-center gap-4 mb-6 text-gray-200 typography-R14'>
							<RatingStars averageRating={product.averageRating} />

							<Separator
								orientation='vertical'
								className='h-4'
							/>

							<span>{product.numReviews} reviews</span>

							<Separator
								orientation='vertical'
								className='h-4'
							/>

							<Link
								className='hover:underline'
								href='#'>
								write a review
							</Link>
						</div>
						<Price
							price={variantsObj[variantId]?.price || defaultVariant.price}
							priceAfterDiscount={
								variantsObj[variantId]?.priceAfterDiscount ||
								defaultVariant.priceAfterDiscount
							}
						/>
					</div>

					<div className='flex h-[350px] flex-col border-b border-gray-50 pb-8'>
						<div className='mb-[20px]'>
							<h4 className='mb-2'>Count</h4>
							<div className='flex items-center gap-[8px]'>
								{product.variants.map(variant => (
									<Button
										key={variant._id}
										asChild
										variant={
											(variantId ?? defaultVariant._id) === variant._id
												? 'ghost-green'
												: 'outline'
										}>
										<Link
											prefetch
											href={setVariant(variant._id)}>
											{variant.unitCount} Caps
										</Link>
									</Button>
								))}
							</div>
						</div>

						<ActionBtns
							productId={product._id}
							variantId={variantId || defaultVariant._id}
							quantity={
								variantsObj[variantId]?.quantity || defaultVariant.quantity
							}
						/>
					</div>

					<Accordion
						type='multiple'
						className='w-full'>
						{accordionToDisplay.map(category => {
							if (!product[category.name]) return;

							return (
								<AccordionItem
									key={product.description}
									value={category.name}>
									<AccordionTrigger className='typography-B16'>
										<span className='flex items-center gap-2 text'>
											{category.icon}
											{category.displayName}
										</span>
									</AccordionTrigger>
									<AccordionContent className='leading-6 typography-R16'>
										{parse(product[category.name])}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>

			<Separator className='mt-20 mb-6' />

			<SimilarProducts productId={params.productId} />

			<Separator className='mt-20 mb-6' />

			<Reviews
				productId={params.productId}
				averageRating={product.averageRating}
			/>
		</div>
	);
}
