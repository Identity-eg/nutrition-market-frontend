import { cn } from 'lib/utils';

const Card = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn(
			'rounded-lg border border-gray-50 bg-white text-black',
			className
		)}
		{...props}
	/>
);

const CardHeader = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn('flex flex-col space-y-1.5 p-6', className)}
		{...props}
	/>
);

const CardTitle = ({ className, ...props }: React.ComponentProps<'h3'>) => (
	<h3
		className={cn(
			'text-2xl font-semibold leading-none tracking-tight',
			className
		)}
		{...props}
	/>
);

const CardDescription = ({
	className,
	...props
}: React.ComponentProps<'p'>) => (
	<p
		className={cn('text-muted-foreground text-sm', className)}
		{...props}
	/>
);

const CardContent = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn('p-6 pt-0', className)}
		{...props}
	/>
);

const CardFooter = ({ className, ...props }: React.ComponentProps<'div'>) => (
	<div
		className={cn('flex items-center p-6 pt-0', className)}
		{...props}
	/>
);

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
