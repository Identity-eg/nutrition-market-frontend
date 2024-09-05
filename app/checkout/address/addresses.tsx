import { Button } from 'components/ui/button';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio';
import { Pencil } from 'lucide-react';
import React from 'react';
import { TAddress } from 'types/address';

export default function Addresses({ addresses }: { addresses: TAddress[] }) {
	return (
		<RadioGroup
			asChild
			defaultValue={addresses[0]._id}
			className='gap-0 divide-y divide-gray-50'>
			<ul>
				{addresses.map(add => (
					<li
						key={add._id}
						className='flex items-center justify-between py-6 last:pb-0'>
						<div className='flex items-center gap-4'>
							<RadioGroupItem
								value={add._id}
								id={add._id}
							/>
							<Label htmlFor={add._id}>
								<h4 className='mb-3 typography-SB16'>
									{`${add.firstName} ${add.lastName}`}
								</h4>
								<p className='mb-2 text-gray-400 typography-R14'>
									{`${add.street} - ${add.district} - ${add.governorate}`}
								</p>
								<p className='text-gray-400 typography-R14'>{add.phone}</p>
							</Label>
						</div>
						<Button
							variant='outline'
							className='gap-2'>
							<Pencil size={16} />
							Edit
						</Button>
					</li>
				))}
			</ul>
		</RadioGroup>
	);
}
