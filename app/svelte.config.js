import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	vitePlugin: {
		inspector: true
	},
	kit: {
		adapter: adapter(),
		version: {
			name: process.env.npm_package_version
		}
	}
};
export default config;
