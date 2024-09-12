'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

export function CopyBtn({ orderId }: { orderId: string }) {
	const [textWillCopied] = useState(orderId ?? 123456);
	const [isCopied, setIsCopied] = useState(false);

	const copyOrderId = () => {
		navigator.clipboard.writeText(textWillCopied);

		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<span className='flex items-center gap-2 rounded-md border border-gray-50 bg-gray-20 px-2 py-1 text-green-light-700'>
			{`#${textWillCopied}`}
			{isCopied ? (
				<CheckIcon
					className='text-gray-300'
					size={16}
				/>
			) : (
				<CopyIcon
					onClick={copyOrderId}
					className='cursor-pointer text-gray-300'
					size={16}
				/>
			)}
		</span>
	);
}
