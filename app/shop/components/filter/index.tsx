'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from 'components/ui/accordion';
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from 'components/ui/command';
import { Separator } from 'components/ui/separator';
import { APP_COMPANIES } from 'constants';
import { DOSAGE_FORMS } from 'constants';
import { cn } from 'lib/utils';
import { CheckIcon } from 'lucide-react';
import React from 'react';

export default function FilterProducts() {
	return (
		<article className="hidden rounded-lg border border-gray-50 p-4 media-md:block">
			<h4 className="mb-4 capitalize typography-B16">filter option</h4>
			<Separator />

			<Accordion
				type="multiple"
				className="w-full">
				<AccordionItem value="company">
					<AccordionTrigger className="typography-B13">
						company
					</AccordionTrigger>
					<AccordionContent>
						<Command>
							<CommandList>
								<CommandGroup>
									{APP_COMPANIES.map(form => ({
										label: form,
										value: form,
									})).map(option => {
										// const isSelected = searchParams.has(
										// 	column?.id ?? '',
										// 	option.value
										// );
										return (
											<CommandItem
												key={option.value}
												value={option.value}
												onSelect={() => {}}
												className="px-0">
												<div
													className={cn(
														'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-green-500',
														false
															? 'bg-green-500 text-white'
															: 'opacity-50 [&_svg]:invisible'
													)}>
													<CheckIcon className={cn('h-4 w-4')} />
												</div>
												{option.icon && (
													<option.icon className="text-muted-foreground mr-2 h-4 w-4" />
												)}
												<span>{option.label}</span>
											</CommandItem>
										);
									})}
								</CommandGroup>
								{/* {selectedValues && selectedValues.length > 0 && ( */}
								<>
									<CommandSeparator />
									<CommandGroup>
										<CommandItem
											onSelect={() => {}}
											className="justify-center text-center">
											Clear filters
										</CommandItem>
									</CommandGroup>
								</>
								{/* )} */}
							</CommandList>
						</Command>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="dosageForm">
					<AccordionTrigger className="typography-B13">
						dosage form
					</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="category">
					<AccordionTrigger className="typography-B13">
						category
					</AccordionTrigger>
					<AccordionContent>
						Yes. It's animated by default, but you can disable it if you prefer.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}
