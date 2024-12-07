'use client';

import { cn } from 'lib/utils';

type NumericFieldProps = React.ComponentProps<'input'> & {
	changeHandler?: (numericValue: string) => void;
};

const NumericField = ({
	className,
	changeHandler,
	...props
}: NumericFieldProps) => {
	return (
		<input
			onChange={e => {
				const numericValue = e.target.value.replace(/\D/g, '');
				const finalValue = +numericValue > 0 ? +numericValue : '';

				changeHandler?.(finalValue.toString());
			}}
			className={cn(
				'disabled:border-N40 h-[48px] w-full rounded-md border-[1px] border-gray-50 px-[12px] py-[10px] outline-none outline-[1.5px] -outline-offset-1 transition-all placeholder:text-gray-100 placeholder:typography-R14 focus-within:outline-green-300 hover:border-gray-70 focus:outline-green-300 focus-visible:border-green-300',

				className
			)}
			{...props}
		/>
	);
};

export { NumericField };
