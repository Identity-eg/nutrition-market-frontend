import { LoaderCircleIcon } from 'lucide-react';

export default function loading() {
	return (
		<div className='flex h-screen animate-spin flex-col items-center justify-center'>
			<LoaderCircleIcon
				size={40}
				className='text-green-500'
			/>
		</div>
	);
}
