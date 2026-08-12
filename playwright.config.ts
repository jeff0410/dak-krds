import { defineConfig, devices } from "@playwright/test";

const PORT = 6007;

export default defineConfig({
	testDir: "./tests/visual",
	outputDir: "./tests/visual/.output",
	snapshotDir: "./tests/visual/__snapshots__",
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? "line" : [["list"]],
	timeout: 30_000,

	expect: {
		toHaveScreenshot: {
			// 같은 기기 · 같은 브라우저로 돌리므로 차이는 0 에 가까워야 한다.
			// 비율(%)로 두면 넓은 화면에서 작은 변화를 놓치고, 여유를 크게 주면
			// 모서리 반경 같은 작은 변화가 그대로 통과한다. 절대값으로 바짝 조인다.
			maxDiffPixels: 20,
			threshold: 0.1,
			animations: "disabled",
			caret: "hide",
		},
	},

	use: {
		baseURL: `http://127.0.0.1:${PORT}`,
		trace: "retain-on-failure",
	},

	projects: [
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
		},
		{
			// 기기 프리셋은 WebKit 을 끌어온다. 환경 편차를 줄이려고 폭만 가져와
			// 두 프로젝트 모두 Chromium 으로 맞춘다.
			name: "mobile",
			use: {
				...devices["Desktop Chrome"],
				viewport: { width: 390, height: 844 },
				isMobile: false,
				deviceScaleFactor: 2,
			},
		},
	],

	webServer: {
		command: `pnpm exec http-server storybook-static -p ${PORT} -s`,
		url: `http://127.0.0.1:${PORT}/index.html`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
	},
});
