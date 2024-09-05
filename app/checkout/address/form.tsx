'use client';

import { Input } from 'components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from 'components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from 'components/ui/popover';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from 'components/ui/command';
import { NumericField } from 'components/ui/numeric-field';
import { useAction } from 'next-safe-action/hooks';
import { addAddress } from 'apis/server/address';

export const addAddressSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	phone: z.coerce.number(),
	additionalPhone: z.coerce.number(),
	governorate: z.string(),
	district: z.string(),
	street: z.string(),
	buildingNo: z.string(),
	floor: z.string(),
});

const languages = [
	{ label: 'Egypt', value: 'Egypt' },
	{ label: 'French', value: 'French' },
	{ label: 'German', value: 'German' },
	{ label: 'Spanish', value: 'Spanish' },
	{ label: 'Portuguese', value: 'Portuguese' },
	{ label: 'Russian', value: 'Russian' },
	{ label: 'Japanese', value: 'Japanese' },
	{ label: 'Korean', value: 'Korean' },
	{ label: 'Chinese', value: 'Chinese' },
] as const;

export default function AddressForm({
	cancelAddingMode,
}: {
	cancelAddingMode: () => void;
}) {
	const { execute, isPending } = useAction(addAddress, {
		onSuccess: cancelAddingMode,
	});

	const form = useForm<z.infer<typeof addAddressSchema>>({
		resolver: zodResolver(addAddressSchema),
	});

	function onSubmit(values: z.infer<typeof addAddressSchema>) {
		execute(values);
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='pt-6 space-y-8'>
			<Form {...form}>
				<FormField
					control={form.control}
					name='firstName'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>First Name</FormLabel>
							<FormControl className='w-[50%]'>
								<Input
									size='sm'
									variant='outline'
									required
									placeholder='e.g. Mohamed'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='lastName'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Last Name</FormLabel>
							<FormControl className='w-[50%]'>
								<Input
									size='sm'
									variant='outline'
									required
									placeholder='e.g. Mohamed'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex w-full gap-4'>
					<FormField
						control={form.control}
						name='phone'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<NumericField
										required
										type='number'
										placeholder='e.g. 01234567891'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='additionalPhone'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Additional Phone</FormLabel>
								<FormControl>
									<NumericField
										type='number'
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex gap-4'>
					<FormField
						control={form.control}
						name='governorate'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full'>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'w-full justify-between',
														!field.value && 'text-muted-foreground'
													)}>
													{field.value
														? languages.find(
																language => language.value === field.value
															)?.label
														: 'Select city'}
													<ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-[200px] p-0'>
											<Command>
												<CommandInput placeholder='Search city...' />
												<CommandList>
													<CommandEmpty>No language found.</CommandEmpty>
													<CommandGroup>
														{languages.map(language => (
															<CommandItem
																value={language.label}
																key={language.value}
																onSelect={() => {
																	form.setValue('governorate', language.value);
																}}>
																<Check
																	className={cn(
																		'mr-2 h-4 w-4',
																		language.value === field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{language.label}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='district'
						render={({ field }) => (
							<FormItem className='flex flex-col w-full'>
								<FormLabel>Area</FormLabel>
								<FormControl>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'w-full justify-between',
														!field.value && 'text-muted-foreground'
													)}>
													{field.value
														? languages.find(
																language => language.value === field.value
															)?.label
														: 'Select area'}
													<ChevronsUpDown className='w-4 h-4 ml-2 opacity-50 shrink-0' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-[200px] p-0'>
											<Command>
												<CommandInput placeholder='Search city...' />
												<CommandList>
													<CommandEmpty>No language found.</CommandEmpty>
													<CommandGroup>
														{languages.map(language => (
															<CommandItem
																value={language.label}
																key={language.value}
																onSelect={() => {
																	form.setValue('district', language.value);
																}}>
																<Check
																	className={cn(
																		'mr-2 h-4 w-4',
																		language.value === field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{language.label}
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='street'
					render={({ field }) => (
						<FormItem className='flex flex-col'>
							<FormLabel>Street</FormLabel>
							<FormControl>
								<Input
									size='sm'
									variant='outline'
									required
									placeholder='Street name or special landmark'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-4'>
					<FormField
						control={form.control}
						name='buildingNo'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Building</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='floor'
						render={({ field }) => (
							<FormItem className='flex flex-col'>
								<FormLabel>Floor</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										required
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</Form>
			<Button
				type='submit'
				className='mr-2'
				disabled={isPending}>
				{isPending ? (
					<>
						<Loader2 className='w-4 h-4 mr-2 animate-spin' />
						Please wait
					</>
				) : (
					'Save Address'
				)}
			</Button>
			<Button
				onClick={cancelAddingMode}
				variant='secondary-gray'>
				Cancel
			</Button>
		</form>
	);
}
