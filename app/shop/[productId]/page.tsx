import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import { cn } from 'lib/utils';

import { Price } from 'components/utils/price';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';

import { getSingleProduct } from 'features/products/api/products';

import { ProductImages } from 'features/products/components/product-images';
import { Allergen } from 'features/products/components/allergen';
import { OtherIngredients } from 'features/products/components/other-ingredients';

import ActionBtns from 'features/products/components/action-btns';
import SimilarProducts from 'features/products/components/similar-products';

import Reviews from 'features/reviews/components';
import type { TSearchParams } from 'types/searchparams';

import { ProductInfo } from 'features/products/components/product-info';
import { ProductOptions } from 'features/products/components/product-options';
import { ProductAccordions } from 'features/products/components/product-accordions';
import { Circle } from 'lucide-react';
import { ProductsLoading } from 'features/products/components/products-loading';

export async function generateMetadata(props: {
	params: Promise<{ productId: string }>;
	searchParams: Promise<TSearchParams>;
}): Promise<Metadata> {
	const searchParams = await props.searchParams;
	const params = await props.params;
	const { productId } = params;

	const product = await getSingleProduct({ productId });
	const variant =
		product.variants.find(v => v._id.toString() === searchParams.variantId) ??
		product.variants[0];

	return {
		title: variant.name,
		description: product.description,
	};
}

export default async function ProductPage(props: {
	searchParams: Promise<TSearchParams>;
	params: Promise<{ productId: string }>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const variantId: string = searchParams.variant;

	const product = await getSingleProduct({ productId: params.productId });

	const variant =
		product.variants.find(v => v._id.toString() === variantId) ??
		product.variants[0];

	const productDetailsDesktop = (
		<div className='hidden grid-cols-2 media-md:grid'>
			<div className='flex flex-col justify-center gap-4 self-baseline border-r border-gray-50 pr-6'>
				<ProductImages images={variant.images} />
				<Allergen />
			</div>

			<div className='p-6'>
				<div className='mb-4 border-b border-gray-50'>
					<h2 className='mb-4 items-center justify-center text-green-500 typography-SB32'>
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

					<ProductInfo
						NFSA_REG_NO={product.NFSA_REG_NO}
						averageRating={product.averageRating}
						companyName={product.company.name}
						companySlug={product.company.slug}
						numReviews={product.numReviews}
					/>
				</div>

				<Price
					finalPriceClassName='typography-SB24'
					previousPriceClassName='text-gray-200'
					price={variant.price}
					priceAfterDiscount={variant.priceAfterDiscount}
				/>

				<div className='flex flex-col border-b border-gray-50 pb-8'>
					<ProductOptions
						currentVariant={variant}
						product={product}
						searchParams={searchParams}
					/>

					<div className='mb-10'>
						<h6 className='mb-2 typography-SB14'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='rounded-md border border-gray-40 px-4 py-1 text-gray-500'>
									<Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
								</Button>
							))}
						</ul>
					</div>
					<ActionBtns
						productId={product._id}
						companyId={product.company?._id}
						variantId={variant._id}
						quantity={variant.quantity}
					/>
				</div>

				<ProductAccordions product={product} />
			</div>
		</div>
	);

	const productDetailsMobile = (
		<div className='media-md:hidden'>
			<div className='mt-2'>
				<div className='mb-4 border-b border-gray-50'>
					<h2 className='mb-2 items-center justify-center text-green-500 typography-SB24'>
						{variant.name}
						<Circle
							size={10}
							className={cn(
								'ml-2 inline-block rounded-full',
								variant.quantity > 0
									? 'bg-green-light-500 text-green-light-500'
									: 'bg-red-500 text-red-500'
							)}
						/>
					</h2>

					<ProductInfo
						NFSA_REG_NO={product.NFSA_REG_NO}
						averageRating={product.averageRating}
						companyName={product.company.name}
						companySlug={product.company.slug}
						numReviews={product.numReviews}
					/>
				</div>
				<Price
					finalPriceClassName='typography-SB24'
					previousPriceClassName='text-gray-200'
					price={variant.price}
					priceAfterDiscount={variant.priceAfterDiscount}
				/>
				<div className='mb-4'>
					<ProductImages images={variant.images} />
				</div>
			</div>

			<div>
				<div className='mb-4 flex flex-col border-b border-gray-50 pb-4'>
					<ProductOptions
						currentVariant={variant}
						product={product}
						searchParams={searchParams}
					/>

					<div className='mb-10'>
						<h6 className='mb-2 typography-SB14'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='rounded-md border border-gray-40 px-4 py-1 text-gray-500'>
									<Link href={`/categories/${cat.slug}`}>{cat.name}</Link>
								</Button>
							))}
						</ul>
					</div>

					<ActionBtns
						productId={product._id}
						companyId={product.company?._id}
						variantId={variant._id}
						quantity={variant.quantity}
					/>
				</div>

				<Allergen />
				<Separator className='mt-4' />

				<ProductAccordions product={product} />
			</div>
		</div>
	);

	return (
		<div className='container pb-10'>
			{productDetailsDesktop}

			{productDetailsMobile}

			<Separator className='mb-6 mt-20' />

			<Suspense
				fallback={
					<div className=''>
						<h3 className='mb-6 typography-M16'>Related products</h3>
						<ProductsLoading number={5} />
					</div>
				}>
				<SimilarProducts productId={params.productId} />
			</Suspense>

			<Separator className='mb-6 mt-20' />

			<Suspense fallback='Loading'>
				<Reviews
					productId={params.productId}
					averageRating={product.averageRating}
				/>
			</Suspense>
		</div>
	);
}
