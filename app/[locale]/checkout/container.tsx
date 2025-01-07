'use client';

import { useState } from 'react';
import ShippingAddress from 'features/addresses/components';
import PaymentMethod from 'features/orders/components/payment-method';
import { CheckoutSummary } from 'features/orders/components/checkout-summary';

import type { TGovernorate } from 'features/addresses/types/egypt';
import type { TAddress } from 'features/addresses/types/address';
import type { TCart } from 'features/cart/types/cart';
import { PlaceOrderBtn } from 'features/orders/components/place-order-btn';
import { CheckoutSummaryMobile } from 'features/orders/components/checkout-summary-mobile';
import { Price } from 'components/utils/price';

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
	const [addressId, setAddressId] = useState(addresses[0]?._id ?? "");
	const [paymentMethodId, setPaymentMethodId] = useState('1');

	return (
		<>
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
			<div className='fixed inset-x-0 bottom-0 flex w-full items-center justify-between border-t border-gray-40 bg-white p-6 shadow-2xl media-md:hidden'>
				<span className='flex flex-col typography-B16'>
					Total price
					<Price
						finalPriceClassName='typography-SB18'
						className='mb-0'
						price={cart.totalPriceAfterCoupon ?? cart.totalPrice}
					/>
				</span>
				<div className='flex gap-2'>
					<CheckoutSummaryMobile
						paymentMethodId={paymentMethodId}
						addressId={addressId}
						cart={cart}
					/>

					<PlaceOrderBtn
						paymentMethodId={paymentMethodId}
						addressId={addressId}
						cartId={cart._id}
					/>
				</div>
			</div>
		</>
	);
}
