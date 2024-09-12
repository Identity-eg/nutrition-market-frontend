import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from 'components/ui/carousel';
import Image from 'next/image';
import CarouselWrapper from './carousel-wrapper';
import { getHeroImages } from 'apis/server/hero';

export default async function Hero() {
	const { images } = await getHeroImages({ path: 'hero' });
	return (
		<CarouselWrapper opts={{ loop: true }}>
			<CarouselContent className='-ml-0'>
				{images.map(img => (
					<CarouselItem
						key={img._id}
						className='sm:h-[60vh] h-[50vh] pl-0'>
						<div className='relative'>
							<Image
								alt=''
								src={img.image[0].url}
								className='sm:h-[60vh] h-[50vh] w-full object-cover'
								width={2000}
								height={2000}
							/>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='sm:visible invisible left-8' />
			<CarouselNext className='sm:visible invisible right-8' />
			<CarouselDots className='bottom-6' />
		</CarouselWrapper>
	);
}
