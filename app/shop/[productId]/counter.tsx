'use client';

import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState<number>(1);
	return (
		<div className="flex max-w-[107px] items-center gap-6 rounded-md border border-gray-40 px-4">
			<span
				className="cursor-pointer"
				onClick={() =>
					count > 1 && setCount(prev => (prev >= 1 ? prev - 1 : prev))
				}>
				-
			</span>
			<h3>{count}</h3>
			<span
				onClick={() => setCount(prev => prev + 1)}
				className="cursor-pointer text-green-500">
				+
			</span>
		</div>
	);
}
