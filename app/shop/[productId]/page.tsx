import React from 'react';
import Link from 'next/link';
import { Button } from 'components/ui/button';
import vitaminD3Image from 'assets/vitamin-d3.png';
import Image from 'next/image';
import RatingStars from './rating-stars';
import { Separator } from 'components/ui/separator';
import Counter from './counter';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { Checkbox } from 'components/ui/checkbox';
import Reviews from './reviews';
import { BeanOff, BookOpenText, DnaOff, Heart, WheatOff } from 'lucide-react';
import CardItem from './card-item';
// import { Button } from '@/app/ui/components/button';

export default function ProductPage() {
	return (
		<>
			<div className="mb-24 grid grid-cols-2">
				<div className="in flex flex-col justify-center gap-6 self-baseline border-r border-gray-50 p-6">
					<div className="self-center">
						<Image
							width={220}
							alt="Product image"
							src={vitaminD3Image}
						/>
					</div>
					<div className="flex w-full gap-2 self-start border-b border-gray-50 pb-8">
						{[0, 1]?.map(image => (
							<div
								key={image}
								className={`h-[70px] w-[70px] cursor-pointer overflow-hidden rounded-md border p-2 ${
									image === 0 ? 'border-green-400' : 'border-gray-50'
								}`}
								// onClick={() => {
								// 	dispatch(setShownPicture(image));
								// }}
							>
								<Image
									width={100}
									height={100}
									className="h-full w-full object-contain"
									src={vitaminD3Image}
									alt=""
								/>
							</div>
						))}
					</div>
					<div>
						<p className="mb-4 typography-B16">Allergen notice</p>
						<div className="flex gap-4 text-green-500">
							<div className="flex flex-col items-center justify-center">
								<div className="mb-2 rounded-full border border-green-500 p-4">
									<BeanOff />
								</div>
								<span className="typography-M13">Soy-free</span>
							</div>
							<div className="flex flex-col items-center justify-center">
								<div className="mb-2 rounded-full border border-green-500 p-4">
									<WheatOff />
								</div>
								<span className="typography-M13">Gluten-free</span>
							</div>
							<div className="flex flex-col items-center justify-center">
								<div className="mb-2 rounded-full border border-green-500 p-4">
									<DnaOff />
								</div>
								<span className="typography-M13">No-gmo</span>
							</div>
						</div>
					</div>
				</div>

				<div className="p-6">
					<div className="mb-8 border-b border-gray-50 pb-[12px]">
						<h2 className="mb-1 typography-SB24">Vitapolygon - omega 3</h2>

						<div className="mb-6 flex items-center gap-4 text-gray-200 typography-R14">
							<RatingStars averageRating={4} />

							<Separator
								orientation="vertical"
								className="h-4"
							/>

							<span>1 reviews</span>

							<Separator
								orientation="vertical"
								className="h-4"
							/>

							<Link
								className="hover:underline"
								href="#"
							>
								write a review
							</Link>
						</div>

						<div className="text-green-500 typography-SB24">
							350 <span className="typography-R14">EGP</span>
						</div>
					</div>

					<div className="flex h-[350px] flex-col border-b border-gray-50 pb-8">
						<div className="mb-[20px]">
							<h4 className="mb-2">Count</h4>
							<div className="flex items-center gap-[8px]">
								<Button variant="ghost-green">60 Caps</Button>
								<Button variant="outline">
									30 Caps
									<div className="ml-2 rounded-full bg-red-500 px-2 text-white typography-R14">
										Save 80 EGP
									</div>
								</Button>
							</div>
						</div>
						<div>
							<h4 className="mb-2">Concentration</h4>
							<div className="flex items-center gap-[8px]">
								<Button variant="outline">4000 IU</Button>
								<Button variant="ghost-green">6000 IU</Button>
							</div>
						</div>

						<div className="mt-auto flex w-[80%] gap-2">
							<Button className="w-full">Add to cart</Button>
							<Counter itemAmount={1} />
						</div>
					</div>

					<Accordion
						type="multiple"
						className="w-full"
					>
						<AccordionItem value="company">
							<AccordionTrigger className="typography-B14">
								<span className="flex items-center gap-2">
									<Heart size={20} />
									Key Benfits
								</span>
							</AccordionTrigger>
							<AccordionContent className="space-y-2">
								aaaaaaaa
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="dosageForm">
							<AccordionTrigger className="typography-B14">
								<span className="flex items-center gap-2">
									<BookOpenText size={20} />
									Description
								</span>
							</AccordionTrigger>
							<AccordionContent>
								Helps improve nitric oxide levels in the body <br />
								Supports improved energy, endurance & performance
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>

			<div>
				<div className="mb-6 flex items-center justify-between">
					<h3 className="typography-M16">Related products</h3>
					<Link
						className="typography-R14 hover:underline"
						href="/shop"
					>
						See all
					</Link>
				</div>
				<div className="mb-10 flex items-center gap-4">
					{[1, 1, 1, 1].map(card => (
						<CardItem />
					))}
				</div>
			</div>

			<Reviews />
		</>
	);
}
