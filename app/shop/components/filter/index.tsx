'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import { Checkbox } from 'components/ui/checkbox';

import { Separator } from 'components/ui/separator';
import { APP_COMPANIES } from 'constants/index';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function FilterProducts() {
	const searchParams = new URLSearchParams(useSearchParams());
	const router = useRouter();
	const company = searchParams.getAll('company');

	return (
		<article className="hidden rounded-lg border border-gray-50 p-4 media-md:block">
			<h4 className="mb-4 capitalize typography-B16">filter option</h4>
			<Separator />

			<Accordion
				type="multiple"
				className="w-full">
				<AccordionItem value="company">
					<AccordionTrigger className="typography-B13">
						Company
					</AccordionTrigger>
					<AccordionContent className="space-y-2">
						{APP_COMPANIES.map(company => ({
							label: company,
							value: company,
						})).map(option => {
							return (
								<div
									key={option.label}
									className="flex items-center gap-2 text-gray-400 typography-R13 has-[[data-state=checked]]:text-black has-[[data-state=checked]]:typography-SB13">
									<Checkbox
										id={option.label}
										onCheckedChange={checked => {
											if (checked) {
												searchParams.append('company', option.value);
											} else {
												searchParams.delete('company', option.value);
											}
											router.push(`?${searchParams.toString()}`);
										}}
										checked={company.includes(option.value)}
									/>
									<label
										htmlFor={option.label}
										className="inline-block cursor-pointer">
										<span className="capitalize">{option.label}</span>
									</label>
								</div>
							);
						})}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="dosageForm">
					<AccordionTrigger className="typography-B13">
						Dosage form
					</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="category">
					<AccordionTrigger className="typography-B13">
						Category
					</AccordionTrigger>
					<AccordionContent>
						Yes. It's animated by default, but you can disable it if you prefer.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}

