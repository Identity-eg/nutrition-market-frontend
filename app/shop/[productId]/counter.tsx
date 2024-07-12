import { Button } from 'components/ui/button';

type TIncreaseDecreaseButtons = {
	itemAmount: number;
	onIncrease: () => void;
	onDecrease: () => void;
};

export default function Counter({
	itemAmount,
	onIncrease,
	onDecrease,
}: TIncreaseDecreaseButtons) {
	return (
		<div className="flex items-center gap-6 rounded-md border border-gray-40 px-4">
			<span
				className="cursor-pointer"
				onClick={onDecrease}
			>
				-
			</span>
			<h3>{itemAmount}</h3>
			<span
				onClick={onIncrease}
				className="cursor-pointer text-green-500"
			>
				+
			</span>
		</div>
	);
}
