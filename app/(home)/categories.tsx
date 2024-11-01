import { getCategories } from 'apis/server/category';
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
	'Bone Health': <BoneIcon />,
	'Eye Health': <EyeIcon />,
	'Respiratory Health': <RespiratoryIcon />,
	'Heart Health': <HeartIcon />,
	'Immune Health': <ImmuneIcon />,
	'Hair, Skin, Nails Health': <NailsIcon />,
	'Nervous System Health': <NervousIcon />,
	'Man Health': <MaleIcon />,
	'Woman Health': <FemaleIcon />,
};

export default async function Categories() {
	const categories = await getCategories();
	return (
		<div className='container py-10'>
			<h3 className='mb-6 flex flex-col items-center text-green-800 typography-B18 media-sm:gap-4 media-md:flex-row'>
				<span>Featured Category</span>
				<span className='text-gray-100 typography-R14'>
					New products with updated stocks.
				</span>
			</h3>
			<CarouselWrapper
				opts={{ loop: true }}
				className='typography-SB16'>
				<CarouselContent className='-ml-1'>
					{categories.categories.map(cat => {
						return (
							<CarouselItem
								key={cat._id}
								className='group basis-1/2 cursor-pointer media-sm:basis-1/3 media-md:basis-1/4 media-lg:basis-1/6'>
								<Link href={`/shop?category=${cat._id}`}>
									<Card className='flex aspect-square flex-col items-center justify-center gap-4 p-2 text-[#bc6c25] transition-all group-hover:border-[#bc6c25]'>
										<span className='transition-all group-hover:scale-110'>
											{iconMapper[cat.name]}
										</span>
										<span className='text-center text-gray-700'>
											{cat.name}
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
