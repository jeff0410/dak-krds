import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as dakKrds from "../../index";

const FORWARD_REF = Symbol.for("react.forward_ref");
const MEMO = Symbol.for("react.memo");

const isComponent = (value: unknown) =>
	typeof value === "function" ||
	(typeof value === "object" &&
		value !== null &&
		((value as { $$typeof?: symbol }).$$typeof === FORWARD_REF ||
			(value as { $$typeof?: symbol }).$$typeof === MEMO));

const KRDS_COMPONENTS = [
	"Masthead",
	"Identifier",
	"Header",
	"Footer",
	"Favicon",
	"SkipLink",
	"MainMenu",
	"SideNavigation",
	"InPageNavigation",
	"Breadcrumb",
	"Pagination",
	"StructuredList",
	"CriticalAlerts",
	"Disclosure",
	"Modal",
	"Badge",
	"Accordion",
	"Image",
	"Carousel",
	"Tabs",
	"Table",
	"TextList",
	"Link",
	"Button",
	"FloatingButton",
	"RadioButton",
	"Checkbox",
	"Select",
	"Tag",
	"Switch",
	"StepIndicator",
	"Spinner",
	"HelpPanel",
	"TutorialPanel",
	"ContextualHelp",
	"CoachMark",
	"Tooltip",
	"TextToSpeech",
	"DatePicker",
	"TextArea",
	"TextInput",
	"FileUpload",
	"LanguageSwitcher",
	"Resize",
	"AccessibleMedia",
	"VisuallyHidden",
	"RangeSlider",
	"BackButton",
	"BottomSheet",
	"QuantityToggle",
	"ToastBar",
	"Snackbar",
	"TabBars",
	"SplashScreen",
] as const;

describe("공개 API", () => {
	it("KRDS 55개 컴포넌트를 모두 내보낸다", () => {
		const registry = dakKrds as Record<string, unknown>;
		const missing = KRDS_COMPONENTS.filter((name) => !isComponent(registry[name]));
		expect(missing).toEqual([]);
	});

	it("루트에서 바로 가져올 수 있다", () => {
		expect(Object.keys(dakKrds).length).toBeGreaterThan(150);
	});
});

const noop = () => {};

