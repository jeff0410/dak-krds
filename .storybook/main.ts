import type { StorybookConfig } from "@storybook/react-vite";

// vite.config.ts 는 라이브러리 배포용이라 선언 파일 생성 · 글꼴 복사 · CSS 주입
// 플러그인이 함께 들어 있다. 스토리북에서는 필요 없고 출력물을 어지럽힌다.
const LIBRARY_ONLY_PLUGINS = [
	"vite:dts",
	"dak-krds-font-and-bundled-css",
	"vite-plugin-lib-inject-css",
];

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(ts|tsx)"],
	// 에이전트가 읽는 manifest.json · llms.txt 를 카탈로그와 같은 주소로 낸다.
	staticDirs: ["../public"],
	addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	viteFinal: async (config) => {
		// build.lib 이 남아 있으면 스토리북 산출물이 라이브러리 형태로 나온다.
		if (config.build) {
			config.build.lib = undefined;
			config.build.rollupOptions = undefined;
		}
		config.plugins = (config.plugins ?? []).filter((plugin) => {
			const name =
				plugin && typeof plugin === "object" && "name" in plugin
					? String(plugin.name)
					: "";
			return !LIBRARY_ONLY_PLUGINS.includes(name);
		});
		return config;
	},
};

export default config;
