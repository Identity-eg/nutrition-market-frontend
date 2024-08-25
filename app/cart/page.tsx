import { getCart } from 'apis/server/cart';
import { convertToReadableNumber } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from './component/cart-item';

export default async function Cart() {
	const cart = await getCart();

	const isCartEmpty = cart.items.length === 0;

	return (
		<div className='relative'>
			<div className='absolute inset-x-0 top-0 h-56 -z-10 bg-gray-20' />
			<div className='container flex flex-col h-screen gap-4 py-10'>
				<div>
					<h3 className='text-gray-800 typography-B24'>Shopping cart</h3>
					<p className='mb-8 text-gray-200 typography-R16'>
						Showing your choices product
					</p>
				</div>
				<div className='flex gap-8'>
					<div className='self-start flex-1 bg-white border rounded-lg border-gray-40'>
						{isCartEmpty ? (
							<div className='flex flex-col items-center justify-center gap-4 mt-8'>
								<Image
									src={''}
									width={500}
									height={500}
									className='w-1/12'
									alt='SVG logo image'
								/>
								<h1 className='text-center text-gray-800'>
									Your cart is empty
								</h1>
							</div>
						) : (
							<ul className='px-6 divide-y divide-gray-50'>
								{cart?.items.map(cartItem => (
									<CartItem
										key={cartItem._id}
										{...cartItem}
									/>
								))}
							</ul>
						)}
					</div>

					<div className='self-start flex min-w-[380px] flex-col justify-between rounded-lg border border-gray-40 bg-white p-6'>
						<h1 className='pb-4 mb-4 text-gray-800 capitalize border-b border-gray-40 typography-SB20'>
							Product summary
						</h1>

						<div className='pb-4 mb-4 text-gray-200 border-b border-gray-40'>
							<div className='flex items-center justify-between mb-2'>
								<p>Total Price</p>
								<span>
									{convertToReadableNumber(cart?.totalPrice)}
									EGP
								</span>
							</div>
							<div className='flex items-center justify-between mb-2'>
								<p>Total Price After Discount</p>
								<span>
									{convertToReadableNumber(cart?.totalPrice)}
									EGP
								</span>
							</div>
							<div className='flex items-center justify-between mb-2'>
								<p>Tax/Fee</p>
								<span>0 EGP</span>
							</div>
						</div>

						<div className='flex items-center justify-between mb-4 text-green-light-700 typography-R20'>
							<p className='text-gray-900'>Total Price</p>
							<span>
								{convertToReadableNumber(cart.totalPrice)}
								EGP
							</span>
						</div>
						<Link
							href='/checkout'
							className={`text-center ${
								isCartEmpty
									? 'pointer-events-none bg-gray-200 text-gray-400'
									: 'bg-green-500 text-white'
							} rounded-md py-3`}>
							Checkout
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
