import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ['src'],
			exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx'],
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'DakKrds',
			formats: ['es', 'cjs'],
			fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
		},
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				'react/jsx-runtime',
				'@mui/material',
				'@fullcalendar/daygrid',
				'@fullcalendar/interaction',
				'@fullcalendar/react',
				'material-react-table',
				'@js-joda/core',
				'lodash-es',
			],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
		sourcemap: true,
		cssCodeSplit: true,
	},
	resolve: {
		alias: {
			src: resolve(__dirname, 'src'),
		},
	},
});
