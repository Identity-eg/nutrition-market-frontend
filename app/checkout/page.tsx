import ShippingAddress from './address';
import { getUserAddresses } from 'apis/server/address';
import { CheckoutSummary } from './checkout-summary';
import { getGovernorates } from 'apis/server/egypt';
import PaymentMethod from './payment-method';

export default async function CheckoutPage() {
	const addresses = await getUserAddresses();
	const governorates = await getGovernorates();

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
				<div className='flex gap-8'>
					<div className='flex-1 space-y-4 self-start'>
						<ShippingAddress
							governorates={governorates}
							addresses={addresses}
						/>

						<PaymentMethod />
					</div>
					<CheckoutSummary
						isCartEmpty={false}
						totalPrice={2000}
					/>
				</div>
			</div>
		</div>
	);
}
