import {
	copyFileSync,
	mkdirSync,
	readFileSync,
	renameSync,
	writeFileSync,
} from "fs";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig, type Plugin } from "vite";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

const FONT = "PretendardGOVVariable.woff2";

const external = [
	/^react($|\/)/,
	/^react-dom($|\/)/,
	/^@mui\//,
	/^@emotion\//,
	/^@fullcalendar\//,
	/^material-react-table($|\/)/,
	/^@js-joda\//,
	/^lodash-es($|\/)/,
];

const plainCssName = (file: string) => file.replace(/\.module\.css$/, ".css");

const emitFontAndBundledCss = (): Plugin => ({
	name: "dak-krds-font-and-bundled-css",
	apply: "build",
	writeBundle(options, bundle) {
		const outDir = options.dir ?? resolve(__dirname, "dist");

		const cssFiles = Object.keys(bundle).filter((f) => f.endsWith(".css"));
		for (const file of cssFiles) {
			const renamed = plainCssName(file);
			if (renamed === file) continue;
			renameSync(resolve(outDir, file), resolve(outDir, renamed));
		}

		for (const file of Object.keys(bundle)) {
			if (!/\.(mjs|cjs)$/.test(file)) continue;
			const path = resolve(outDir, file);
			const code = readFileSync(path, "utf-8");
			const rewritten = code.replace(/\.module\.css(['"])/g, ".css$1");
			if (rewritten !== code) writeFileSync(path, rewritten);
		}

		const fontDir = resolve(outDir, "styles/fonts");
		mkdirSync(fontDir, { recursive: true });
		copyFileSync(
			resolve(__dirname, "src/assets/font", FONT),
			resolve(fontDir, FONT),
		);

		const globals = cssFiles.filter((f) => f === "styles/index.css");
		const modules = cssFiles.filter((f) => f !== "styles/index.css").sort();
		const combined = [...globals, ...modules]
			.map((f) =>
				readFileSync(resolve(outDir, plainCssName(f)), "utf-8").replaceAll(
					"./fonts/",
					"./styles/fonts/",
				),
			)
			.join("\n");
		writeFileSync(resolve(outDir, "styles.css"), combined);
	},
});

export default defineConfig({
	plugins: [
		react(),
		libInjectCss(),
		dts({
			include: ["src"],
			exclude: ["src/**/*.stories.tsx", "src/**/*.test.tsx"],
		}),
		emitFontAndBundledCss(),
	],
	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "DakKrds",
		},
		rollupOptions: {
			external,
			output: [
				{
					format: "es",
					dir: "dist",
					preserveModules: true,
					preserveModulesRoot: "src",
					entryFileNames: "[name].mjs",
					assetFileNames: "[name][extname]",
				},
				{
					format: "cjs",
					dir: "dist",
					preserveModules: true,
					preserveModulesRoot: "src",
					entryFileNames: "[name].cjs",
					exports: "named",
					assetFileNames: "[name][extname]",
				},
			],
		},
		sourcemap: false,
	},
	resolve: {
		alias: {
			src: resolve(__dirname, "src"),
		},
	},
});
