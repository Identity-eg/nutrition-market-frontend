'use client';

import { useState } from 'react';
import ShippingAddress from 'features/addresses/components';
import PaymentMethod from 'features/orders/components/payment-method';
import { CheckoutSummary } from 'features/orders/components/checkout-summary';

import type { TGovernorate } from 'features/addresses/types/egypt';
import type { TAddress } from 'features/addresses/types/address';
import type { TCart } from 'features/cart/types/cart';

export default function Container({
	cart,
	userEmail,
	governorates,
	addresses,
}: {
	cart: TCart;
	userEmail?: string;
	governorates: TGovernorate[];
	addresses: TAddress[];
}) {
	const [addressId, setAddressId] = useState(addresses[0]?._id ?? '');
	const [paymentMethodId, setPaymentMethodId] = useState('1');

	return (
		<div className='flex gap-8'>
			<div className='flex-1 space-y-4 self-start'>
				<ShippingAddress
					setAddressId={setAddressId}
					userEmail={userEmail}
					governorates={governorates}
					addresses={addresses}
				/>
				<PaymentMethod setPaymentMethodId={setPaymentMethodId} />
			</div>
			<CheckoutSummary
				paymentMethodId={paymentMethodId}
				addressId={addressId}
				cart={cart}
			/>
		</div>
	);
}
