import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";

type StoryIndex = {
	entries: Record<string, { id: string; title: string; name: string; type: string }>;
};

const index: StoryIndex = JSON.parse(
	readFileSync("storybook-static/index.json", "utf-8"),
);

const stories = Object.values(index.entries).filter(
	(entry) => entry.type === "story",
);

test.describe("스토리 시각 회귀", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await page.waitForSelector("#storybook-root", { state: "attached" });
			await page.evaluate(() => document.fonts.ready);
			await page.waitForTimeout(150);

			await expect(page).toHaveScreenshot(`${story.id}.png`, {
				fullPage: true,
			});
		});
	}
});
