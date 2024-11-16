import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
	Calendar,
	CheckCircle,
	Circle,
	CircleAlert,
	CircleCheck,
	PillBottleIcon,
	RefrigeratorIcon,
} from 'lucide-react';
import parse from 'html-react-parser';
import { cn } from 'lib/utils';
import { RatingStars } from 'components/ui/rating-stars';
import { Price } from 'components/utils/price';

import { Button } from 'components/ui/button';
import { Separator } from 'components/ui/separator';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';

import { getSingleProduct } from 'features/products/api/products';

import { ProductImages } from 'features/products/components/product-images';
import { Allergen } from 'features/products/components/allergen';
import { OtherIngredients } from 'features/products/components/other-ingredients';
import { NutritionFacts } from 'features/products/components/nutrition-facts';

import ActionBtns from 'features/products/components/action-btns';
import SimilarProducts from 'features/products/components/similar-products';

import Reviews from 'features/reviews/components';
import type { TSearchParams } from 'types/searchparams';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'components/ui/tooltip';

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

const accordionToDisplay = [
	{
		Icon: CircleCheck,
		displayName: 'Description',
		name: 'description',
	},
	{
		Icon: Calendar,
		displayName: 'How to use',
		name: 'directionOfUse',
	},
	{
		Icon: CircleAlert,
		displayName: 'Warnings',
		name: 'warnings',
	},
	{
		Icon: RefrigeratorIcon,
		displayName: 'Storage condition',
		name: 'storageConditions',
	},
	{
		Icon: PillBottleIcon,
		displayName: 'Nutrition facts',
		name: 'nutritionFacts',
	},
] as const;

type TOptions = {
	[key: string]: {
		[key: string]: string[];
	};
};

