import { readFileSync } from "fs";
import svgr from "@svgr/rollup";
import type { Plugin } from "vite";

const rawSvgLoader = (): Plugin => ({
	name: "dak-krds-raw-svg",
	enforce: "pre",
	load(id) {
		if (!id.endsWith(".svg")) return null;
		return readFileSync(id, "utf-8");
	},
});

export const svgrPlugins = (): Plugin[] => [
	rawSvgLoader(),
	{ ...svgr({ exportType: "default" }), enforce: "pre" } as Plugin,
];
