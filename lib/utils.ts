import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const fontWeights = [
	{ w: 800, n: 'EB' },
	{ w: 700, n: 'B' },
	{ w: 600, n: 'SB' },
	{ w: 500, n: 'M' },
	{ w: 400, n: 'R' },
	{ w: 300, n: 'L' },
];

export const createTypographyUtilities = ({
	fontSizeRange,
}: {
	fontSizeRange: number[];
}) => {
	const sizesRange = fontSizeRange.map(size => {
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
export const createFluidTypographyUtilities = () => {
	const utilities = fontWeights.map(weight => {
		return {
			[`typo-${weight.n}`]: (value: string) => {
				const minVP = 360 / 16;
				const maxVP = 1920 / 16;
				const minFontSize = +value.split('-')[0] / 16;
				const maxFontSize = +value.split('-')[1] / 16;

				const slope = (maxFontSize - minFontSize) / (maxVP - minVP);
				const yIntersection = -minVP * slope + minFontSize;

				return {
					fontWeight: String(weight.w),
					fontSize: `clamp(${minFontSize}rem, ${yIntersection.toFixed(2)}rem + ${(slope * 100).toFixed(2)}vw, ${maxFontSize}rem)`,
				};
			},
		};
	});

	const result = utilities.reduce((acc, obj) => {
		const key = Object.keys(obj)[0];
		acc[key] = obj[key];
		return acc;
	}, {});

	return result;
};

export function convertToReadableNumber(num: number) {
	if (num && !isNaN(num)) {
		return parseInt(String(num), 10)?.toLocaleString();
	}
	return num;
}

const customTwMerge = extendTailwindMerge<'typography'>({
	extend: {
		classGroups: {
			typography: {
				typography: Object.keys(
					createTypographyUtilities({
						fontSizeRange: [12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 48, 52],
					})
				).map(k => k.replace('.typography-', '')),
			},
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return customTwMerge(clsx(inputs));
}
