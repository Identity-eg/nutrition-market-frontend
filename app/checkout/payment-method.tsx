import { Card } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio';
import React, { Dispatch } from 'react';

const PAYMENT_METHODS = [
	{
		id: '1',
		name: 'Cash on delivery',
	},
	{
		id: '4827863',
		name: 'Online Master Card - Amr',
	},
	{
		id: '3922403',
		name: 'Online Master Card - Hady',
	},
	{
		id: '3925355',
		name: 'Mobile Wallet',
	},
];

export default function PaymentMethod({
	setPaymentMethodId,
}: {
	setPaymentMethodId: Dispatch<React.SetStateAction<string>>;
}) {
	return (
		<Card className='p-6'>
			<div className='mb-6 typography-SB20'>Payment method</div>
			<RadioGroup
				asChild
				onValueChange={pId => setPaymentMethodId(pId)}
				defaultValue={PAYMENT_METHODS[0].id}>
				<ul className='space-y-4'>
					{PAYMENT_METHODS.map(method => (
						<li
							key={method.id}
							className='flex items-center gap-4 last:pb-0'>
							<RadioGroupItem
								value={method.id}
								id={method.id}
							/>
							<Label htmlFor={method.id}>{method.name}</Label>
						</li>
					))}
				</ul>
			</RadioGroup>
		</Card>
	);
}
