import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createTypographyUtilities = ({
	fontSizeRange,
}: {
	fontSizeRange: number[];
}) => {
	const sizesRange = fontSizeRange.map(size => {
		const fontWeights = [
			{ w: 800, n: 'EB' },
			{ w: 700, n: 'B' },
			{ w: 600, n: 'SB' },
			{ w: 500, n: 'M' },
			{ w: 400, n: 'R' },
			{ w: 300, n: 'L' },
		];
		const utilities = fontWeights.map(weight => {
			return {
				[`.typography-${weight.n}${size}`]: {
					fontWeight: weight.w,
					fontSize: `${size}px`,
				},
			};
		});

		return utilities;
	});
	const flattenedArray = sizesRange.flat();
	const flattenedObject = Object.assign({}, ...flattenedArray);

	return flattenedObject;
};
