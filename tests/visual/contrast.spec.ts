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

type Finding = {
	ratio: number;
	required: number;
	text: string;
	color: string;
	background: string;
	selector: string;
};

const collect = () => {
	const toRgba = (value: string): [number, number, number, number] => {
		const parts = (value.match(/[\d.]+/g) ?? []).map(Number);
		return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 1];
	};

	const over = (
		top: [number, number, number, number],
		bottom: [number, number, number, number],
	): [number, number, number, number] => [
		top[0] * top[3] + bottom[0] * (1 - top[3]),
		top[1] * top[3] + bottom[1] * (1 - top[3]),
		top[2] * top[3] + bottom[2] * (1 - top[3]),
		1,
	];

	const channel = (value: number) => {
		const v = value / 255;
		return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
	};

	const luminance = ([r, g, b]: number[]) =>
		0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);

	const contrast = (a: number[], b: number[]) => {
		const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
		return (high + 0.05) / (low + 0.05);
	};

	// 요소 뒤에 실제로 깔리는 색. 반투명 배경을 조상 쪽으로 차례로 합성한다.
	// 그림이나 그러데이션이 깔려 있으면 계산할 수 없으므로 포기한다.
	const backdrop = (element: Element) => {
		let layer: [number, number, number, number] = [0, 0, 0, 0];
		let node: Element | null = element;

		while (node) {
			const style = getComputedStyle(node);
			if (style.backgroundImage !== "none") return null;

			const own = toRgba(style.backgroundColor);
			if (own[3] > 0) {
				layer = layer[3] === 0 ? own : over(layer, own);
				if (layer[3] >= 0.999) return layer;
			}
			node = node.parentElement;
		}

		const page = toRgba(getComputedStyle(document.body).backgroundColor);
		const base: [number, number, number, number] =
			page[3] >= 0.999 ? page : [255, 255, 255, 1];
		return layer[3] === 0 ? base : over(layer, base);
	};

	const describe = (element: Element) => {
		const classes = Array.from(element.classList)
			.map((name) => `.${name}`)
			.join("");
		return `${element.tagName.toLowerCase()}${classes}`;
	};

	const findings: Finding[] = [];

	// placeholder 는 의사 요소라 텍스트 노드로 잡히지 않는다.
	// 따로 보지 않으면 흐린 안내 문구가 통과해 버린다.
	for (const field of Array.from(
		document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
			"input[placeholder], textarea[placeholder]",
		),
	)) {
		if (field.disabled || !field.placeholder || field.value) continue;

		const behind = backdrop(field);
		if (!behind) continue;

		const style = getComputedStyle(field, "::placeholder");
		const foreground = toRgba(style.color);
		const blended =
			foreground[3] >= 0.999 ? foreground : over(foreground, behind);
		const ratio = contrast(blended, behind);

		if (ratio + 0.005 < 4.5) {
			findings.push({
				ratio: Number(ratio.toFixed(2)),
				required: 4.5,
				text: `${field.placeholder.slice(0, 24)} (placeholder)`,
				color: style.color,
				background: `rgb(${behind.slice(0, 3).map(Math.round).join(", ")})`,
				selector: describe(field),
			});
		}
	}

	for (const element of Array.from(document.querySelectorAll("*"))) {
		const text = Array.from(element.childNodes)
			.filter((node) => node.nodeType === Node.TEXT_NODE)
			.map((node) => node.textContent ?? "")
			.join("")
			.trim();
		if (!text) continue;

		const style = getComputedStyle(element);
		if (style.visibility === "hidden" || style.display === "none") continue;

		const box = element.getBoundingClientRect();
		if (box.width < 2 || box.height < 2) continue;

		// 비활성 요소는 WCAG 1.4.3 대비 기준에서 빠진다.
		if (element.closest("[disabled], [aria-disabled='true']")) continue;
		if (element.closest("[aria-hidden='true']")) continue;

		// 반투명하게 겹쳐 놓은 것은 최종 색을 신뢰할 수 없다.
		let faded = false;
		for (let node: Element | null = element; node; node = node.parentElement) {
			if (Number(getComputedStyle(node).opacity) < 1) faded = true;
		}
		if (faded) continue;

		const behind = backdrop(element);
		if (!behind) continue;

		const foreground = toRgba(style.color);
		const blended =
			foreground[3] >= 0.999 ? foreground : over(foreground, behind);

		const size = Number.parseFloat(style.fontSize);
		const bold = Number(style.fontWeight) >= 700;
		const large = size >= 24 || (size >= 18.66 && bold);
		const required = large ? 3 : 4.5;

		const ratio = contrast(blended, behind);
		if (ratio + 0.005 < required) {
			findings.push({
				ratio: Number(ratio.toFixed(2)),
				required,
				text: text.slice(0, 30),
				color: style.color,
				background: `rgb(${behind.slice(0, 3).map(Math.round).join(", ")})`,
				selector: describe(element),
			});
		}
	}

	return findings;
};

test.describe("명도 대비 (WCAG 2.1 AA)", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await page.waitForSelector("#storybook-root", { state: "attached" });
			await page.evaluate(() => document.fonts.ready);

			const findings: Finding[] = await page.evaluate(collect);

			const report = findings
				.map(
					(f) =>
						`${f.ratio}:1 (기준 ${f.required}:1) "${f.text}" — ${f.selector}\n` +
						`    글자 ${f.color} / 배경 ${f.background}`,
				)
				.join("\n");

			expect(report, `대비 기준 미달\n${report}`).toBe("");
		});
	}
});
