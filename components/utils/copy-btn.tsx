'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';

export function CopyBtn({ copyText }: { copyText: string }) {
	const [isCopied, setIsCopied] = useState(false);

	const copy = () => {
		navigator.clipboard.writeText(copyText);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	if (isCopied) {
		return (
			<CheckIcon
				className='text-gray-300'
				size={16}
			/>
		);
	}
	return (
		<CopyIcon
			onClick={copy}
			className='cursor-pointer text-gray-300'
			size={16}
		/>
	);
}
