import Hero from './hero';
import Image from 'next/image';
import biotinImage from 'assets/biotin.png';
import { Button } from 'components/ui/button';
import promoImage from 'assets/promo.webp';
import { PaymentIcon } from 'assets/icons/payment-icon';
import { DeliveryIcon } from 'assets/icons/delivery-icon';
import { SaleIcon } from 'assets/icons/sale-icon';
import Companies from './companies';
import { Suspense } from 'react';
import BestSellerProducts from './best-seller-products';
import Categories from './categories';

const FEATURES = [
	{ title: 'Secure Payment', Icon: PaymentIcon },
	{ title: 'Fast Delivery', Icon: DeliveryIcon },
	{ title: 'New stocks and sales', Icon: SaleIcon },
];

export default async function HomePage() {
	return (
		<section>
			<Hero />
			<Suspense fallback='Categories Loading...'>
				<Categories />
			</Suspense>

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
			<Suspense fallback='Products Loading'>
				<BestSellerProducts />
			</Suspense>

			<Suspense fallback='Companies Loading'>
				<Companies />
			</Suspense>

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
							Enjoying something sweet and delicious shouldn&apos;t mean
							you&apos;ve lost track of your health and fitness goals. Premier
							Protein® packs powerful nutrition & amazing flavor into each one
							of its protein powders.
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
						<div className='flex'>
							<f.Icon className='size-[72px] object-contain' />
						</div>
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
