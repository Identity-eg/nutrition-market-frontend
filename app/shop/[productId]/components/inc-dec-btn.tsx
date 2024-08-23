
export function IncDecBtn({ amount }: { amount: number }) {
	return (
		<div className='flex max-w-[107px] flex-grow items-center justify-center gap-6 rounded-md border border-gray-40 px-4'>
			<span
				className='cursor-pointer'
				// onClick={() =>
				// 	count > 1 && setCount(prev => (prev >= 1 ? prev - 1 : prev))
				// }
			>
				-
			</span>
			<h3>{amount ?? 1}</h3>
			<span
				// onClick={() => setCount(prev => prev + 1)}
				className='text-green-500 cursor-pointer'>
				+
			</span>
		</div>
	);
}
