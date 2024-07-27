import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';

import { RatingStars } from './components/rating-stars';
import { Separator } from 'components/ui/separator';
import Counter from './components/counter';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import Reviews from './reviews';
import {
	BeanOff,
	BookOpenText,
	Calendar,
	Check,
	CircleAlert,
	CircleCheck,
	DnaOff,
	Heart,
	WheatOff,
} from 'lucide-react';
import SimilarProducts from './similar-products';
import { getSingleProduct } from 'apis/server/products';
import ProductImages from './images';
import parse from 'html-react-parser';

export default async function ProductPage({
	params,
}: {
	params: { productId: string };
}) {
	const product = await getSingleProduct({ productId: params.productId });

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

	return (
		<div className='container pb-10'>
			<div className='grid grid-cols-2'>
				<div className='flex flex-col justify-center gap-6 p-6 border-r in self-baseline border-gray-50'>
					<ProductImages images={product.images} />

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
							{product.name}
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

						<div className='text-[#bc6c25] typography-SB32'>
							{product.price} <span className='typography-M16'>EGP</span>
						</div>
					</div>

					<div className='flex h-[350px] flex-col border-b border-gray-50 pb-8'>
						<div className='mb-[20px]'>
							<h4 className='mb-2'>Count</h4>
							<div className='flex items-center gap-[8px]'>
								<Button variant='ghost-green'>60 Caps</Button>
								<Button variant='outline'>
									30 Caps
									<div className='px-2 ml-2 text-white bg-red-500 rounded-full typography-R14'>
										Save 80 EGP
									</div>
								</Button>
							</div>
						</div>

						<div className='mt-auto flex w-[80%] gap-2'>
							<Button className='w-full'>Add to cart</Button>
							<Counter />
						</div>
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
