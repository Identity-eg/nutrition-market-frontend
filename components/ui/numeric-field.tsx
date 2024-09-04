'use client';

import { cn } from 'lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

const NumericField = forwardRef<
	HTMLInputElement,
	InputHTMLAttributes<HTMLInputElement> & {
		changeHandler?: (numericValue: string) => void;
	}
>(({ className, changeHandler, ...props }, ref) => {
	return (
		<input
			ref={ref}
			onChange={e => {
				const numericValue = e.target.value.replace(/\D/g, '');
				const finalValue = +numericValue > 0 ? +numericValue : '';

				changeHandler && changeHandler(finalValue.toString());
			}}
			className={cn(
				'disabled:border-N40 h-[48px] placeholder:typography-R14 placeholder:text-gray-100 w-full rounded-md border-[1px] border-gray-50 px-[12px] py-[10px] outline-none outline-[1.5px] -outline-offset-1 transition-all focus-within:outline-green-300 hover:border-gray-70 focus:outline-green-300 focus-visible:border-green-300',

				className
			)}
			{...props}
		/>
	);
});

NumericField.displayName = 'NumericField';

export { NumericField };
