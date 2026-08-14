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

// SVGO 는 기본으로 viewBox 를 지운다. 그러면 아이콘이 좌표계를 잃어 크기 조절이
// 안 되고, Icon 쪽에서 24 로 못 박아 메워야 했다. 24 가 아닌 캔버스에 그려진
// 아이콘 66개가 작게 몰리거나 잘렸다. viewBox 를 남긴다.
export const svgrPlugins = (): Plugin[] => [
	rawSvgLoader(),
	{
		...svgr({
			exportType: "default",
			svgoConfig: {
				plugins: [
					{
						name: "preset-default",
						params: { overrides: { removeViewBox: false } },
					},
				],
			},
		}),
		enforce: "pre",
	} as Plugin,
];
