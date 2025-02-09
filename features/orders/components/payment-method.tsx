import React, { Dispatch } from 'react';
import { useTranslations } from 'next-intl';

import { Card } from 'components/ui/card';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { CashIcon } from 'assets/icons/cash-icon';
import { VisaIcon } from 'assets/icons/visa-icon';
import { WalletIcon } from 'assets/icons/wallet-icon';
import { PAYMENT_METHODS_IDS } from 'constants/index';

export default function PaymentMethod({
	setPaymentMethodId,
}: {
	setPaymentMethodId: Dispatch<React.SetStateAction<string>>;
}) {
	const t = useTranslations('CheckoutPage');

	const PAYMENT_METHODS_MAPPER = [
		{
			id: PAYMENT_METHODS_IDS.cashOnDelivery,
			name: t('cash'),
			Icon: CashIcon,
		},
		{
			id: PAYMENT_METHODS_IDS.masterCard,
			name: t('card'),
			Icon: VisaIcon,
		},
		{
			id: PAYMENT_METHODS_IDS.wallet,
			name: t('wallet'),
			Icon: WalletIcon,
		},
	];
	return (
		<Card>
			<div className='border-b border-gray-40 p-6 typography-SB20'>
				{t('paymentMethod')}
			</div>
			<RadioGroup
				asChild
				onValueChange={pId => setPaymentMethodId(pId)}
				defaultValue={PAYMENT_METHODS_MAPPER[0].id}>
				<ul className='space-y-4 p-6'>
					{PAYMENT_METHODS_MAPPER.map(method => (
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
