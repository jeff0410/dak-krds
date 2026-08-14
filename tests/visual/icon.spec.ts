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

// viewBox 가 없으면 아이콘은 좌표계를 잃는다. width/height 로 상자만 커지고 그림은
// 원래 크기 그대로 좌측 위에 남는다. SVGO 가 기본으로 viewBox 를 지우는 바람에
// 24 가 아닌 캔버스에 그려진 아이콘 66개가 작게 몰리거나 잘려 있었다.
const collect = () => {
	const root = document.getElementById("storybook-root");
	if (!root) return [];

	const findings: string[] = [];

	for (const svg of Array.from(root.querySelectorAll("svg"))) {
		const box = svg.getBoundingClientRect();
		if (box.width < 2 || box.height < 2) continue;

		const viewBox = svg.getAttribute("viewBox");
		if (!viewBox) {
			findings.push("viewBox 없음");
			continue;
		}

		const [left, top, width, height] = viewBox.split(/\s+/).map(Number);
		if (!width || !height) {
			findings.push(`viewBox 값이 이상하다: "${viewBox}"`);
			continue;
		}

		let ink: DOMRect;
		try {
			ink = (svg as SVGGraphicsElement).getBBox();
		} catch {
			continue;
		}
		if (!ink.width || !ink.height) continue;

		// 그림이 캔버스 한쪽으로 쏠려 있으면 좌표계가 어긋난 것이다. 면적으로 재면
		// 가로줄 하나짜리 아이콘이 걸리므로 중심이 얼마나 밀렸는지로 본다.
		// 정상 아이콘은 최대 10%, 좌표계가 깨지면 25% 였다.
		const offX = Math.abs(ink.x + ink.width / 2 - (left + width / 2)) / width;
		const offY = Math.abs(ink.y + ink.height / 2 - (top + height / 2)) / height;
		const off = Math.max(offX, offY);
		if (off > 0.15) {
			findings.push(
				`그림이 중심에서 ${(off * 100).toFixed(0)}% 밀렸다 — viewBox "${viewBox}", ` +
					`그림 ${ink.width.toFixed(1)}x${ink.height.toFixed(1)} @(${ink.x.toFixed(1)}, ${ink.y.toFixed(1)})`,
			);
		}
	}

	return [...new Set(findings)];
};

test.describe("아이콘 좌표계", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await settle(page);

			const findings: string[] = await page.evaluate(collect);
			expect(findings.join("\n"), findings.join("\n")).toBe("");
		});
	}
});
