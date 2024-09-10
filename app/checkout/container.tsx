'use client';

import React, { useState } from 'react';
import ShippingAddress from './address';
import PaymentMethod from './payment-method';
import { TGovernorate } from 'types/egypt';
import { TAddress } from 'types/address';
import { CheckoutSummary } from './checkout-summary';
import { TCart } from 'types/cart';

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
