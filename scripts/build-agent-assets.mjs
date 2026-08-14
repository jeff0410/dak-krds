import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { readFileSync } from "node:fs";

// 에이전트가 라이브러리를 찾고 바로 쓸 수 있게 두 파일을 만든다.
//   public/manifest.json — 컴포넌트 · props · 예제 (기계용)
//   public/llms.txt      — 무엇을 언제 쓰는지 요약 (llms.txt 규약)
// 스토리북이 public/ 을 그대로 배포하므로 Pages 에서도 같은 주소로 열린다.

if (!existsSync("dist/manifest.json")) {
	console.error("dist/manifest.json 이 없습니다. pnpm run build 를 먼저 실행하세요.");
	process.exit(1);
}

const manifest = JSON.parse(readFileSync("dist/manifest.json", "utf-8"));

mkdirSync("public", { recursive: true });
copyFileSync("dist/manifest.json", "public/manifest.json");

const byCategory = new Map();
for (const component of manifest.components) {
	const key = component.category ?? "기타";
	if (!byCategory.has(key)) byCategory.set(key, []);
	byCategory.get(key).push(component.name);
}

const sections = [...byCategory.entries()]
	.sort((a, b) => b[1].length - a[1].length)
	.map(([category, names]) => `### ${category}\n\n${names.sort().join(" · ")}\n`);

const text = `# dak-krds

> ${manifest.description}

KRDS(Korea Design System, 대한민국 정부 디자인시스템)를 따르는 React 컴포넌트
라이브러리입니다. 공공 웹사이트 · 전자정부 서비스에서 KRDS 준수와 WCAG 2.1 AA
웹접근성이 필요할 때 사용합니다.

## 설치와 사용

\`\`\`bash
pnpm add dak-krds   # npm install dak-krds / yarn add dak-krds
\`\`\`

\`\`\`tsx
import { Button, TextInput } from 'dak-krds';
\`\`\`

CSS 는 컴포넌트를 import 하면 함께 들어옵니다. 별도 import 가 필요 없습니다.
전체를 한 번에 넣으려면 \`import 'dak-krds/styles.css';\` 를 씁니다.

요구사항 — React 19 이상 (peerDependency)

## 기계가 읽는 자료

- 컴포넌트 · props · 타입 · 예제: <${manifest.homepage}manifest.json>
  설치 후에는 \`dak-krds/manifest.json\` 으로도 읽을 수 있습니다.
- 스토리 목록: <${manifest.homepage}index.json>
- 컴포넌트 카탈로그: <${manifest.homepage}>

## 컴포넌트 ${manifest.componentCount}개

${sections.join("\n")}
## 알아둘 것

- 입력 계열(TextInput · TextArea · NumberInput · PhoneInput)은 \`onChange\` 가
  아니라 \`value\` + \`setValue\` 를 씁니다.
- 입력 계열의 화면 레이블은 \`label\` 이 아니라 \`title\` 입니다.
  (\`Select\` 와 \`Badge\` 는 \`label\` 을 씁니다.)
- \`TextInput\` \`TextArea\` \`Checkbox\` 는 접근성을 위해 \`id\` 가 필수입니다.

## 문서

- README: <https://github.com/jeff0410/dak-krds#readme>
- KRDS 구현 현황: <https://github.com/jeff0410/dak-krds/blob/main/docs/KRDS_COVERAGE.md>
- KRDS 원본: <https://www.krds.go.kr>
`;

writeFileSync("public/llms.txt", text);
console.log(
	`에이전트용 자료 생성 — manifest.json (컴포넌트 ${manifest.componentCount}개), llms.txt`,
);
