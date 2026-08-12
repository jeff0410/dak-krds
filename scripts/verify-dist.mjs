import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

const failures = [];
const checks = [];

const check = (label, condition, detail = "") => {
	checks.push({ label, ok: Boolean(condition), detail });
	if (!condition) failures.push(`${label}${detail ? ` — ${detail}` : ""}`);
};

const walk = (dir) => {
	const out = [];
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else out.push(full);
	}
	return out;
};

if (!existsSync("dist")) {
	console.error("dist 가 없습니다. pnpm run build 를 먼저 실행하세요.");
	process.exit(1);
}

const files = walk("dist");
const read = (path) => readFileSync(path, "utf-8");

// 1. 진입점과 타입
for (const entry of ["dist/index.mjs", "dist/index.cjs", "dist/index.d.ts"]) {
	check(`진입점 존재: ${entry}`, existsSync(entry));
}

// 2. 전역 CSS 가 진입점에서 살아 있어야 한다 (0.1.18 회귀)
const entryEsm = read("dist/index.mjs");
check(
	"진입점이 전역 CSS 를 불러온다",
	entryEsm.includes("styles/index.css"),
	"디자인 토큰 · 폰트 · 리셋이 사라진다",
);
check(
	"sideEffects 가 진입점을 포함한다",
	["./dist/index.mjs", "./dist/index.cjs"].every((p) =>
		pkg.sideEffects?.includes(p),
	),
	"배럴이 트리셰이킹되면 전역 CSS 도 함께 사라진다",
);

// 3. Icon 세트가 컴포넌트여야 한다 (0.1.14~0.1.17 회귀)
// ?url 로 가져오는 이미지(Masthead 국기 등)는 문자열이 정상이므로 제외한다
const iconModules = files.filter(
	(f) => f.includes("assets/icon/") && f.endsWith(".svg.mjs"),
);
check("Icon 세트가 생성됐다", iconModules.length > 0, `${iconModules.length}개`);
const dataUriIcons = iconModules.filter((f) =>
	read(f).includes("data:image/svg+xml"),
);
check(
	"Icon 세트가 data URI 가 아니다",
	dataUriIcons.length === 0,
	dataUriIcons.length ? `${dataUriIcons.length}개가 문자열로 번들됨` : "",
);
const nonComponentIcons = iconModules.filter((f) => !read(f).includes("react"));
check(
	"Icon 세트가 React 컴포넌트다",
	nonComponentIcons.length === 0,
	nonComponentIcons.length ? `${nonComponentIcons.length}개가 컴포넌트가 아님` : "",
);

// 4. CSS 가 소비자 번들러에 재처리되지 않도록 평문이어야 한다
const moduleCss = files.filter((f) => f.endsWith(".module.css"));
check(
	"산출 CSS 가 평문이다",
	moduleCss.length === 0,
	moduleCss.length ? `${moduleCss.length}개가 .module.css 로 남음` : "",
);

// 5. 폰트가 실제로 동봉되고 CSS 가 그것을 가리켜야 한다 (0.1.15 이전 회귀)
const fonts = files.filter((f) => f.endsWith(".woff2"));
check("폰트가 동봉됐다", fonts.length > 0, `${fonts.length}개`);
const globalCss = "dist/styles/index.css";
if (existsSync(globalCss)) {
	const css = read(globalCss);
	check("전역 CSS 에 @font-face 가 있다", css.includes("@font-face"));
	check("전역 CSS 에 디자인 토큰이 있다", css.includes("--krds-color-primary-50"));
	const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map((m) =>
		m[1].replace(/["']/g, ""),
	);
	const broken = urls.filter((u) => {
		if (u.startsWith("data:") || u.startsWith("http")) return false;
		return !existsSync(join("dist/styles", u));
	});
	check(
		"폰트 경로가 실재한다",
		broken.length === 0,
		broken.length ? broken.join(", ") : "",
	);
}

// 6. 통합 스타일시트가 exports 계약을 지켜야 한다
check("통합 styles.css 가 있다", existsSync("dist/styles.css"));
if (existsSync("dist/styles.css")) {
	const bundled = read("dist/styles.css");
	check("통합 CSS 에 토큰이 있다", bundled.includes("--krds-color-primary-50"));
	check("통합 CSS 에 @font-face 가 있다", bundled.includes("@font-face"));
	const urls = [...bundled.matchAll(/url\(([^)]+)\)/g)].map((m) =>
		m[1].replace(/["']/g, ""),
	);
	const broken = urls.filter(
		(u) =>
			!u.startsWith("data:") && !u.startsWith("http") && !existsSync(join("dist", u)),
	);
	check(
		"통합 CSS 의 폰트 경로가 실재한다",
		broken.length === 0,
		broken.length ? broken.join(", ") : "",
	);
}

// 7. exports 가 가리키는 파일이 실재해야 한다
const exportTargets = [];
const collect = (value) => {
	if (typeof value === "string") exportTargets.push(value);
	else if (value && typeof value === "object")
		Object.values(value).forEach(collect);
};
collect(pkg.exports);
const missingTargets = exportTargets.filter(
	(t) => !existsSync(t.replace(/^\.\//, "")),
);
check(
	"exports 대상이 모두 실재한다",
	missingTargets.length === 0,
	missingTargets.join(", "),
);

// 8. 소스맵을 배포하지 않는다
const maps = files.filter((f) => f.endsWith(".map"));
check("소스맵을 배포하지 않는다", maps.length === 0, `${maps.length}개`);

// 9. 트리셰이킹이 가능한 구조여야 한다
const jsFiles = files.filter((f) => f.endsWith(".mjs"));
check(
	"모듈이 분할돼 있다",
	jsFiles.length > 50,
	`${jsFiles.length}개 — 단일 번들이면 트리셰이킹이 안 된다`,
);

for (const { label, ok, detail } of checks) {
	console.log(`  ${ok ? "✓" : "✗"} ${label}${detail ? ` (${detail})` : ""}`);
}

if (failures.length) {
	console.error(`\n배포 산출물 검증 실패 ${failures.length}건`);
	process.exit(1);
}
console.log(`\n배포 산출물 검증 통과 (${checks.length}건)`);
