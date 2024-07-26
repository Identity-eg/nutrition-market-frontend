import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';

import RatingStars from './rating-stars';
import { Separator } from 'components/ui/separator';
import Counter from './counter';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import Reviews from './reviews';
import { BeanOff, BookOpenText, DnaOff, Heart, WheatOff } from 'lucide-react';
import SimilarProducts from './similar-products';
import { getSingleProduct } from 'apis/server/products';
import ProductImages from './product-images';
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
			icon: <BookOpenText size={20} />,
			displayName: 'Description',
			name: 'description',
		},
		{
			id: '2',
			icon: <BookOpenText size={20} />,
			displayName: 'How to use',
			name: 'directionOfUse',
		},
	] as const;

	return (
		<div className='container py-10'>
			<div className='grid grid-cols-2 mb-24'>
				<div className='flex flex-col justify-center gap-6 p-6 border-r in self-baseline border-gray-50'>
					<ProductImages images={product.images} />

					<div>
						<p className='mb-4 typography-B16'>Allergen notice</p>
						<div className='flex gap-4 text-green-500'>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-4 mb-2 border border-green-500 rounded-full'>
									<BeanOff />
								</div>
								<span className='typography-M13'>Soy-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-4 mb-2 border border-green-500 rounded-full'>
									<WheatOff />
								</div>
								<span className='typography-M13'>Gluten-free</span>
							</div>
							<div className='flex flex-col items-center justify-center'>
								<div className='p-4 mb-2 border border-green-500 rounded-full'>
									<DnaOff />
								</div>
								<span className='typography-M13'>No-gmo</span>
							</div>
						</div>
					</div>
				</div>

				<div className='p-6'>
					<div className='mb-8 border-b border-gray-50 pb-[12px]'>
						<h2 className='mb-1 typography-SB24'>{product.name}</h2>

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

						<div className='text-green-500 typography-SB24'>
							{product.price} <span className='typography-R14'>EGP</span>
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
						<div>
							<h4 className='mb-2'>Concentration</h4>
							<div className='flex items-center gap-[8px]'>
								<Button variant='outline'>4000 IU</Button>
								<Button variant='ghost-green'>6000 IU</Button>
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
									<AccordionTrigger className='typography-B14'>
										<span className='flex items-center gap-2'>
											{category.icon}
											{category.displayName}
										</span>
									</AccordionTrigger>
									<AccordionContent>
										{parse(product[category.name])}
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			</div>

			<SimilarProducts productId={params.productId} />

			<Reviews
				productId={params.productId}
				averageRating={product.averageRating}
			/>
		</div>
	);
}
