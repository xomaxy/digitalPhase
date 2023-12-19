import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

console.log('process.env.BASE_PATH', process.env.BASE_PATH);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: '/digitalPhase' //!process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
	},
	preprocess: vitePreprocess()
};

export default config;