import { expect, test } from "@playwright/test";
import { settle } from "./settle";

const MODALS = [
	["모달-개요--작은모달", "SmallModal"],
	["모달-개요--중간모달", "MediumModal"],
	["모달-개요--큰모달", "LargeModal"],
	["모달-개요--대화상자", "DialogModal"],
] as const;

const open = async (page: import("@playwright/test").Page, id: string) => {
	await page.goto(`/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`);
	await settle(page);
};

for (const [id, label] of MODALS) {
	test(`${label} — 구조와 속성`, async ({ page }) => {
		await open(page, id);
		const info = await page.evaluate(() => {
			const dialog = document.querySelector("[role='dialog']");
			const backdrop = document.querySelector("#backdrop");
			const bs = backdrop ? getComputedStyle(backdrop) : null;
			return {
				role_dialog: !!dialog,
				aria_modal: dialog?.getAttribute("aria-modal") ?? null,
				이름: dialog?.getAttribute("aria-label") ?? dialog?.getAttribute("aria-labelledby") ?? null,
				backdrop: !!backdrop,
				backdropBg: bs?.backgroundColor ?? null,
				backdropOpacity: bs?.opacity ?? null,
				가운데정렬: bs ? `${bs.alignItems}/${bs.justifyContent}` : null,
				스크롤잠금: getComputedStyle(document.body).overflow,
			};
		});
		console.log(`[${label}] ${JSON.stringify(info)}`);
		expect(info.role_dialog, "role=dialog 가 있어야 한다").toBe(true);
		expect(info.aria_modal, "aria-modal 이 있어야 한다").toBe("true");
		expect(info.이름, "이름이 있어야 한다").not.toBeNull();
		expect(info.backdrop, "backdrop 이 있어야 한다").toBe(true);
		expect(info.스크롤잠금, "뒤 화면 스크롤이 잠겨야 한다").toBe("hidden");
	});

	test(`${label} — 초점 가둠과 복귀`, async ({ page }) => {
		await open(page, id);
		const inside = async () =>
			page.evaluate(() => {
				const active = document.activeElement;
				const portal = document.querySelector(".portal-wrap");
				return {
					active: active?.tagName.toLowerCase() + ":" + (active?.textContent ?? "").trim().slice(0, 10),
					모달안: !!(portal && active && portal.contains(active)),
				};
			});

		const first = await inside();
		const seq: boolean[] = [first.모달안];
		for (let i = 0; i < 8; i += 1) {
			await page.keyboard.press("Tab");
			seq.push((await inside()).모달안);
		}
		const escaped = seq.filter((one) => !one).length;
		console.log(`[${label}] 초점 시작=${first.active} / 탭 9회 중 모달 밖=${escaped}`);
		expect(escaped, "탭이 모달 밖으로 나가면 안 된다").toBe(0);
	});

	test(`${label} — Esc 로 닫힘`, async ({ page }) => {
		await open(page, id);
		const before = await page.locator("#modal-content").count();
		await page.keyboard.press("Escape");
		await page.waitForTimeout(500);
		const after = await page.locator("#modal-content").count();
		console.log(`[${label}] Esc 전=${before} 후=${after}`);
		expect(before).toBe(1);
		expect(after, "Esc 로 닫혀야 한다").toBe(0);
	});

	test(`${label} — 배경 클릭으로 닫힘`, async ({ page }) => {
		await open(page, id);
		const before = await page.locator("#modal-content").count();
		await page.locator("#backdrop").click({ position: { x: 5, y: 5 } });
		await page.waitForTimeout(500);
		const after = await page.locator("#modal-content").count();
		console.log(`[${label}] 배경클릭 전=${before} 후=${after}`);
		expect(before).toBe(1);
		expect(after, "배경을 누르면 닫혀야 한다").toBe(0);
	});
}

test("겹쳐 열기 — 위 모달만 Esc 로 닫힘", async ({ page }) => {
	await open(page, "모달-개요--겹쳐열기");
	const count = async () => page.locator("#modal-content").count();
	const before = await count();
	await page.keyboard.press("Escape");
	await page.waitForTimeout(500);
	const after = await count();
	const names = await page.evaluate(() =>
		Array.from(document.querySelectorAll("[role='dialog']")).map((d) => {
			const id = d.getAttribute("aria-labelledby");
			return id ? (document.getElementById(id)?.textContent ?? "").trim() : "";
		}),
	);
	console.log(`[겹쳐열기] Esc 전=${before} 후=${after} 남은 이름=${JSON.stringify(names)}`);
	expect(before).toBe(2);
	expect(after, "Esc 는 맨 위 하나만 닫아야 한다").toBe(1);
});
