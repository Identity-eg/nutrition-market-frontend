import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { typography } from './app/ui/typography';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            'media-sm': '550px',
            'media-md': '991px',
        },
        container: {
            center: true,
            padding: '16px',
            screens: {
                md: '1200px',
            },
        },
        colors: {
            'blue-500': '#3F37C9',
            'blue-900': '#091E5A',
            gray: {
                1: '#F1F1F1',
                2: '#E2E3E6',
                3: '#C3C8CC',
                4: '#A9AEB2',
                5: '#90949A',
                6: '#707378',
            },
            white: '#fff',
            black: {
                1: '#313736',
                2: '#1D2322',
                3: '#0B0F0E',
            },
        },
        extend: {},
    },
    plugins: [
        plugin(({ addUtilities }) => {
            addUtilities(typography);
        }),
    ],
};
export default config;
