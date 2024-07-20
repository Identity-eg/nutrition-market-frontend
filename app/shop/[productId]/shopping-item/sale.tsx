const Sale = ({ price }) => {
	return (
		<>
			{0 ? (
				<div className="absolute z-10 rounded-full bg-red-500 px-3 text-white typography-R12">
					<p>-{(((price - 0) / price) * 100).toFixed()}%</p>
				</div>
			) : undefined}
		</>
	);
};

export default Sale;
