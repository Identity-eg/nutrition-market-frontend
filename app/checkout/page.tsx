import { getUserAddresses } from 'features/addresses/api/address';
import { getGovernorates } from 'features/addresses/api/egypt';
import { getMe } from 'features/auth/api/user';
import { getCart } from 'features/cart/api/cart';
import Container from './container';

export default async function CheckoutPage() {
	const [addresses, governorates, user, cart] = await Promise.all([
		getUserAddresses(),
		getGovernorates(),
		getMe(),
		getCart(),
	]);

	return (
		<div className='relative'>
			<div className='absolute inset-x-0 top-0 -z-10 h-56 bg-gray-20' />
			<div className='container flex min-h-screen flex-col gap-4 py-10'>
				<div>
					<h3 className='text-gray-800 typography-B24'>Checkout</h3>
					<p className='mb-8 text-gray-200 typography-R16'>
						Showing your choices product
					</p>
				</div>
				<Container
					cart={cart}
					addresses={addresses}
					governorates={governorates}
					userEmail={user?.email}
				/>
			</div>
		</div>
	);
}
