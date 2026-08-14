import { expect, test } from "@playwright/test";
import { existsSync, readdirSync, readFileSync } from "node:fs";
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

const SNAPSHOT_DIR = "tests/visual/__snapshots__/stories.spec.ts-snapshots";

test.describe("스토리 시각 회귀", () => {
	// 스토리를 지우면 기준선은 그대로 남는다. --update-snapshots 도 지우지 않는다.
	// 남은 기준선은 아무도 검사하지 않으므로 조용히 쌓인다.
	test("주인 없는 기준선이 없다", () => {
		if (!existsSync(SNAPSHOT_DIR)) return;

		const ids = new Set(stories.map((story) => story.id));
		const orphans = readdirSync(SNAPSHOT_DIR).filter((file) => {
			const match = file.match(/^(.*)-(?:desktop|mobile)-[a-z]+\.png$/);
			return match ? !ids.has(match[1]) : true;
		});

		expect(orphans, "지워진 스토리의 기준선이 남아 있다").toEqual([]);
	});

	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await settle(page);

			await expect(page).toHaveScreenshot(`${story.id}.png`, {
				fullPage: true,
			});
		});
	}
});
