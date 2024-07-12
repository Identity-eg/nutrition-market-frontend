'use client';

import { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { NumericField } from 'components/ui/numeric-field';

export function Inputs() {
	const [from, setFrom] = useState<string | undefined | ''>('');
	const [to, setTo] = useState<string | undefined | ''>('');

	const searchParams = useSearchParams();
	const manipulatedSearchParam = new URLSearchParams(searchParams);

	const priceUrl = manipulatedSearchParam.get('price');

	const router = useRouter();

	const swapValues = () => {
		setFrom(to);
		setTo(from);

		manipulatedSearchParam.set('price', `${to || '0'}-${from}`);
		router.push(`?${manipulatedSearchParam.toString()}`);
	};

	useEffect(() => {
		setFrom(priceUrl?.split('-')[0] ?? '');
		setTo(priceUrl?.split('-')[1] ?? '');
	}, [priceUrl]);

	const submitFilters = () => {
		if (!from && !to && priceUrl) {
			console.log('inside');
			manipulatedSearchParam.delete('price');
			router.push(`?${manipulatedSearchParam.toString()}`);
		}

		if (!from && !to) return;

		if (priceUrl) {
			if (from && to && +from > +to) {
				swapValues();
				return;
			}

			manipulatedSearchParam.set('price', `${from || '0'}-${to || '0'}`);
		}

		if (from && to && +from > +to) {
			swapValues();
			return;
		}

		manipulatedSearchParam.set('price', `${from || '0'}-${to}`);
		router.push(`?${manipulatedSearchParam.toString()}`);
	};

	return (
		<div>
			<div className="mb-4 flex gap-[16px]">
				<div className="flex flex-col gap-[4px]">
					<label
						htmlFor="from"
						className="text-gray-200 typography-R13">
						From
					</label>
					<NumericField
						id="from"
						value={from}
						changeHandler={numericValue => {
							setFrom(numericValue);
						}}
						className="h-[36px]"
					/>
				</div>
				<div className="flex flex-col gap-[4px]">
					<label
						htmlFor="to"
						className="text-gray-200 typography-R13">
						To
					</label>
					<NumericField
						id="to"
						value={to}
						changeHandler={numericValue => {
							setTo(numericValue);
						}}
						className="h-[36px]"
					/>
				</div>
			</div>
			<Button
				className="w-full"
				size={'sm'}
				onClick={submitFilters}>
				Apply
			</Button>
		</div>
	);
}
