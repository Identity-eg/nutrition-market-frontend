import { Dispatch } from 'react';
import { Pencil } from 'lucide-react';

import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio';

import type { TAddress } from 'features/addresses/types/address';

export function Addresses({
	addresses,
	setAddressId,
	setAddressToEdit,
	openForm,
}: {
	addresses: TAddress[];
	setAddressId: Dispatch<React.SetStateAction<string>>;
	setAddressToEdit: Dispatch<React.SetStateAction<TAddress | undefined>>;
	openForm: () => void;
}) {
	return (
		<RadioGroup
			asChild
			defaultValue={addresses[0]._id}
			onValueChange={addrId => setAddressId(addrId)}
			className='gap-0 divide-y divide-gray-50'>
			<ul>
				{addresses.map(addr => (
					<li
						key={addr._id}
						className='flex items-center justify-between py-6 last:pb-0'>
						<div className='flex items-center gap-4'>
							<RadioGroupItem
								value={addr._id}
								id={addr._id}
							/>
							<Label htmlFor={addr._id}>
								<h4 className='mb-3 typography-SB16'>
									{`${addr.firstName} ${addr.lastName}`}
								</h4>
								<p className='mb-2 text-gray-400 typography-R14'>
									{`${addr.street} - ${addr.city} - ${addr.governorate}`}
								</p>
								<p className='text-gray-400 typography-R14'>{addr.phone}</p>
							</Label>
						</div>
						<Button
							variant='outline'
							className='gap-2'
							onClick={() => {
								openForm();
								setAddressToEdit(addr);
							}}>
							<Pencil size={16} />
							Edit
						</Button>
					</li>
				))}
			</ul>
		</RadioGroup>
	);
}
