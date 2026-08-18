import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { settle } from "./settle";

type StoryIndex = {
	entries: Record<string, { id: string; title: string; name: string; type: string }>;
};

const index: StoryIndex = JSON.parse(
	readFileSync("storybook-static/index.json", "utf-8"),
);

const stories = Object.values(index.entries).filter(
	(entry) => entry.type === "story",
);

// 키보드로 옮겨 다닐 때 지금 어디에 있는지 보여야 한다. WCAG 2.1 SC 2.4.7.
// outline 을 지우고 색만 바꾸는 것으로는 부족하다. LinkButton 이 그랬다.
//
// 네이티브 오디오·비디오는 브라우저가 내부 컨트롤에 표시를 그린다. 바깥
// 요소만 보면 outline 이 없다고 나오므로 검사에서 뺀다.
const SKIP = new Set(["audio", "video"]);

test.describe("초점 표시 (WCAG 2.4.7)", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await settle(page);

			const count = await page.evaluate(
				() =>
					document.querySelectorAll(
						"#storybook-root button, #storybook-root a[href], #storybook-root input, #storybook-root select, #storybook-root textarea",
					).length,
			);
			if (!count) return;

			const missing = new Set<string>();
			for (let step = 0; step < Math.min(count + 2, 30); step += 1) {
				await page.keyboard.press("Tab");
				const row = await page.evaluate(() => {
					const el = document.activeElement;
					if (!el || el === document.body) return null;
					if (!el.closest("#storybook-root")) return null;

					const style = getComputedStyle(el);
					const ring =
						(style.outlineStyle !== "none" &&
							Number.parseFloat(style.outlineWidth) > 0) ||
						(style.boxShadow !== "none" && style.boxShadow !== "");

					const classes = Array.from(el.classList)
						.map((name) => name.replace(/_[a-z0-9]{4,}_\d+$/, ""))
						.slice(0, 2)
						.join(".");

					return {
						ring,
						tag: el.tagName.toLowerCase(),
						label: `${el.tagName.toLowerCase()}${classes ? `.${classes}` : ""}`,
					};
				});
				if (!row || SKIP.has(row.tag)) continue;
				if (!row.ring) missing.add(row.label);
			}

			const report = [...missing]
				.map((one) => `초점 표시 없음 — ${one}`)
				.join("\n");
			expect(report, report).toBe("");
		});
	}
});
