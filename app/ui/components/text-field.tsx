import * as React from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextField = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                'ring-offset-background file:bg-transparent placeholder:text-muted-foreground focus-visible:ring-ring border-N40 bg-N5 text-N500 hover:border-N50 disabled:border-N40 border-gray-2 hover:border-gray-3 placeholder:text-gray-6 flex h-12 w-full max-w-[500px] rounded-md border bg-white p-4 px-[12px] py-[10px] text-sm outline-none outline-[1.5px] -outline-offset-1 transition-all file:text-sm file:font-medium focus-within:outline-blue-500 focus:outline-blue-500 focus-visible:border-blue-500 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            ref={ref}
            {...props}
        />
    );
});
TextField.displayName = 'TextField';
