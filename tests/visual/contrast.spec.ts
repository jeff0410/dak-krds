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

type Finding = {
	ratio: number;
	required: number;
	text: string;
	color: string;
	background: string;
	selector: string;
};

const collect = () => {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;
	const paint = canvas.getContext("2d", { willReadFrequently: true });

	// getComputedStyle 이 늘 rgb() 를 주지는 않는다. oklch() lab() color-mix() 는
	// 그대로 나온다. 숫자만 긁어 rgb 로 치면 엉뚱한 값이 나온다. 실제로 Tailwind 4
	// 를 쓰는 앱에서 oklch(0.985 …) 를 rgb(1, 0, 248) 로 읽어 오탐을 냈다.
	// 브라우저에게 sRGB 로 그려 달라고 하고 그 픽셀을 읽는다.
	const viaCanvas = (value: string): [number, number, number, number] | null => {
		if (!paint) return null;
		paint.clearRect(0, 0, 1, 1);
		paint.fillStyle = "#000";
		paint.fillStyle = value;
		if (paint.fillStyle === "#000" && !/^#0{3,8}$|black/i.test(value)) return null;
		paint.clearRect(0, 0, 1, 1);
		paint.fillRect(0, 0, 1, 1);
		const [r, g, b, a] = paint.getImageData(0, 0, 1, 1).data;
		if (a === 0) return [0, 0, 0, 0];
		// getImageData 는 알파를 곱한 값을 준다. 원래 색으로 되돌린다.
		const alpha = a / 255;
		return [r / alpha, g / alpha, b / alpha, alpha];
	};

	const unresolved: string[] = [];

	const toRgba = (value: string): [number, number, number, number] => {
		const plain = value.match(
			/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)(?:[\s,/]+([\d.%]+))?\s*\)$/,
		);
		if (plain) {
			const alpha = plain[4]?.endsWith("%")
				? Number.parseFloat(plain[4]) / 100
				: Number(plain[4] ?? 1);
			return [Number(plain[1]), Number(plain[2]), Number(plain[3]), alpha];
		}
		if (value === "transparent") return [0, 0, 0, 0];

		const painted = viaCanvas(value);
		if (painted) return painted;

		// 조용히 틀린 값을 쓰느니 못 읽었다고 알린다.
		unresolved.push(value);
		return [0, 0, 0, 0];
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

	for (const value of [...new Set(unresolved)]) {
		findings.push({
			ratio: 0,
			required: 0,
			text: `색을 읽지 못했다: ${value}`,
			color: value,
			background: "-",
			selector: "-",
		});
	}

	return findings;
};

test.describe("명도 대비 (WCAG 2.1 AA)", () => {
	for (const story of stories) {
		test(`${story.title} — ${story.name}`, async ({ page }) => {
			await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);
			await settle(page);

			const findings: Finding[] = await page.evaluate(collect);

			const report = findings
				.map((f) =>
					f.required === 0
						? f.text
						: `${f.ratio}:1 (기준 ${f.required}:1) "${f.text}" — ${f.selector}\n` +
							`    글자 ${f.color} / 배경 ${f.background}`,
				)
				.join("\n");

			expect(report, `대비 기준 미달\n${report}`).toBe("");
		});
	}
});
