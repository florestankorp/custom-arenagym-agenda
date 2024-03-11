/* eslint-disable multiline-comment-style */
/* eslint-disable sort-imports */

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://florestankorp.github.io/custom-arenagym-agenda/',
	plugins: [svelte()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.ts',
	},
});
