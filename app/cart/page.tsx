import Image from 'next/image';
import noCartFound from 'assets/no-cart-found.svg';
import { CartItem } from 'features/cart/components/cart-item';
import { CartSummary } from 'features/cart/components/cart-summary';
import { getCart } from 'features/cart/api/cart';

export default async function Cart() {
	const cart = await getCart();

	const isCartEmpty = cart.items.length === 0;

	return (
		<div className='relative'>
			<div className='absolute inset-x-0 top-0 -z-10 h-56 bg-gray-20' />
			<div className='container flex flex-col gap-4 py-10'>
				<div>
					<h3 className='text-gray-800 typography-B24'>Shopping cart</h3>
					<p className='mb-8 text-gray-200 typography-R16'>
						Showing your choices product
					</p>
				</div>
				<div className='flex gap-8'>
					<div className='flex-1 self-start rounded-lg border border-gray-40 bg-white'>
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
							<ul className='divide-y divide-gray-50 px-6'>
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
						items={cart?.items}
					/>
				</div>
			</div>
		</div>
	);
}
