import { getCategories } from 'apis/server/category';
import Hero from './hero';
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
import { HandshakeIcon, MessagesSquareIcon, TruckIcon } from 'lucide-react';
import Image from 'next/image';
import biotinImage from 'assets/biotin.png';
import { Button } from 'components/ui/button';

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
			<div className='bg-green-500'>
				<div className='container flex justify-between py-6 text-white'>
					<div className='flex gap-2'>
						<HandshakeIcon
							className='text-[#dda15e]'
							size={32}
						/>
						<div>
							Secure payment
							<p className='text-start opacity-50 typography-R14'>
								This very good
							</p>
						</div>
					</div>
					<div className='flex gap-2'>
						<TruckIcon
							className='text-[#dda15e]'
							size={32}
						/>
						<div>
							Fast delivery
							<p className='text-start opacity-50 typography-R14'>
								This very good
							</p>
						</div>
					</div>
					<div className='flex gap-2'>
						<MessagesSquareIcon
							className='text-[#dda15e]'
							size={32}
						/>
						<div>
							Online Support
							<p className='text-start opacity-50 typography-R14'>
								This very good
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className='container py-10'>
				<h3 className='mb-6 text-green-600 typography-B20'>
					Featured Category
				</h3>
				<CarouselWrapper
					opts={{ loop: true }}
					className='typography-SB16'>
					<CarouselContent className='-ml-1'>
						{categories.categories.map(cat => {
							return (
								<CarouselItem
									key={cat._id}
									className='group basis-1/5 cursor-pointer'>
									<Link href={`/shop?category=${cat._id}`}>
										<Card className='flex aspect-square flex-col items-center justify-center gap-4 p-2 text-[#bc6c25]'>
											<span className='transition-all group-hover:scale-110'>
												{iconMapper[cat.name]}
											</span>
											<span className='text-center text-green-500'>
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
			<div className='container py-10'>
				<div className='grid grid-cols-2 items-center rounded-md bg-[#f8f4fe]'>
					<div className='p-6'>
						<Image
							alt=''
							width={400}
							height={400}
							className='mix-blend-multiply'
							src={biotinImage}
						/>
					</div>
					<div className='p-6'>
						<h3 className='mb-2 text-green-500 typography-B28'>
							Biotin 2500 mcg
						</h3>
						<p className='mb-6'>
							Enjoying something sweet and delicious shouldn't mean you've lost
							track of your health and fitness goals. Premier Protein® packs
							powerful nutrition & amazing flavor into each one of its protein
							powders.
						</p>
						<div className='flex gap-2'>
							<Button>Buy now</Button>
							<Button variant='outline'>See more</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
