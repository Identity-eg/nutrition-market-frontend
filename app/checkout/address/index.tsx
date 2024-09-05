'use client';

import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';

import Addresses from './addresses';
import { TAddress } from 'types/address';
import { useState } from 'react';
import AddressForm from './form';

export default function ShippingAddress({
	addresses,
}: {
	addresses: TAddress[];
}) {
	const [isAddingAddressMode, setIsAddingAddressMode] = useState(
		addresses.length === 0
	);

	return (
		<Card className='p-6'>
			<div className='flex justify-between typography-SB20'>
				Shipping Address
				<Button
					onClick={() => setIsAddingAddressMode(true)}
					aria-label='Add new address'
					variant='outline'
					className='rounded-full size-8'
					size='icon'>
					<Plus size={16} />
				</Button>
			</div>
			{isAddingAddressMode ? (
				<AddressForm cancelAddingMode={() => setIsAddingAddressMode(false)} />
			) : (
				<Addresses addresses={addresses} />
			)}
		</Card>
	);
}