const SMOKE: Array<[string, () => React.ReactElement]> = [
	["Button", () => <dakKrds.Button onClick={noop}>확인</dakKrds.Button>],
	["Badge", () => <dakKrds.Badge label="신규" />],
	["Tag", () => <dakKrds.Tag label="태그" />],
	["Spinner", () => <dakKrds.Spinner />],
	["VisuallyHidden", () => <dakKrds.VisuallyHidden>숨김</dakKrds.VisuallyHidden>],
	["Disclosure", () => <dakKrds.Disclosure title="더보기">내용</dakKrds.Disclosure>],
	[
		"TextList",
		() => <dakKrds.TextList items={[{ content: "하나" }, { content: "둘" }]} />,
	],
	[
		"StructuredList",
		() => (
			<dakKrds.StructuredList rows={[{ term: "항목", description: "값" }]} />
		),
	],
	["CriticalAlerts", () => <dakKrds.CriticalAlerts message="안내" />],
	["Image", () => <dakKrds.Image src="/a.png" alt="예시" ratio="16:9" />],
	["Masthead", () => <dakKrds.Masthead />],
	["Identifier", () => <dakKrds.Identifier organization="질병관리청" />],
	["SkipLink", () => <dakKrds.SkipLink items={[{ label: "본문", targetId: "m" }]} />],
	[
		"Breadcrumb",
		() => <dakKrds.Breadcrumb items={[{ label: "홈", value: "home" }]} />,
	],
	[
		"Pagination",
		() => (
			<dakKrds.Pagination currentPage={1} totalPage={5} onChangePage={noop} />
		),
	],
	[
		"SideNavigation",
		() => <dakKrds.SideNavigation items={[{ label: "개요", href: "/" }]} />,
	],
	[
		"InPageNavigation",
		() => <dakKrds.InPageNavigation items={[{ label: "1장", targetId: "s1" }]} />,
	],
	[
		"MainMenu",
		() => <dakKrds.MainMenu items={[{ label: "소개", href: "/" }]} />,
	],
	[
		"QuantityToggle",
		() => (
			<dakKrds.QuantityToggle label="수량" value={1} onChange={noop} />
		),
	],
	[
		"RangeSlider",
		() => <dakKrds.RangeSlider label="반경" value={40} onChange={noop} />,
	],
	["BackButton", () => <dakKrds.BackButton title="상세" onBack={noop} />],
	[
		"TabBars",
		() => (
			<dakKrds.TabBars
				items={[{ label: "홈", icon: <span>H</span>, href: "/", current: true }]}
			/>
		),
	],
	[
		"Snackbar",
		() => <dakKrds.Snackbar open title="저장했습니다" onClose={noop} />,
	],
	[
		"SplashScreen",
		() => <dakKrds.SplashScreen logo={<strong>로고</strong>} />,
	],
	[
		"BottomSheet",
		() => (
			<dakKrds.BottomSheet open onClose={noop} title="선택">
				내용
			</dakKrds.BottomSheet>
		),
	],
	[
		"ContextualHelp",
		() => <dakKrds.ContextualHelp title="도움말">설명</dakKrds.ContextualHelp>,
	],
	[
		"HelpPanel",
		() => (
			<dakKrds.HelpPanel open onClose={noop} title="도움말">
				내용
			</dakKrds.HelpPanel>
		),
	],
	[
		"TutorialPanel",
		() => (
			<dakKrds.TutorialPanel
				open
				onClose={noop}
				title="따라하기"
				steps={[{ title: "1단계", content: "설명" }]}
			/>
		),
	],
	[
		"LanguageSwitcher",
		() => (
			<dakKrds.LanguageSwitcher
				current="ko"
				languages={[
					{ code: "ko", nativeName: "한국어" },
					{ code: "en", nativeName: "English" },
					{ code: "zh", nativeName: "中文" },
				]}
			/>
		),
	],
	["Resize", () => <dakKrds.Resize />],
	[
		"AccessibleMedia",
		() => <dakKrds.AccessibleMedia src="/v.mp4" title="영상" />,
	],
	["TextToSpeech", () => <dakKrds.TextToSpeech text="읽을 내용" />],
	[
		"Favicon",
		() => <dakKrds.Favicon svg="/favicon.svg" themeColor="#256ef4" />,
	],
	[
		"FloatingButton",
		() => <dakKrds.FloatingButton icon={<span>+</span>} label="빠른 메뉴" />,
	],
	["Heading", () => <dakKrds.Heading size={2}>제목</dakKrds.Heading>],
	["Display", () => <dakKrds.Display size="l">큰 문구</dakKrds.Display>],
	["Body", () => <dakKrds.Body size={1}>본문</dakKrds.Body>],
	["Title", () => <dakKrds.Title size="l">타이틀</dakKrds.Title>],
	["Detail", () => <dakKrds.Detail size="m">보조</dakKrds.Detail>],
	[
		"TextInput",
		() => <dakKrds.TextInput id="t" title="이름" value="" setValue={noop} />,
	],
	[
		"TextArea",
		() => <dakKrds.TextArea id="ta" title="내용" value="" setValue={noop} />,
	],
	[
		"Switch",
		() => <dakKrds.Switch status={false} onChange={noop} label="알림" />,
	],
	[
		"Checkbox",
		() => (
			<dakKrds.Checkbox id="c" status="off" onChange={noop} label="동의" />
		),
	],
	[
		"RadioButton",
		() => (
			<dakKrds.RadioButton name="r" value="a" onChange={noop} label="선택" />
		),
	],
	[
		"Select",
		() => (
			<dakKrds.Select
				id="s"
				label="언어"
				options={[{ value: "ko", label: "한국어" }]}
				value="ko"
				onChange={noop}
			/>
		),
	],
	[
		"Alert",
		() => <dakKrds.Alert variant="information" title="안내" />,
	],
	[
		"StepIndicator",
		() => (
			<dakKrds.StepIndicator
				steps={[{ description: "1단계" }, { description: "2단계" }]}
				currentStepIndex={0}
			/>
		),
	],
	["ProgressBar", () => <dakKrds.ProgressBar length={3} currentProgress={1} />],
	[
		"Tabs",
		() => (
			<dakKrds.Tabs
				tabs={[{ id: "t1", label: "개요", content: "내용" }]}
			/>
		),
	],
	[
		"Accordion",
		() => (
			<dakKrds.Accordion
				items={[{ id: "a1", title: "질문", children: "답변" }]}
			/>
		),
	],
	[
		"DatePicker",
		() => (
			<dakKrds.DatePicker
				id="d"
				type="single"
				label="접수일"
				onChange={vi.fn()}
			/>
		),
	],
	[
		"TimeSelector",
		() => <dakKrds.TimeSelector value="09:30" onChange={vi.fn()} />,
	],
];

describe("스모크 — 렌더 중 예외가 나지 않는다", () => {
	for (const [name, element] of SMOKE) {
		it(name, () => {
			const errors: unknown[] = [];
			const original = console.error;
			console.error = (...args: unknown[]) => errors.push(args);

			try {
				expect(() => render(element())).not.toThrow();
			} finally {
				console.error = original;
			}

			const reactErrors = errors.filter((e) =>
				String(e).match(/Warning: (Each child|Failed prop|Invalid)/),
			);
			expect(reactErrors).toEqual([]);
		});
	}
});
