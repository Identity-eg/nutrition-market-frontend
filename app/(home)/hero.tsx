import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';

import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
} from 'components/ui/carousel';
import CarouselWrapper from './carousel-wrapper';
import { Button } from 'components/ui/button';

import { getHeroImages } from 'apis/server/hero';

export default async function Hero() {
	const { images } = await getHeroImages({ path: 'hero' });
	return (
		<CarouselWrapper
			className='container pt-10'
			opts={{ loop: true }}>
			<CarouselContent className='relative'>
				{images.map(img => (
					<CarouselItem
						key={img._id}
						className='relative h-[45vh] pl-0'>
						<div className='container absolute inset-0 flex flex-col justify-center p-10 media-sm:p-16'>
							<h3 className='mb-2 max-w-[20ch] leading-tight text-green-700 typo-SB-32-48'>
								{img.title}
							</h3>
							<span className='mb-8 max-w-[40ch] opacity-80 typo-R-[16-18]'>
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
							src={img.image.url}
							className='h-full w-full object-cover object-top'
							width={2000}
							height={2000}
						/>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselDots className='-bottom-2 rounded-full bg-white px-2 py-1' />
		</CarouselWrapper>
	);
}
