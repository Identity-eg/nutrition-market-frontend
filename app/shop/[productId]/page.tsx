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

					<div>
						<p className='mb-4 typography-B18'>Allergen notice</p>
						<div className='flex gap-4 text-green-500'>
							<div className='flex flex-col items-center justify-center'>
								<div className='mb-2 rounded-full border border-green-500 p-6'>
									<BeanOff />
								</div>
								<span className='typography-M16'>Soy-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='mb-2 rounded-full border border-green-500 p-6'>
									<WheatOff />
								</div>
								<span className='typography-M16'>Gluten-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='mb-2 rounded-full border border-green-500 p-6'>
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
							{variant.name}
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
									<AccordionContent className='leading-6 typography-R16'>
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
