import { getCategories } from 'apis/server/category';
import Hero from './hero';
import booneHealthIcon from 'assets/icons/bone.svg';
import { BoneIcon } from 'assets/icons/bone-icon';
import { RespiratoryIcon } from 'assets/icons/respiratory-icon';
import { EyeIcon } from 'assets/icons/eye-icon';
import CarouselWrapper from './carousel-wrapper';
import { CarouselContent, CarouselItem } from 'components/ui/carousel';
import { Card } from 'components/ui/card';
import { HeartIcon } from 'assets/icons/heart-icon';
import { ImmuneIcon } from 'assets/icons/immune-icon';
import { NailsIcon } from 'assets/icons/nails-icon';
import { NervousIcon } from 'assets/icons/nervous-icon';
import { MaleIcon } from 'assets/icons/male-icon';
import { FemaleIcon } from 'assets/icons/female-icon';
import Link from 'next/link';

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

export default async function HomePage() {
	const categories = await getCategories();
	return (
		<section>
			<Hero />
			<div className='bg-primary'>
				<div className='sm:py-6 bg-green-500 py-6 text-center'>
					<h3 className='font-normal text-white'>
						Start Your Heath Recovery Vacation{' '}
						<span className='font-bold'>Now</span>
					</h3>
				</div>
			</div>
			<div className='container py-6'>
				<h3 className='mb-6 text-green-600 typography-B24'>
					Featured Category
				</h3>
				<CarouselWrapper
					opts={{ loop: true }}
					className='typography-B16'>
					<CarouselContent className='-ml-1'>
						{categories.categories.map(cat => {
							return (
								<CarouselItem
									key={cat._id}
									className='group basis-1/5 cursor-pointer'>
									<Link href={`/shop?category=${cat._id}`}>
										<Card className='flex aspect-square flex-col items-center justify-center gap-4 p-2 text-green-500'>
											<span className='transition-all group-hover:scale-110'>
												{iconMapper[cat.name]}
											</span>
											{cat.name}
										</Card>
									</Link>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</CarouselWrapper>
			</div>
		</section>
	);
}
