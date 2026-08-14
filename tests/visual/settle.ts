import type { Page } from "@playwright/test";

// 타이머나 전환 효과로 뒤늦게 그려지는 컴포넌트가 있다.
// 고정된 시간만 기다리면 그 전에 검사해 빈 화면을 통과시킨다.
// 실제로 Drawer 는 230ms 뒤에 나타나서 대비 검사를 그냥 지나쳤다.
export async function settle(page: Page, quietMs = 200, maxMs = 2000) {
	await page.waitForSelector("#storybook-root", { state: "attached" });
	await page.evaluate(() => document.fonts.ready);

	await page.evaluate(
		([quiet, max]) =>
			new Promise<void>((resolve) => {
				let timer = 0;
				const observer = new MutationObserver(() => {
					window.clearTimeout(timer);
					timer = window.setTimeout(finish, quiet);
				});

				const finish = () => {
					observer.disconnect();
					window.clearTimeout(timer);
					resolve();
				};

				observer.observe(document.body, {
					subtree: true,
					childList: true,
					attributes: true,
				});
				timer = window.setTimeout(finish, quiet);
				window.setTimeout(finish, max);
			}),
		[quietMs, maxMs] as const,
	);
}
