import { cn } from 'lib/utils';
import * as React from 'react';

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => (
		<textarea
			rows={4}
			className={cn(
				'text-N500 w-full rounded-md border-[1px] border-gray-20 bg-gray-20 px-3 py-2.5 outline-none outline-[1.5px] -outline-offset-[1.5px] transition-all placeholder:text-gray-100 placeholder:typography-R14 focus-within:outline-green-300 hover:border-gray-40 focus:outline-green-300 focus-visible:border-green-300 disabled:bg-gray-40 disabled:placeholder:text-gray-50',
				className
			)}
			ref={ref}
			{...props}
		/>
	)
);
Textarea.displayName = 'Textarea';

export { Textarea };
