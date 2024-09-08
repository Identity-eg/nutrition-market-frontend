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
import { useAction } from 'next-safe-action/hooks';
import { addAddress } from 'apis/server/address';
import { useToast } from 'components/ui/use-toast';
import { TGovernorate } from 'types/egypt';
import { getCities } from 'apis/server/egypt';
import { useState } from 'react';

export const addAddressSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z
		.string()
		.min(1, {
			message: 'Email is required',
		})
		.email('Please enter a valid email address'),
	phone: z.coerce.number(),
	additionalPhone: z.coerce.number(),
	governorate: z.string(),
	city: z.string(),
	street: z.string(),
	buildingNo: z.string(),
	floor: z.string(),
});

export default function AddressForm({
	userEmail,
	governorates,
	isUserHasAddress,
	cancelAddingMode,
}: {
	userEmail: string;
	governorates: TGovernorate[];
	isUserHasAddress: boolean;
	cancelAddingMode: () => void;
}) {
	const [isGovMenuOpen, setIsGovMenuOpen] = useState(false);
	const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);

	const { toast } = useToast();
	const { execute, isPending } = useAction(addAddress, {
		onSuccess: cancelAddingMode,
		onError: ({ error }) => {
			toast({
				variant: 'destructive',
				title: 'Server Error',
				description: error.serverError,
			});
		},
	});
	const {
		execute: getCitiesAction,
		result: { data: cities },
	} = useAction(getCities);

	const form = useForm<z.infer<typeof addAddressSchema>>({
		defaultValues: {
			email: userEmail,
		},
		resolver: zodResolver(addAddressSchema),
	});

	function onSubmit(values: z.infer<typeof addAddressSchema>) {
		console.log({ values });
		execute(values);
	}

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='space-y-8 pt-6'>
			<Form {...form}>
				<div className='flex w-full gap-4'>
					<FormField
						control={form.control}
						name='firstName'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
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
							<FormItem className='flex w-full flex-col'>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input
										size='sm'
										variant='outline'
										placeholder='e.g. Mohamed'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='flex w-full flex-col'>
							<FormLabel>Email</FormLabel>
							<FormControl className='w-[50%]'>
								<Input
									size='sm'
									variant='outline'
									placeholder='e.g. john@doe.com'
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
									<Input
										variant='outline'
										size='sm'
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
									<Input
										variant='outline'
										size='sm'
										type='number'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex w-3/4 gap-4'>
					<FormField
						control={form.control}
						name='governorate'
						render={({ field }) => (
							<FormItem className='flex w-full flex-col'>
								<FormLabel>Governorate</FormLabel>
								<FormControl>
									<Popover
										open={isGovMenuOpen}
										onOpenChange={setIsGovMenuOpen}>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'w-full justify-between',
														!field.value && 'text-gray-100'
													)}>
													{field.value
														? governorates.find(
																governorate =>
																	governorate.governorate_name_en ===
																	field.value
															)?.governorate_name_en
														: 'Select...'}
													<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-[257px] p-0'>
											<Command>
												<CommandInput placeholder='Search governorate...' />
												<CommandList>
													<CommandEmpty>No governorates found.</CommandEmpty>
													<CommandGroup>
														{governorates.map(governorate => (
															<CommandItem
																value={governorate.governorate_name_en}
																key={governorate.id}
																onSelect={value => {
																	const isSameValue =
																		form.getValues('governorate') === value;
																	const isCityHasValue = form.getValues('city');

																	if (isSameValue) {
																		setIsGovMenuOpen(false);
																		return;
																	}

																	form.setValue(
																		'governorate',
																		governorate.governorate_name_en
																	);

																	if (isCityHasValue) {
																		form.setValue('city', '');
																	}
																	getCitiesAction({ govId: governorate.id });
																	setIsGovMenuOpen(false);
																}}>
																<Check
																	className={cn(
																		'mr-2 h-4 w-4',
																		governorate.governorate_name_en ===
																			field.value
																			? 'opacity-100'
																			: 'opacity-0'
																	)}
																/>
																{governorate.governorate_name_en}
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
						name='city'
						render={({ field }) => {
							return (
								<FormItem className='flex w-full flex-col'>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Popover
											open={isCityMenuOpen}
											onOpenChange={setIsCityMenuOpen}>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={cn(
															'w-full justify-between',
															!field.value && 'text-gray-100'
														)}>
														{field.value
															? cities?.find(
																	city => city.city_name_en === field.value
																)?.city_name_en
															: 'Select...'}
														<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='w-[257px] p-0'>
												<Command>
													<CommandInput placeholder='Search city...' />
													<CommandList>
														<CommandEmpty>No Cities found.</CommandEmpty>
														<CommandGroup>
															{cities?.map(city => (
																<CommandItem
																	value={city.city_name_en}
																	key={city.city_name_en}
																	onSelect={() => {
																		form.setValue('city', city.city_name_en);
																		setIsCityMenuOpen(false);
																	}}>
																	<Check
																		className={cn(
																			'mr-2 h-4 w-4',
																			city.city_name_en === field.value
																				? 'opacity-100'
																				: 'opacity-0'
																		)}
																	/>
																	{city.city_name_en}
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
							);
						}}
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
						<Loader2 className='mr-2 h-4 w-4 animate-spin' />
						Please wait
					</>
				) : (
					'Save Address'
				)}
			</Button>
			{isUserHasAddress && (
				<Button
					onClick={cancelAddingMode}
					variant='secondary-gray'>
					Cancel
				</Button>
			)}
		</form>
	);
}
