'use client';

import { useState } from 'react';
import { LayoutGridIcon, MenuIcon } from 'lucide-react';
import { Button } from 'components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select';
import { Separator } from 'components/ui/separator';
import { cn } from 'lib/utils';

export default function SortBy() {
	const [gridLayout, setGridLayout] = useState(true);
	return (
		<article className="col-span-2 flex w-auto justify-between gap-x-4 media-sm:justify-self-end">
			<div className="flex items-center justify-center gap-x-4">
				<span className="capitalize text-gray-100 typography-M13">
					sort by :
				</span>
				<Select>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Select" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="light">Light</SelectItem>
						<SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<Separator
				orientation="vertical"
				className="hidden media-md:block"
			/>
			<div className="flex items-center justify-center gap-x-4">
				<Button
					variant="outline"
					size="icon"
					className={gridLayout ? 'bg-green-500' : 'bg-white'}
					onClick={() => setGridLayout(true)}
				>
					<LayoutGridIcon
						size={20}
						className={cn('text-green-500', { 'text-white': gridLayout })}
					/>
				</Button>
				<Button
					variant="outline"
					size="icon"
					className={gridLayout ? 'bg-white' : 'bg-green-500'}
					onClick={() => setGridLayout(false)}
				>
					<MenuIcon
						className={cn('text-white', { 'text-green-500': gridLayout })}
					/>
				</Button>
			</div>
		</article>
	);
}
