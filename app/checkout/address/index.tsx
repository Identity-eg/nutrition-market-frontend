'use client';

import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';

import Addresses from './addresses';
import { TAddress } from 'types/address';
import { useState } from 'react';
import AddressForm from './form';
import { TGovernorate } from 'types/egypt';

export default function ShippingAddress({
	governorates,
	addresses,
}: {
	governorates: TGovernorate[];
	addresses: TAddress[];
}) {
	const isUserHasAddress = addresses.length !== 0;
	const [isInFormMode, setIsInFormMode] = useState(!isUserHasAddress);

	return (
		<Card className='p-6'>
			<div className='flex justify-between typography-SB20'>
				Shipping Address
				{!isInFormMode && (
					<Button
						onClick={() => setIsInFormMode(true)}
						aria-label='Add new address'
						variant='primary'
						className='size-8 rounded-full'
						size='icon'>
						<Plus size={16} />
					</Button>
				)}
			</div>

			{isInFormMode && (
				<AddressForm
					governorates={governorates}
					isUserHasAddress={isUserHasAddress}
					cancelAddingMode={() => setIsInFormMode(false)}
				/>
			)}
			{!isInFormMode && isUserHasAddress && <Addresses addresses={addresses} />}
		</Card>
	);
}
