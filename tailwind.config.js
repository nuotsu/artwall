/** @type {import('tailwindcss').Config} */
export default {
	content: ['./**/*.{svelte,html}'],
	theme: {
		extend: {
			screens: {
				'xs': { min: '480px' },
				'<xs': { max: '479px' },
				'<sm': { max: '639px' },
				'<md': { max: '767px' },
				'<lg': { max: '1023px' },
				'<xl': { max: '1279px' },
			},
		},
	},
	plugins: [],
}
