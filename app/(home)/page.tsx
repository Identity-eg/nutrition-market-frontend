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
import { MoveRightIcon } from 'lucide-react';
import Image from 'next/image';
import biotinImage from 'assets/biotin.png';
import { Button } from 'components/ui/button';
import { getProducts } from 'apis/server/products';
import CardItem from 'app/shop/components/card-item';
import promoImage from 'assets/promo.webp';
import { getCompanies } from 'apis/server/company';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import BuildingPlaceholder from 'assets/icons/building-placeholder';
import { PaymentIcon } from 'assets/icons/payment-icon';
import { DeliveryIcon } from 'assets/icons/delivery-icon';
import { SaleIcon } from 'assets/icons/sale-icon';

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

const FEATURES = [
	{ title: 'Secure Payment', Icon: PaymentIcon },
	{ title: 'Fast Delivery', Icon: DeliveryIcon },
	{ title: 'New stocks and sales', Icon: SaleIcon },
];

export default async function HomePage() {
	const categories = await getCategories();
	const { companies } = await getCompanies();
	const { products } = await getProducts({});
	return (
		<section>
			<Hero />
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

			<div className='container'>
				<div className='relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-md border border-[#cae8f0] bg-[#f0faf9] p-4 text-center media-md:flex-row media-md:text-start'>
					<div>
						<h4 className='text-[#365486] typography-B20'>
							Your health & safety is our top priority
						</h4>
						<span className='text-gray-200 typography-R14'>
							The only supermarket that makes your life easier, makes you enjoy
							life and makes it better
						</span>
					</div>
					<Image
						src={promoImage}
						alt='Promo image'
						width={500}
						height={500}
						className='-top-10 right-4 w-[300px] media-md:absolute media-lg:w-[500px]'
					/>
				</div>
			</div>

			<div className='container py-10'>
				<div className='flex items-start justify-between'>
					<h3 className='mb-6 flex flex-col items-center text-center text-green-800 typography-B18 media-md:flex-row media-md:gap-4'>
						Best Seller{' '}
						<span className='text-gray-100 typography-R14'>
							Do not miss the current offers until the end of month.
						</span>
					</h3>
					<Button
						className='hidden gap-2 media-md:flex'
						variant='link'
						asChild>
						<Link href='/shop'>
							View All <MoveRightIcon size={16} />
						</Link>
					</Button>
				</div>
				<div
					className='col-span-2 grid divide-x divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 media-md:col-span-1'
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
					}}>
					{products.map(product => (
						<CardItem
							key={product._id}
							{...product}
						/>
					))}
				</div>
			</div>

			<div className='container py-10'>
				<h3 className='mb-6 flex flex-col items-center text-center text-green-800 typography-B18 media-md:flex-row media-md:gap-4'>
					Popular companies{' '}
					<span className='text-gray-100 typography-R14'>
						Shop the store by company
					</span>
				</h3>
				<div
					className='col-span-2 grid divide-x divide-gray-50 self-baseline overflow-hidden rounded-md border border-gray-50 media-md:col-span-1'
					style={{
						gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					}}>
					{companies.map(company => (
						<div
							key={company._id}
							className='flex items-center gap-4 p-4'>
							<Avatar className='size-16 rounded-md'>
								<AvatarImage />
								<AvatarFallback className='rounded-md bg-gray-30 text-gray-100'>
									<BuildingPlaceholder />
								</AvatarFallback>
							</Avatar>
							<div className='flex flex-col'>
								<Link
									href={`/shop?company=${company._id}`}
									className='typography-SB16 hover:underline'>
									{company.name}
								</Link>
								<span className='text-gray-200 typography-R14'>
									{company.slug}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='container py-10'>
				<div className='grid-cols-2 items-center rounded-md bg-[#f8f4fe] media-md:grid'>
					<div className='flex items-center justify-center p-6'>
						<Image
							alt=''
							width={300}
							height={300}
							className='w-full max-w-[300px] mix-blend-multiply'
							src={biotinImage}
						/>
					</div>
					<div className='p-6'>
						<h3 className='mb-2 text-[#593889] typography-B28'>
							Biotin 2500 mcg
						</h3>
						<p className='mb-6 text-gray-200'>
							Enjoying something sweet and delicious shouldn&apos;t mean you&apos;ve lost
							track of your health and fitness goals. Premier Protein® packs
							powerful nutrition & amazing flavor into each one of its protein
							powders.
						</p>
						<div className='flex gap-2'>
							<Button className='bg-[#593889] hover:bg-[#593889]/90'>
								Buy now
							</Button>
							<Button variant='outline'>See more</Button>
						</div>
					</div>
				</div>
			</div>

			<div className='container flex flex-wrap items-center justify-between py-10'>
				{FEATURES.map(f => (
					<div
						key={f.title}
						className='flex gap-4'>
						<f.Icon
						// width={32}
						// height={32}
						/>
						<div>
							<p className='mb-2 typography-SB16'>{f.title}</p>
							<p className='max-w-[25ch] text-gray-200'>
								Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.
							</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
