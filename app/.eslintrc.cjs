/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:svelte/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'fp'],
	rules: {
		'fp/no-arguments': 'error',
		'fp/no-class': 'error',
		'fp/no-delete': 'error',
		'fp/no-events': 'error',
		'fp/no-get-set': 'error',
		'fp/no-let': 'error',
		'fp/no-loops': 'error',
		'fp/no-mutating-assign': 'error',
		'fp/no-mutating-methods': 'error',
		'fp/no-mutation': 'error',
		'fp/no-nil': 'error',
		'fp/no-proxy': 'error',
		'fp/no-rest-parameters': 'error',
		'fp/no-this': 'error',
		'fp/no-throw': 'error',
		'fp/no-unused-expression': 'error',
		'fp/no-valueof-field': 'error',
		'no-var': 'error'
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2022: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	]
};
