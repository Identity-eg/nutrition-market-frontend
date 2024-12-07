'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';

// import { Dialog, DialogContent } from '@/components/ui/dialog';
import { cn } from 'lib/utils';

const Command = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive>) => (
	<CommandPrimitive
		className={cn(
			'flex h-full w-full flex-col overflow-hidden rounded-md border-gray-40 bg-white text-black',
			className
		)}
		{...props}
	/>
);

// const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
// 	return (
// 		<Dialog {...props}>
// 			<DialogContent className='p-0 overflow-hidden shadow-lg'>
// 				<Command className='[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5'>
// 					{children}
// 				</Command>
// 			</DialogContent>
// 		</Dialog>
// 	);
// };

const CommandInput = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) => (
	<div className='flex items-center border-b border-gray-40 px-3'>
		<Search className='mr-2 h-4 w-4 shrink-0 opacity-50' />
		<CommandPrimitive.Input
			className={cn(
				'placeholder:text-muted-foreground flex h-11 w-full rounded-md bg-white py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}
			{...props}
		/>
	</div>
);

const CommandList = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) => (
	<CommandPrimitive.List
		className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
		{...props}
	/>
);

const CommandEmpty = (
	props: React.ComponentProps<typeof CommandPrimitive.Empty>
) => (
	<CommandPrimitive.Empty
		className='py-6 text-center text-sm'
		{...props}
	/>
);

const CommandGroup = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) => (
	<CommandPrimitive.Group
		className={cn(
			'overflow-hidden border-gray-40 p-1 text-black [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-black [&_[cmdk-group-heading]]:typography-M12',
			className
		)}
		{...props}
	/>
);

const CommandSeparator = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) => (
	<CommandPrimitive.Separator
		className={cn('-mx-1 h-px bg-gray-40', className)}
		{...props}
	/>
);

const CommandItem = ({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) => (
	<CommandPrimitive.Item
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-gray-20 data-[selected=true]:text-black data-[disabled=true]:opacity-50",
			className
		)}
		{...props}
	/>
);

const CommandShortcut = ({
	className,
	...props
}: React.ComponentProps<'span'>) => {
	return (
		<span
			className={cn(
				'text-muted-foreground ml-auto text-xs tracking-widest',
				className
			)}
			{...props}
		/>
	);
};

export {
	Command,
	// CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
};
