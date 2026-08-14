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

// 이름을 직접 계산하지 않는다. 접근성 이름 규칙은 자식 요소까지 거슬러 올라가는
// 데다 예외가 많아, 손으로 흉내 내면 틀린다. 실제로 표의 정렬 버튼을 이름 없음으로
// 잘못 잡은 적이 있다. 브라우저가 만든 접근성 트리를 그대로 읽는다.
const ROLES = [
	"button",
	"link",
	"textbox",
	"combobox",
	"searchbox",
	"checkbox",
	"radio",
	"switch",
	"slider",
	"spinbutton",
	"tab",
];

// 이름이 붙은 줄은 `- button "저장":` 처럼 따옴표가 따라온다.
// 이름이 없으면 `- button:` 또는 `- button` 으로 끝난다.
const UNNAMED = new RegExp(`^\\s*-\\s*(${ROLES.join("|")})\\s*:?\\s*$`);

test.describe("접근 가능한 이름 (WCAG 4.1.2)", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await settle(page);

			const snapshot = await page.locator("#storybook-root").ariaSnapshot();
			const unnamed = snapshot
				.split("\n")
				.map((line) => line.match(UNNAMED)?.[1])
				.filter((role): role is string => Boolean(role));

			const counted = unnamed.reduce<Record<string, number>>((acc, role) => {
				acc[role] = (acc[role] ?? 0) + 1;
				return acc;
			}, {});

			const report = Object.entries(counted)
				.map(([role, count]) => `이름 없는 ${role} ${count}개`)
				.join("\n");

			expect(report, `${report}\n\n접근성 트리:\n${snapshot}`).toBe("");
		});
	}
});
