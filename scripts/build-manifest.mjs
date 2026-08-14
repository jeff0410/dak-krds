import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// 에이전트가 컴포넌트를 찾고 바로 쓸 수 있게, 이름 · props · 예제를 한 파일로 모은다.
// README 를 파싱해 예제를 얻는다. verify-docs 가 README 예제와 실제 타입이
// 일치하는지 이미 검사하므로, 여기서 나오는 예제는 실제와 어긋나지 않는다.

const pkg = JSON.parse(readFileSync("package.json", "utf-8"));
const readme = readFileSync("README.md", "utf-8");
const coverage = readFileSync("docs/KRDS_COVERAGE.md", "utf-8");

const typeFiles = [];
const walk = (dir) => {
	for (const entry of readdirSync(dir)) {
		const path = join(dir, entry);
		if (statSync(path).isDirectory()) walk(path);
		else if (entry.endsWith(".type.ts")) typeFiles.push(path);
	}
};
walk("src/components");

// README 의 "### 컴포넌트명" 아래 첫 코드블록을 예제로 삼는다.
const examples = new Map();
for (const match of readme.matchAll(/^### (\w[\w\s·]*)\n([\s\S]*?)(?=^### |\n---)/gm)) {
	const name = match[1].trim();
	const code = match[2].match(/```tsx\n([\s\S]*?)```/);
	if (code) examples.set(name, code[1].trim());
}

// 타입 파일에서 prop 이름과 유니온 값을 뽑는다.
// variant?: ButtonColor 처럼 별칭을 쓰면 값이 다른 곳에 있다. 같은 파일 안의
// 문자열 유니온 별칭을 미리 모아 둔다.
const aliasesOf = (source) => {
	const map = new Map();
	for (const found of source.matchAll(
		/type\s+(\w+)\s*=\s*((?:\s*\|?\s*"[^"]+")+)\s*;/g,
	)) {
		map.set(found[1], [...found[2].matchAll(/"([^"]+)"/g)].map((one) => one[1]));
	}
	return map;
};

const propsOf = (source, typeName, aliases = new Map()) => {
	const block = source.match(
		new RegExp(`(?:type|interface)\\s+${typeName}[^{]*\\{([\\s\\S]*?)\\n\\}`),
	);
	if (!block) return null;

	const props = [];
	let depth = 0;
	let buffer = "";
	for (const char of block[1]) {
		// 꺾쇠는 세지 않는다. 화살표 함수의 => 가 닫는 괄호로 잡혀 깊이가
		// 음수가 되면 그 뒤 prop 이 전부 사라진다. 실제로 Button 이 3개만 나왔다.
		if (char === "{" || char === "(" || char === "[") depth += 1;
		if (char === "}" || char === ")" || char === "]") depth -= 1;
		if (char === ";" && depth === 0) {
			const line = buffer.trim();
			buffer = "";
			const named = line.match(/^(\w+)(\?)?:\s*([\s\S]+)$/);
			if (!named) continue;
			let values = [...named[3].matchAll(/"([^"]+)"/g)].map((one) => one[1]);
			if (!values.length) {
				for (const [alias, aliasValues] of aliases) {
					if (new RegExp(`\\b${alias}\\b`).test(named[3])) {
						values = aliasValues;
						break;
					}
				}
			}
			props.push({
				name: named[1],
				required: named[2] !== "?",
				type: named[3].replace(/\s+/g, " ").slice(0, 120),
				...(values.length > 1 ? { values } : {}),
			});
			continue;
		}
		buffer += char;
	}
	return props.length ? props : null;
};

// KRDS_COVERAGE.md 는 "## 카테고리" 아래에 표로 컴포넌트를 적는다.
// 표의 열 위치는 절마다 다를 수 있으므로, 현재 절 제목을 카테고리로 쓴다.
const categories = new Map();
{
	let current = null;
	for (const line of coverage.split("\n")) {
		const heading = line.match(/^## (.+)$/);
		if (heading) {
			current = heading[1].trim();
			continue;
		}
		if (!current || !line.startsWith("|")) continue;
		for (const found of line.matchAll(/`(\w+)`/g)) {
			if (!categories.has(found[1])) categories.set(found[1], current);
		}
	}
}

const categoryOf = (name) => categories.get(name) ?? null;

const components = [];
for (const file of typeFiles.sort()) {
	const source = readFileSync(file, "utf-8");
	const name = file.split("/").pop().replace(".type.ts", "");
	const aliases = aliasesOf(source);

	// props 타입 이름이 컴포넌트마다 다르다. Select 는 CommonSelectProps 에,
	// DatePicker 는 BaseDatePickerProps 에 대부분을 담고 있다. 모두 모아 합친다.
	const merged = new Map();
	for (const candidate of [
		`Base${name}Props`,
		`Common${name}Props`,
		`${name}ComponentProps`,
		`${name}Props`,
	]) {
		for (const prop of propsOf(source, candidate, aliases) ?? []) {
			merged.set(prop.name, prop);
		}
	}
	const props = [...merged.values()];
	if (!props.length) continue;

	components.push({
		name,
		category: categoryOf(name),
		import: `import { ${name} } from 'dak-krds';`,
		props,
		...(examples.has(name) ? { example: examples.get(name) } : {}),
	});
}

const manifest = {
	$schema: "https://jeff0410.github.io/dak-krds/manifest.schema.json",
	name: pkg.name,
	version: pkg.version,
	description: pkg.description,
	homepage: pkg.homepage,
	standard: {
		name: "KRDS (Korea Design System, 대한민국 정부 디자인시스템)",
		url: "https://www.krds.go.kr",
		accessibility: "WCAG 2.1 AA",
	},
	usage: {
		install: "pnpm add dak-krds",
		import: "import { Button, TextInput } from 'dak-krds';",
		styles:
			"컴포넌트를 import 하면 CSS 가 함께 들어옵니다. 전체를 한 번에 넣으려면 import 'dak-krds/styles.css';",
		peerDependencies: pkg.peerDependencies,
	},
	componentCount: components.length,
	components,
};

writeFileSync("dist/manifest.json", `${JSON.stringify(manifest, null, "\t")}\n`);
console.log(
	`매니페스트 생성 — 컴포넌트 ${components.length}개, 예제 ${components.filter((one) => one.example).length}개`,
);
