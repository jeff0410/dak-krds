import react from "@vitejs/plugin-react";
import { svgrPlugins } from "./build/svgr-plugins";
import { resolve } from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [...svgrPlugins(), react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/setupTests.ts"],
		css: true,
		include: ["src/**/*.test.{ts,tsx}"],
	},
	resolve: {
		alias: { src: resolve(__dirname, "src") },
	},
});
