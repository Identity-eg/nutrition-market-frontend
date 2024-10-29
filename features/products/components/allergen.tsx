import React from 'react';
import { BeanOffIcon, DnaOffIcon, WheatOffIcon } from 'lucide-react';

export function Allergen() {
	return (
		<div className='border-b border-gray-50 pb-10'>
			<p className='mb-4 typography-B18'>Allergen notice</p>
			<div className='flex gap-4 text-green-500'>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-2 rounded-full border border-green-500 p-6'>
						<BeanOffIcon />
					</div>
					<span className='typography-M16'>Soy-free</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-2 rounded-full border border-green-500 p-6'>
						<WheatOffIcon />
					</div>
					<span className='typography-M16'>Gluten-free</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<div className='mb-2 rounded-full border border-green-500 p-6'>
						<DnaOffIcon />
					</div>
					<span className='typography-M16'>No-gmo</span>
				</div>
			</div>
		</div>
	);
}
