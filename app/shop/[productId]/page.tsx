import React from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';
import {
	Calendar,
	Circle,
	CircleAlert,
	CircleCheck,
	RefrigeratorIcon,
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
import Price from '../components/card-item/price';
import ActionBtns from './components/action-btns';
import { cn } from 'lib/utils';
import { NutritionFacts } from './nutrition-facts';
import Allergen from './allergen';
import OtherIngredients from './other-ingredients';

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
	{
		id: '4',
		icon: (
			<RefrigeratorIcon
				size={20}
				strokeWidth={1.5}
			/>
		),
		displayName: 'Storage condition',
		name: 'storageConditions',
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
	console.log({ desc: product.description });

	const variant =
		product.variants.find(v => v._id === variantId) ?? product.variants[0];

	function setVariant(variantId: string) {
		if (!variantId) {
			manipulatedSp.delete('variant');
		} else {
			manipulatedSp.set('variant', variantId);
		}
		return `?${manipulatedSp.toString()}`;
	}

	return (
		<div className='container pb-10'>
			<div className='grid grid-cols-2'>
				<div className='in flex flex-col justify-center gap-6 self-baseline border-r border-gray-50 p-6'>
					<ProductImages images={variant.images} />
					<Allergen />
					<NutritionFacts nutritionFacts={product.nutritionFacts} />
					<OtherIngredients
						otherIngredients={product.nutritionFacts.otherIngredients}
					/>
				</div>

				<div className='p-6'>
					<div className='mb-8 border-b border-gray-50 pb-[12px]'>
						<h2 className='mb-1 inline-block items-center justify-center text-green-500 typography-SB32'>
							{variant.name}

							<Circle
								size={14}
								className={cn(
									'ml-4 inline-block rounded-full',
									variant.quantity > 0
										? 'bg-green-light-500 text-green-light-500'
										: 'bg-red-500 text-red-500'
								)}
							/>
						</h2>

						<div className='mb-6 flex items-center gap-4 text-gray-200 typography-R14'>
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
							finalPriceClassName='typography-SB24'
							price={variant.price}
							priceAfterDiscount={variant.priceAfterDiscount}
						/>
					</div>

					<div className='flex h-[350px] flex-col border-b border-gray-50 pb-8'>
						<div className='mb-[20px]'>
							<h4 className='mb-2'>Count</h4>
							<div className='flex items-center gap-[8px]'>
								{product.variants.map(va => (
									<Button
										key={va._id}
										asChild
										variant={
											variant._id === va._id ? 'ghost-green' : 'outline'
										}>
										<Link
											prefetch
											href={setVariant(va._id)}>
											{va.unitCount} Caps
										</Link>
									</Button>
								))}
							</div>
						</div>

						<ActionBtns
							productId={product._id}
							variantId={variant._id}
							quantity={variant.quantity}
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
										<span className='text flex items-center gap-2'>
											{category.icon}
											{category.displayName}
										</span>
									</AccordionTrigger>
									<AccordionContent className='leading-6 typography-R16 [&>ul]:ml-6 [&>ul]:list-disc'>
										{parse(product[category.name])}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>

			<Separator className='mb-6 mt-20' />

			<SimilarProducts productId={params.productId} />

			<Separator className='mb-6 mt-20' />

			<Reviews
				productId={params.productId}
				averageRating={product.averageRating}
			/>
		</div>
	);
}
