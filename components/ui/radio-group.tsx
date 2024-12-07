'use client';

import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from 'lib/utils';

const RadioGroup = ({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
	return (
		<RadioGroupPrimitive.Root
			className={cn('grid gap-2', className)}
			{...props}
		/>
	);
};

const RadioGroupItem = ({
	className,
	...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
	return (
		<RadioGroupPrimitive.Item
			className={cn(
				'focus-visible:ring-ring aspect-square h-4 w-4 rounded-full border border-gray-200 text-black ring-offset-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-500',
				className
			)}
			{...props}>
			<RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
				<Circle className='size-2.5 fill-green-500 text-green-500' />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
};

export { RadioGroup, RadioGroupItem };
