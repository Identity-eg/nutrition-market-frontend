'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from 'lib/utils';

const Checkbox = ({
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) => (
	<CheckboxPrimitive.Root
		className={cn(
			'ring-offset-background peer h-4 w-4 shrink-0 rounded-sm border border-gray-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-0 data-[state=checked]:bg-green-500 data-[state=checked]:text-white',
			className
		)}
		{...props}>
		<CheckboxPrimitive.Indicator
			className={cn('flex items-center justify-center text-white')}>
			<Check className='h-4 w-4' />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
);

export { Checkbox };
