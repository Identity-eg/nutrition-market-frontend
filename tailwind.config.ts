import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import {
	createTypographyUtilities,
	createFluidTypographyUtilities,
} from './lib/utils';
import { colors } from './components/ui/colors';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./features/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: { DEFAULT: '1rem', 'media-md': '1.5rem' },
			screens: {
				'2xl': '1201px',
			},
		},
		screens: {
			'media-sm': '600px',
			'media-md': '768px',
			'media-lg': '1200px',
		},
		colors,
		extend: {
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				bounced: {
					'0%, 100% ': {
						transform: 'translateY(-75%)',
						'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
					},
					'50%': {
						transform: 'none',
						'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				bounced: 'bounced 0.5s infinite',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		plugin(({ addUtilities, matchUtilities, addVariant }) => {
			addUtilities({
				...createTypographyUtilities({
					fontSizeRange: [12, 13, 14, 16, 18, 20, 24, 28, 32, 36, 48, 52],
				}),
				['.behavior-discrete']: {
					transitionBehavior: 'allow-discrete',
				},
			});
			matchUtilities(createFluidTypographyUtilities(), {
				values: {
					'32-48': '32-48',
					'16-24': '16-24',
				},
			});

			addVariant('starting', '@starting-style');
		}),
	],
} satisfies Config;

export default config;
