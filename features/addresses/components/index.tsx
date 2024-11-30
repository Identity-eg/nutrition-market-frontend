import { Dispatch, useState } from 'react';
import { Card } from 'components/ui/card';
import { Button } from 'components/ui/button';
import { Plus } from 'lucide-react';

import { Addresses } from 'features/addresses/components/addresses';
import { AddressForm } from 'features/addresses/components/form';

import type { TAddress } from 'features/addresses/types/address';
import type { TGovernorate } from 'features/addresses/types/egypt';

export default function ShippingAddress({
	setAddressId,
	userEmail,
	governorates,
	addresses,
}: {
	setAddressId: Dispatch<React.SetStateAction<string>>;
	userEmail?: string;
	governorates: TGovernorate[];
	addresses: TAddress[];
}) {
	const isUserHasAddress = addresses.length !== 0;
	const [isInFormMode, setIsInFormMode] = useState(!isUserHasAddress);
	const [addressToEdit, setAddressToEdit] = useState<TAddress | undefined>(
		undefined
	);

	const openForm = () => setIsInFormMode(true);
	const closeForm = () => setIsInFormMode(false);

	return (
		<Card>
			<div className='flex justify-between border-b border-gray-40 p-6 typography-SB20'>
				Shipping Address
				{!isInFormMode && (
					<Button
						onClick={openForm}
						aria-label='Add new address'
						variant='secondary-gray'
						className='size-8'
						size='icon'>
						<Plus size={16} />
					</Button>
				)}
			</div>

			{isInFormMode && (
				<AddressForm
					userEmail={userEmail}
					governorates={governorates}
					isUserHasAddress={isUserHasAddress}
					addressToEdit={addressToEdit}
					setAddressToEdit={setAddressToEdit}
					closeForm={closeForm}
				/>
			)}
			{!isInFormMode && isUserHasAddress && (
				<Addresses
					setAddressId={setAddressId}
					addresses={addresses}
					setAddressToEdit={setAddressToEdit}
					openForm={openForm}
				/>
			)}
		</Card>
	);
}
