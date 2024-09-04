import { getCart } from 'apis/server/cart';
import Image from 'next/image';
import { CartItem } from './component/cart-item';
import noCartFound from 'assets/no-cart-found.svg';
import { CartSummary } from './component/cart-summary';

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
							<div className='flex flex-col items-center justify-center gap-4 p-8'>
								<Image
									src={noCartFound}
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

					<CartSummary
						isCartEmpty={isCartEmpty}
						totalPrice={cart?.totalPrice}
					/>
				</div>
			</div>
		</div>
	);
}
