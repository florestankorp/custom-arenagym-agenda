/* eslint-disable sort-keys */
/** @type { import("eslint").Linter.Config } */
module.exports = {
	root: true,
	rules: {
		'sort-imports': 'off',
		'func-style': 'off',
		'one-var': 'off',
		'no-ternary': 'off',
		'sort-keys': 'off',
		'capitalized-comments': 'off',
		'multiline-comment-style': 'off',
		'svelte/block-lang': 'off',
		'@typescript-eslint/no-shadow': 'off',
		'@typescript-eslint/prefer-readonly-parameter-types': 'off',
	},
	extends: ['eslint:all', 'plugin:@typescript-eslint/all', 'plugin:svelte/all', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		project: './tsconfig.json',
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
		},
	],
};
