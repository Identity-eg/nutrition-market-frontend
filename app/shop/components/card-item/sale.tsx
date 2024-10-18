const Sale = ({
	price,
	priceAfterDiscount,
}: {
	price: number;
	priceAfterDiscount: number;
}) => {
	if (!priceAfterDiscount) return null;
	return (
		<div className='absolute rounded-r-full bg-red-500 px-3 text-white typography-R12'>
			<p>{(((price - priceAfterDiscount) / price) * 100).toFixed()}%</p>
		</div>
	);
};

export default Sale;