export default async function ProductPage(props: {
	searchParams: Promise<TSearchParams>;
	params: Promise<{ productId: string }>;
}) {
	const params = await props.params;
	const searchParams = await props.searchParams;
	const variantId: string = searchParams.variant;
	const manipulatedSp = new URLSearchParams(searchParams);

	const product = await getSingleProduct({ productId: params.productId });

	const options: TOptions = {
		count: {},
		flavor: {},
	};

	const addVariantToOptions = (
		key: string,
		variantId: string,
		options: TOptions[number]
	) => {
		if (!options[key]) {
			options[key] = [variantId];
		} else {
			options[key].push(variantId);
		}
	};

	product.variants.forEach(variant => {
		const { flavor, unitCount, _id } = variant;

		addVariantToOptions(flavor, _id, options.flavor);
		addVariantToOptions(`${unitCount}`, _id, options.count);
	});

	const variant =
		product.variants.find(v => v._id.toString() === variantId) ??
		product.variants[0];

	function setVariant(variantId: string) {
		if (!variantId) {
			manipulatedSp.delete('variant');
		} else {
			manipulatedSp.set('variant', variantId);
		}
		return `?${manipulatedSp.toString()}`;
	}

	const selectedOptions = {
		count: {
			option: variant.unitCount,
			otherVariantHasSameOption: options.count[variant.unitCount],
		},
		flavor: {
			option: variant.flavor,
			otherVariantHasSameOption: options.flavor[variant.flavor],
		},
	} as const;

	const productDetailsDesktop = (
		<div className='hidden grid-cols-2 media-md:grid'>
			<div className='flex flex-col justify-center gap-4 self-baseline border-r border-gray-50 pr-6'>
				<ProductImages images={variant.images} />
				<Allergen />
				<OtherIngredients
					otherIngredients={product.nutritionFacts.otherIngredients}
				/>
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

					<div className='mb-2 flex items-center gap-2 text-gray-200 typography-R14'>
						<RatingStars averageRating={product.averageRating} />

						<span className='rounded-md border border-gray-50 px-1 typography-R14'>
							{product.numReviews}
						</span>

						<Separator
							orientation='vertical'
							className='mx-2 h-4'
						/>

						<p>
							Store:{' '}
							<Link
								href={`/company/${product.company.slug}`}
								className='text-green-500 underline typography-SB13'>
								{product.company.name}
							</Link>
						</p>

						<Separator
							orientation='vertical'
							className='mx-2 h-4'
						/>

						<p>
							SKU:{' '}
							<span className='typography-SB13'>{product.NFSA_REG_NO}</span>
						</p>
					</div>
				</div>

				<Price
					finalPriceClassName='typography-SB24'
					previousPriceClassName='text-gray-200'
					price={variant.price}
					priceAfterDiscount={variant.priceAfterDiscount}
				/>

				<div className='flex flex-col border-b border-gray-50 pb-8'>
					{Object.entries(options).map(([category, optionsObject]) => {
						const hasOptions = Object.keys(optionsObject).some(key => key);
						if (!hasOptions) return null;

						const oppositCategory = category === 'flavor' ? 'count' : 'flavor';
						return (
							<div
								className='mb-4'
								key={category}>
								<h6 className='mb-2 capitalize typography-SB14'>{category}</h6>
								<div className='flex items-center gap-[8px]'>
									{Object.entries(optionsObject).map(
										([option, variantsIds]) => {
											const similarId = variantsIds.find(id =>
												selectedOptions[
													oppositCategory
												]?.otherVariantHasSameOption?.includes(id)
											);

											return (
												<TooltipProvider key={option}>
													<Tooltip
														open={!similarId ? undefined : false}
														delayDuration={0}>
														<TooltipTrigger asChild>
															<Button
																asChild
																variant={
																	variantsIds.includes(variant._id)
																		? 'ghost-green'
																		: 'outline'
																}
																className={cn(
																	!similarId &&
																		'border-0 bg-gray-30 text-gray-90 hover:bg-gray-30'
																)}>
																<Link
																	prefetch
																	href={setVariant(
																		similarId ?? variantsIds[0]
																	)}>
																	{option}
																</Link>
															</Button>
														</TooltipTrigger>
														<TooltipContent className='bg-[#5e548e] typography-R12'>
															Available on other {oppositCategory}
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											);
										}
									)}
								</div>
							</div>
						);
					})}

					<div className='mb-10'>
						<h6 className='mb-2 typography-SB14'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='rounded-md border border-gray-40 px-4 py-1 text-gray-500'>
									<Link href={`/shop?category=${cat._id}`}>{cat.name}</Link>
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

				<Accordion
					type='multiple'
					className='w-full'>
					{accordionToDisplay.map(category => {
						if (!product[category.name]) return;

						return (
							<AccordionItem
								key={category.name}
								value={category.name}>
								<AccordionTrigger className='typography-B16'>
									<span className='text flex items-center gap-2'>
										<category.Icon
											size={20}
											strokeWidth={1.5}
										/>

										{category.displayName}
									</span>
								</AccordionTrigger>
								<AccordionContent className='leading-6 typography-R16 [&>ul]:ml-6 [&>ul]:list-disc'>
									{category.name === 'nutritionFacts' ? (
										<NutritionFacts nutritionFacts={product.nutritionFacts} />
									) : (
										parse(product[category.name])
									)}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
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

					<div className='mb-2 flex items-center gap-2 text-gray-200 typography-R14'>
						<RatingStars averageRating={product.averageRating} />

						<span className='rounded-md border border-gray-50 px-1 typography-R14'>
							{product.numReviews}
						</span>

						<Separator
							orientation='vertical'
							className='mx-2 h-4'
						/>

						<p>
							Store:{' '}
							<Link
								href={`/company/${product.company.slug}`}
								className='text-green-500 underline typography-SB13'>
								{product.company.name}
							</Link>
						</p>

						<Separator
							orientation='vertical'
							className='mx-2 h-4'
						/>

						<p>
							SKU:{' '}
							<span className='typography-SB13'>{product.NFSA_REG_NO}</span>
						</p>
					</div>
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
					<div className='mb-4'>
						<h6 className='mb-2 typography-SB14'>Count</h6>
						<div className='flex items-center gap-[8px]'>
							{product.variants.map(va => (
								<Button
									key={va._id}
									asChild
									variant={variant._id === va._id ? 'ghost-green' : 'outline'}>
									<Link
										prefetch
										href={setVariant(va._id)}>
										{va.unitCount} Caps
									</Link>
								</Button>
							))}
						</div>
					</div>
					<div className='mb-10'>
						<h6 className='mb-2 typography-SB14'>Category: </h6>
						<ul className='flex flex-wrap items-center gap-2'>
							{product.category.map(cat => (
								<Button
									key={cat._id}
									asChild
									variant='outline'
									className='rounded-md border border-gray-40 px-4 py-1 text-gray-500'>
									<Link href={`/shop?category=${cat._id}`}>{cat.name}</Link>
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

				<Accordion
					type='multiple'
					className='mb-4 w-full'>
					{accordionToDisplay.map(category => {
						if (!product[category.name]) return;

						return (
							<AccordionItem
								key={category.name}
								value={category.name}>
								<AccordionTrigger className='typography-B16'>
									<span className='text flex items-center gap-2'>
										<category.Icon
											size={20}
											strokeWidth={1.5}
										/>

										{category.displayName}
									</span>
								</AccordionTrigger>
								<AccordionContent className='leading-6 typography-R16 [&>ul]:ml-6 [&>ul]:list-disc'>
									{category.name === 'nutritionFacts' ? (
										<NutritionFacts nutritionFacts={product.nutritionFacts} />
									) : (
										parse(product[category.name])
									)}
								</AccordionContent>
							</AccordionItem>
						);
					})}
				</Accordion>
				<OtherIngredients
					otherIngredients={product.nutritionFacts.otherIngredients}
				/>
			</div>
		</div>
	);

	return (
		<div className='container pb-10'>
			{productDetailsDesktop}

			{productDetailsMobile}

			<Separator className='mb-6 mt-20' />

			<Suspense fallback='Loading'>
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
