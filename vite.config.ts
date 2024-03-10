/* eslint-disable sort-imports */
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	base: 'https://florestankorp.github.io/custom-arenagym-agenda/',
	plugins: [svelte()]
});
