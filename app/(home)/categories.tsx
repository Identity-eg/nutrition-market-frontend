import { getTopSellingCategories } from 'apis/server/category';
import React from 'react';
import CarouselWrapper from './carousel-wrapper';
import { CarouselContent, CarouselItem } from 'components/ui/carousel';
import Link from 'next/link';
import { Card } from 'components/ui/card';
import { BoneIcon } from 'assets/icons/bone-icon';
import { RespiratoryIcon } from 'assets/icons/respiratory-icon';
import { EyeIcon } from 'assets/icons/eye-icon';
import { HeartIcon } from 'assets/icons/heart-icon';
import { ImmuneIcon } from 'assets/icons/immune-icon';
import { NailsIcon } from 'assets/icons/nails-icon';
import { NervousIcon } from 'assets/icons/nervous-icon';
import { MaleIcon } from 'assets/icons/male-icon';
import { FemaleIcon } from 'assets/icons/female-icon';

const iconMapper = {
	'bone-and-joint-health': <BoneIcon />,
	'eye-health': <EyeIcon />,
	'respiratory-health': <RespiratoryIcon />,
	'heart-health': <HeartIcon />,
	'immune-support': <ImmuneIcon />,
	'skin-hair-and-nails': <NailsIcon />,
	'nervous-system-health': <NervousIcon />,
	"men's-health": <MaleIcon />,
	"women's-health": <FemaleIcon />,
};

export default async function Categories() {
	const data = await getTopSellingCategories({ limit: 7 });

	return (
		<div className='container py-10'>
			<h3 className='mb-6 flex flex-col items-center text-green-800 typography-B18 media-sm:gap-4 media-md:flex-row'>
				<span>Featured Category</span>
				<span className='text-gray-100 typography-R14'>
					These categories feature top-selling products and trending items that
					everyone loves.
				</span>
			</h3>
			<CarouselWrapper
				opts={{ loop: true }}
				className='typography-SB16'>
				<CarouselContent className='-ml-1'>
					{data.categories.map(cat => {
						return (
							<CarouselItem
								key={cat._id}
								className='group basis-1/2 cursor-pointer media-sm:basis-1/3 media-md:basis-1/4 media-lg:basis-1/6'>
								<Link href={`/categories/${cat.category.slug}`}>
									<Card className='grid aspect-square grid-rows-[2fr_1fr] flex-col items-center justify-center gap-2 p-2 text-[#bc6c25] transition-all group-hover:border-[#bc6c25]'>
										<span className='place-self-center transition-all group-hover:scale-110'>
											{iconMapper[cat.category.slug as keyof typeof iconMapper]}
										</span>
										<span className='self-start text-center text-gray-700'>
											{cat.category.name}
										</span>
									</Card>
								</Link>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</CarouselWrapper>
		</div>
	);
}
