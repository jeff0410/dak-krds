import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["cjs", "esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	external: [
		"react",
		"react-dom",
		"@mui/material",
		"@fullcalendar/daygrid",
		"@fullcalendar/interaction",
		"@fullcalendar/react",
		"material-react-table",
	],
	treeshake: true,
	minify: false,
	injectStyle: true,
	esbuildOptions(options) {
		options.banner = {
			js: '"use client";',
		};
		options.loader = {
			".svg": "empty",
			".png": "empty",
			".jpg": "empty",
			".jpeg": "empty",
			".gif": "empty",
			".webp": "empty",
		};
	},
});
