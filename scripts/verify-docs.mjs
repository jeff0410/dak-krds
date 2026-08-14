import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";

const README = "README.md";
const CHECK_FILE = ".docs-check.ts";
const TSCONFIG = "tsconfig.docs.json";

// README 의 tsx 예제에서 <Component prop={...} /> 를 뽑아
// 그 prop 이 실제 타입에 있는지 타입 수준에서 확인한다.
const source = readFileSync(README, "utf-8");
const blocks = [...source.matchAll(/```tsx\n([\s\S]*?)```/g)].map((m) => m[1]);

// 여는 태그의 최상위 속성만 모은다.
// 중괄호 안에 중첩된 JSX(logo={<img src alt />})의 속성은 그 컴포넌트 것이 아니다.
const used = new Map();

const collectFrom = (block) => {
	const openTag = /<([A-Z][A-Za-z0-9]*)/g;
	let match;
	while ((match = openTag.exec(block))) {
		const component = match[1];
		const props = used.get(component) ?? new Set();
		used.set(component, props);

		let depth = 0;
		let quote = null;
		let name = "";
		for (let i = openTag.lastIndex; i < block.length; i++) {
			const ch = block[i];

			if (quote) {
				if (ch === quote) quote = null;
				continue;
			}
			if (ch === '"' || ch === "'") {
				quote = ch;
				continue;
			}
			if (ch === "{") {
				depth++;
				continue;
			}
			if (ch === "}") {
				depth--;
				continue;
			}
			if (depth > 0) continue;
			if (ch === ">") break;

			if (/[A-Za-z0-9_-]/.test(ch)) {
				name += ch;
				continue;
			}
			if (ch === "=" && name) props.add(name);
			name = "";
		}
	}
};

for (const block of blocks) collectFrom(block);

// 제네릭 props 타입은 인자를 채워 준다
const PROPS_TYPE = {
	Carousel: "CarouselProps<unknown>",
	Table: "TableProps<Record<string, unknown>>",
	Link: 'LinkProps<"a">',
	LinkButton: 'LinkButtonProps<"a">',
	Display: 'DisplayProps<"div">',
	Label: 'LabelProps<"label">',
	// 조립형 모달은 컨테이너 타입을 공유한다
	SmallModal: "ModalContainerProps",
	MediumModal: "ModalContainerProps",
	LargeModal: "ModalContainerProps",
	DialogModal: "ModalContainerProps",
};

// KRDS 55개 컴포넌트가 모두 예제를 갖는지 확인한다
const KRDS = [
	"Masthead","Identifier","Header","Footer","Favicon",
	"SkipLink","MainMenu","SideNavigation","InPageNavigation","Breadcrumb","Pagination",
	"StructuredList","CriticalAlerts","Disclosure","Modal","Badge","Accordion","Image",
	"Carousel","Tabs","Table","TextList",
	"Link","Button","FloatingButton",
	"RadioButton","Checkbox","Select","Tag","Switch",
	"StepIndicator","Spinner",
	"HelpPanel","TutorialPanel","ContextualHelp","CoachMark","Tooltip","TextToSpeech",
	"DatePicker","TextArea","TextInput","FileUpload",
	"LanguageSwitcher","Resize",
	"AccessibleMedia","VisuallyHidden",
	"RangeSlider","BackButton","BottomSheet","QuantityToggle","ToastBar","Snackbar",
	"TabBars","SplashScreen",
];
const ALIAS = {
	FileUpload: ["DakFileUpload", "FileButtonUpload"],
	ToastBar: ["ToastBarManager", "toastbarService"],
	Modal: ["modalService", "dialogService"],
	DatePicker: ["CustomDatePicker", "CustomRangeDatePicker"],
};
const mentioned = new Set(used.keys());
for (const block of blocks) {
	for (const m of block.matchAll(/\b([A-Za-z][A-Za-z0-9]*)\b/g)) mentioned.add(m[1]);
}
const undocumented = KRDS.filter(
	(name) =>
		!mentioned.has(name) && !(ALIAS[name] ?? []).some((a) => mentioned.has(a)),
);
if (undocumented.length) {
	console.error(
		`README 에 사용 예제가 없는 컴포넌트 ${undocumented.length}개: ${undocumented.join(", ")}`,
	);
	process.exit(1);
}

const lines = ['import type * as K from "./src";', ""];
const targets = [];

for (const [component, props] of [...used].sort()) {
	if (!props.size) continue;
	const typeName = PROPS_TYPE[component] ?? `${component}Props`;
	const list = [...props].map((p) => JSON.stringify(p)).join(" | ");
	targets.push({ component, typeName, props: [...props] });
	lines.push(
		`type Unknown_${component} = Exclude<${list}, keyof K.${typeName}>;`,
		`const _${component}: Unknown_${component} extends never`,
		`\t? true`,
		`\t: ["README 에만 있는 prop", Unknown_${component}] = true;`,
		`void _${component};`,
		"",
	);
}

writeFileSync(CHECK_FILE, lines.join("\n"));

let failed = false;
try {
	writeFileSync(
		TSCONFIG,
		JSON.stringify(
			{
				extends: "./tsconfig.json",
				include: ["src", CHECK_FILE],
			},
			null,
			2,
		),
	);
	execFileSync("npx", ["tsc", "-p", TSCONFIG], { stdio: "pipe" });
	console.log(
		`README 예제의 prop ${targets.reduce((n, t) => n + t.props.length, 0)}개 — 실제 타입과 일치 (컴포넌트 ${targets.length}개)`,
	);
} catch (error) {
	failed = true;
	const out = `${error.stdout ?? ""}${error.stderr ?? ""}`;
	console.error("README 가 실제 API 와 어긋납니다.\n");
	console.error(out.trim());
	rmSync(CHECK_FILE, { force: true });
} finally {
	rmSync(TSCONFIG, { force: true });
}

process.exit(failed ? 1 : 0);
