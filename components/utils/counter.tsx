export function Counter({
	count = 1,
	increaseByOne,
	decreaseByOne,
}: {
	count?: number;
	increaseByOne: () => void;
	decreaseByOne: () => void;
}) {
	return (
		<div className='flex max-w-[107px] flex-grow items-center justify-center gap-6 rounded-md border border-gray-40 px-4'>
			<span
				className='cursor-pointer'
				onClick={decreaseByOne}
			>
				-
			</span>
			<h3>{count}</h3>
			<span
				onClick={increaseByOne}
				className='cursor-pointer text-green-light-700'
			>
				+
			</span>
		</div>
	);
}
