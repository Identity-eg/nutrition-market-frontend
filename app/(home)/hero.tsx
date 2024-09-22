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
import parse from 'html-react-parser';
import { Button } from 'components/ui/button';
import Link from 'next/link';

export default async function Hero() {
	const { images } = await getHeroImages({ path: 'hero' });
	return (
		<CarouselWrapper opts={{ loop: true }}>
			<CarouselContent className='relative -ml-0'>
				{images.map(img => (
					<CarouselItem
						key={img._id}
						className='relative h-[45vh] pl-0'>
						<div className='container absolute inset-0 flex flex-col justify-center'>
							<h3 className='mb-2 max-w-[20ch] leading-tight text-green-700 typography-SB52'>
								{img.title}
							</h3>
							<span className='mb-8 max-w-[40ch] opacity-80 typography-R18'>
								{parse(img.description)}
							</span>
							{img.relatedProduct && (
								<Button asChild>
									<Link
										className='self-start'
										href={`/shop/${img.relatedProduct}`}>
										Discover now
									</Link>
								</Button>
							)}
						</div>
						<Image
							alt=''
							src={img.image[0].url}
							className='h-full w-full object-cover object-top'
							width={2000}
							height={2000}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className='sm:visible invisible left-8' />
			<CarouselNext className='sm:visible invisible right-8' />
			<CarouselDots className='bottom-6' />
		</CarouselWrapper>
	);
}
