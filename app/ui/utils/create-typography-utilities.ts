// import Color from 'color';

// const LIGHTEN_RATIO = 0.05;
// const DARKEN_RATIO = 0.05;

// export const createColorUtilities = (hexColor: string, varients?: Record<string, string>) => {
//     const color = Color(hexColor);

//     let object: Record<string, Record<string, string> | string> | undefined;
//     if (varients) {
//         const obj = Object.entries(varients).reduce<Record<string, Record<string, string> | string>>(
//             (acc, [key, value]) => {
//                 const color = Color(value);
//                 acc[key] = {
//                     DEFAULT: color.hex(),
//                     lighter: color.lighten(LIGHTEN_RATIO).hex(),
//                     darker: color.darken(DARKEN_RATIO).hex(),
//                 };
//                 return acc;
//             },
//             {},
//         );

//         object = obj;
//     }

//     return {
//         DEFAULT: color.hex(),
//         lighter: color.lighten(LIGHTEN_RATIO).hex(),
//         darker: color.darken(DARKEN_RATIO).hex(),
//         ...object,
//     };
// };
export const createTypographyUtilities = ({ fontSizeRange }: { fontSizeRange: number[] }) => {
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

