import { CashIcon } from 'assets/icons/cash-icon';
import { VisaIcon } from 'assets/icons/visa-icon';
import { WalletIcon } from 'assets/icons/wallet-icon';
import { Card } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio';
import React, { Dispatch } from 'react';

export const PAYMENT_METHODS_IDS = {
	cashOnDelivery: '1',
	AmrMasterCard: '4827863',
	HadyMasterCard: '3922403',
	wallet: '3925355',
} as const;

const PAYMENT_METHODS = [
	{
		id: PAYMENT_METHODS_IDS.cashOnDelivery,
		name: 'Cash on delivery',
		Icon: CashIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.AmrMasterCard,
		name: 'Online Master Card - Amr',
		Icon: VisaIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.HadyMasterCard,
		name: 'Online Master Card - Hady',
		Icon: VisaIcon,
	},
	{
		id: PAYMENT_METHODS_IDS.wallet,
		name: 'Mobile Wallet',
		Icon: WalletIcon,
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
							<Label
								htmlFor={method.id}
								className='flex items-center gap-2'>
								<method.Icon />
								{method.name}
							</Label>
						</li>
					))}
				</ul>
			</RadioGroup>
		</Card>
	);
}
