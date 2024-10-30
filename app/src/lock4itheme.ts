import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const lock4itheme: CustomThemeConfig = {
	name: 'lock4itheme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': `SourceSans3ExtraLight, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
		'--theme-font-family-heading': `Iceland, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '9999px',
		'--theme-rounded-container': '6px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '0 0 0',
		'--on-secondary': '255 255 255',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #219EBC
		'--color-primary-50': '222 240 245', // #def0f5
		'--color-primary-100': '211 236 242', // #d3ecf2
		'--color-primary-200': '200 231 238', // #c8e7ee
		'--color-primary-300': '166 216 228', // #a6d8e4
		'--color-primary-400': '100 187 208', // #64bbd0
		'--color-primary-500': '33 158 188', // #219EBC
		'--color-primary-600': '30 142 169', // #1e8ea9
		'--color-primary-700': '25 119 141', // #19778d
		'--color-primary-800': '20 95 113', // #145f71
		'--color-primary-900': '16 77 92', // #104d5c
		// secondary | #023047
		'--color-secondary-50': '217 224 227', // #d9e0e3
		'--color-secondary-100': '204 214 218', // #ccd6da
		'--color-secondary-200': '192 203 209', // #c0cbd1
		'--color-secondary-300': '154 172 181', // #9aacb5
		'--color-secondary-400': '78 110 126', // #4e6e7e
		'--color-secondary-500': '2 48 71', // #023047
		'--color-secondary-600': '2 43 64', // #022b40
		'--color-secondary-700': '2 36 53', // #022435
		'--color-secondary-800': '1 29 43', // #011d2b
		'--color-secondary-900': '1 24 35', // #011823
		// tertiary | #FFB703
		'--color-tertiary-50': '255 244 217', // #fff4d9
		'--color-tertiary-100': '255 241 205', // #fff1cd
		'--color-tertiary-200': '255 237 192', // #ffedc0
		'--color-tertiary-300': '255 226 154', // #ffe29a
		'--color-tertiary-400': '255 205 79', // #ffcd4f
		'--color-tertiary-500': '255 183 3', // #FFB703
		'--color-tertiary-600': '230 165 3', // #e6a503
		'--color-tertiary-700': '191 137 2', // #bf8902
		'--color-tertiary-800': '153 110 2', // #996e02
		'--color-tertiary-900': '125 90 1', // #7d5a01
		// success | #9AAA00
		'--color-success-50': '240 242 217', // #f0f2d9
		'--color-success-100': '235 238 204', // #ebeecc
		'--color-success-200': '230 234 191', // #e6eabf
		'--color-success-300': '215 221 153', // #d7dd99
		'--color-success-400': '184 196 77', // #b8c44d
		'--color-success-500': '154 170 0', // #9AAA00
		'--color-success-600': '139 153 0', // #8b9900
		'--color-success-700': '116 128 0', // #748000
		'--color-success-800': '92 102 0', // #5c6600
		'--color-success-900': '75 83 0', // #4b5300
		// warning | #FB8500
		'--color-warning-50': '254 237 217', // #feedd9
		'--color-warning-100': '254 231 204', // #fee7cc
		'--color-warning-200': '254 225 191', // #fee1bf
		'--color-warning-300': '253 206 153', // #fdce99
		'--color-warning-400': '252 170 77', // #fcaa4d
		'--color-warning-500': '251 133 0', // #FB8500
		'--color-warning-600': '226 120 0', // #e27800
		'--color-warning-700': '188 100 0', // #bc6400
		'--color-warning-800': '151 80 0', // #975000
		'--color-warning-900': '123 65 0', // #7b4100
		// error | #D41976
		'--color-error-50': '249 221 234', // #f9ddea
		'--color-error-100': '246 209 228', // #f6d1e4
		'--color-error-200': '244 198 221', // #f4c6dd
		'--color-error-300': '238 163 200', // #eea3c8
		'--color-error-400': '225 94 159', // #e15e9f
		'--color-error-500': '212 25 118', // #D41976
		'--color-error-600': '191 23 106', // #bf176a
		'--color-error-700': '159 19 89', // #9f1359
		'--color-error-800': '127 15 71', // #7f0f47
		'--color-error-900': '104 12 58', // #680c3a
		// surface | #8ECAE6
		'--color-surface-50': '238 247 251', // #eef7fb
		'--color-surface-100': '232 244 250', // #e8f4fa
		'--color-surface-200': '227 242 249', // #e3f2f9
		'--color-surface-300': '210 234 245', // #d2eaf5
		'--color-surface-400': '176 218 238', // #b0daee
		'--color-surface-500': '142 202 230', // #8ECAE6
		'--color-surface-600': '128 182 207', // #80b6cf
		'--color-surface-700': '107 152 173', // #6b98ad
		'--color-surface-800': '85 121 138', // #55798a
		'--color-surface-900': '70 99 113' // #466371
	}
};
