'use client';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from 'components/ui/select';

export default function SortBy() {
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
		</article>
	);
}
