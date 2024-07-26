import { getCart } from 'apis/server/cart';
import { buttonVariants } from 'components/ui/button';
import { Card } from 'components/ui/card';
import {
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from 'components/ui/carousel';
import { cn } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import CarouselWrapper from './carousel-wrapper';
import { getHeroImages } from 'apis/server/hero';

export default async function Hero() {
	const { images } = await getHeroImages({ path: 'hero' });
	return (
		<CarouselWrapper opts={{ loop: true }}>
			<CarouselContent className="-ml-0">
				{images.map((img, i) => (
					<CarouselItem
						key={img._id}
						className="sm:h-[60vh] h-[50vh] pl-0">
						<div className="relative">
							<Image
								alt=""
								src={img.image[0].url}
								className="sm:h-[60vh] h-[50vh] w-full object-cover"
								width={2000}
								height={2000}
							/>
							{/* className={Styles.overlay} */}
							{/* <div /> */}
							{/* <Card className="absolute inset-0 flex flex-col py-8 sm:py:32 lg:py-60">
										<h3 className="sm:text-6xl mb-4 max-w-[35ch] text-4xl font-bold text-white">
											{img.title}
										</h3>
										<p className="mb-12 max-w-[75ch] text-xl text-white">
											{img.description}
										</p>

										<Link
											href="/gates"
											className={cn([
												'self-start capitalize',
												buttonVariants({ variant: 'default' }),
											])}>
											take a tour
										</Link>
									</Card> */}
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="invisible sm:visible left-8" />
			<CarouselNext className="invisible sm:visible right-8" />
			<CarouselDots className="bottom-6" />
		</CarouselWrapper>
	);
}
