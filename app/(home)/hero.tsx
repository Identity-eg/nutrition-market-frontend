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
		<CarouselWrapper
			className='container pt-10'
			opts={{ loop: true }}>
			<CarouselContent className='relative'>
				{images.map(img => (
					<CarouselItem
						key={img._id}
						className='relative h-[45vh] pl-0'>
						<div className='container absolute inset-0 flex flex-col justify-center p-[64px]'>
							<h3 className='typo-SB-32-48 mb-2 max-w-[20ch] leading-tight text-green-700'>
								{img.title}
							</h3>
							<span className='typo-R-[16-18] mb-8 max-w-[40ch] opacity-80'>
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
			{/* <CarouselPrevious
				variant='ghost-green'
				className='invisible left-[550px] media-sm:visible'
			/>
			<CarouselNext
				variant='ghost-green'
				className='invisible right-[550px] media-sm:visible'
			/> */}
			<CarouselDots className='-bottom-2 rounded-full bg-white px-2 py-1' />
		</CarouselWrapper>
	);
}
