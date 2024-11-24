import React from 'react';
import { LoaderCircleIcon } from 'lucide-react';

export default function Loading() {
	return (
		<div className='flex h-screen animate-spin flex-col items-center justify-center'>
			<LoaderCircleIcon
				size={40}
				className='text-green-500'
			/>
		</div>
	);
}
