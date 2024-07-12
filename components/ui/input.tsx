import * as React from 'react';

import { cn } from 'lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					'text-N500 h-[48px] w-full rounded-md border-[1px] border-gray-20 bg-gray-20 px-3 py-2.5 outline-none outline-[1.5px] -outline-offset-[1.5px] transition-all placeholder:typography-R14 focus-within:outline-green-300 hover:border-gray-40 focus:outline-green-300 focus-visible:border-green-300 disabled:bg-gray-40',
					className
				)}
				ref={ref}
				{...props}
			/>
		);
	}
);
Input.displayName = 'Input';

export { Input };
