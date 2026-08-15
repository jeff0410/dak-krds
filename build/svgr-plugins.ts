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
					// 기본 회색만 currentColor 로 바꾼다. 그래야 아이콘이 놓인 곳의
					// 글자색을 따라간다. 파란 버튼 위에서 회색으로 남던 문제가 이것이다.
					// 파랑·빨강·다색 아이콘은 고유한 색이므로 건드리지 않는다.
					{ name: "convertColors", params: { currentColor: "#33363D" } },
				],
			},
		}),
		enforce: "pre",
	} as Plugin,
];
