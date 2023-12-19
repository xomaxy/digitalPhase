import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

console.log(process.env.BASE_PATH)

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	ssr: {
		noExternal: ['three']
	},
	base: '/digitalPhase'
});
