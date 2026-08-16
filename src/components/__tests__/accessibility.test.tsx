import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
	CriticalAlerts,
	DatePicker,
	DialogModal,
	Display,
	Footer,
	Header,
	Identifier,
	LargeModal,
	Masthead,
	MediumModal,
	PhoneInput,
	MainMenu,
	MTable,
	SkipLink,
	SmallModal,
	TimeSelector,
	Tooltip,
} from "../index";

const iconOnlyButtonsWithoutName = (container: HTMLElement) =>
	Array.from(container.querySelectorAll("button")).filter(
		(button) =>
			!button.textContent?.trim() && !button.getAttribute("aria-label"),
	);

const inputsWithoutName = (container: HTMLElement) =>
	Array.from(
		container.querySelectorAll<HTMLElement>(
			"input:not([type=hidden]), textarea, select",
		),
	).filter((input) => {
		if (getComputedStyle(input).display === "none") return false;
		const id = input.getAttribute("id");
		return !(
			(id && container.querySelector(`label[for="${id}"]`)) ||
			input.getAttribute("aria-label") ||
			input.getAttribute("aria-labelledby")
		);
	});

describe("Display — 문서 구조를 강제하지 않는다", () => {
	it("기본 태그는 div 다", () => {
		const { container } = render(<Display size="l">큰 문구</Display>);
		expect(container.firstElementChild?.tagName).toBe("DIV");
	});

	it("as 로 태그를 고를 수 있다", () => {
		render(<Display as="h1">페이지 제목</Display>);
		expect(
			screen.getByRole("heading", { level: 1, name: "페이지 제목" }),
		).toBeInTheDocument();
	});

	it("여러 개를 써도 heading 이 생기지 않는다", () => {
		render(
			<>
				<Display size="l">하나</Display>
				<Display size="m">둘</Display>
				<Display size="s">셋</Display>
			</>,
		);
		expect(screen.queryAllByRole("heading")).toHaveLength(0);
	});
});

describe("입력 컴포넌트 — 모든 칸이 접근 이름을 갖는다", () => {
	it("PhoneInput 세 칸 모두 이름이 있다", () => {
		const { container } = render(
			<PhoneInput id="phone" title="휴대전화" value="01012345678" />,
		);
		expect(container.querySelectorAll("input")).toHaveLength(3);
		expect(inputsWithoutName(container)).toHaveLength(0);
	});

	it("DatePicker 범위형은 시작일과 종료일 모두 이름이 있다", () => {
		const { container } = render(
			<DatePicker id="range" type="range" label="조회 기간" onChange={vi.fn()} />,
		);
		expect(inputsWithoutName(container)).toHaveLength(0);
	});

	it("TimeSelector 입력에 이름이 있다", () => {
		const { container } = render(
			<TimeSelector value="09:30" onChange={vi.fn()} />,
		);
		expect(inputsWithoutName(container)).toHaveLength(0);
	});
});

describe("아이콘 전용 버튼 — 접근 이름을 갖는다", () => {
	it("DatePicker 캘린더 열기 버튼에 이름이 있다", () => {
		const { container } = render(
			<DatePicker id="single" type="single" label="접수일" onChange={vi.fn()} />,
		);
		expect(iconOnlyButtonsWithoutName(container)).toHaveLength(0);
	});

	it("캘린더를 열어도 이름 없는 버튼이 없다", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<DatePicker id="single" type="single" label="접수일" onChange={vi.fn()} />,
		);
		await user.click(screen.getByRole("button", { name: "캘린더 열기" }));
		expect(iconOnlyButtonsWithoutName(container)).toHaveLength(0);
		expect(
			screen.getByRole("button", { name: "이전 달" }),
		).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "다음 달" })).toBeInTheDocument();
	});
});

describe("SkipLink — 대상으로 초점을 옮긴다", () => {
	it("클릭하면 대상 요소가 초점을 받는다", async () => {
		const user = userEvent.setup();
		render(
			<>
				<SkipLink items={[{ label: "본문 바로가기", targetId: "main" }]} />
				<main id="main">본문</main>
			</>,
		);

		await user.click(screen.getByRole("link", { name: "본문 바로가기" }));

		const target = document.getElementById("main");
		expect(target).toHaveAttribute("tabindex", "-1");
		expect(target).toHaveFocus();
	});

	it("최대 3개까지만 낸다", () => {
		render(
			<SkipLink
				items={[
					{ label: "1", targetId: "a" },
					{ label: "2", targetId: "b" },
					{ label: "3", targetId: "c" },
					{ label: "4", targetId: "d" },
				]}
			/>,
		);
		expect(screen.getAllByRole("link")).toHaveLength(3);
	});
});

describe("CriticalAlerts — KRDS 규정을 지킨다", () => {
	it("role=banner 로 낸다", () => {
		render(<CriticalAlerts level="high" message="점검 안내" />);
		expect(screen.getByRole("banner")).toBeInTheDocument();
	});

	it("닫기 버튼을 제공하지 않는다", () => {
		render(<CriticalAlerts level="high" message="점검 안내" />);
		expect(screen.queryByRole("button")).not.toBeInTheDocument();
	});

	it("긴급도 3단계를 구분해 낸다", () => {
		const levels = ["high", "medium", "low"] as const;
		for (const level of levels) {
			const { container, unmount } = render(
				<CriticalAlerts level={level} message="안내" />,
			);
			expect(container.querySelector(`[class*="_${level}_"]`)).not.toBeNull();
			unmount();
		}
	});
});

describe("Header / Footer — 랜드마크와 구조", () => {
	it("헤더가 건너뛰기 링크를 먼저 낸다", () => {
		const { container } = render(
			<Header logo={<strong>로고</strong>} masthead={<Masthead />} />,
		);
		const header = container.querySelector("header");
		expect(header?.firstElementChild?.querySelector("a")).toHaveAttribute(
			"href",
			"#main-content",
		);
	});

	it("주메뉴 토글에 aria-expanded 와 실재하는 aria-controls 가 있다", () => {
		render(
			<Header
				logo={<strong>로고</strong>}
				menu={[
					{
						label: "서비스",
						items: [{ label: "예방접종", href: "/vac" }],
					},
				]}
			/>,
		);
		const trigger = screen.getByRole("button", { name: /서비스/ });
		expect(trigger).toHaveAttribute("aria-expanded", "false");
		const controls = trigger.getAttribute("aria-controls");
		expect(controls && document.getElementById(controls)).not.toBeNull();
	});

	it("푸터가 운영기관 식별자를 마지막 구획으로 담는다", () => {
		const { container } = render(
			<Footer
				policyLinks={[{ label: "개인정보처리방침", href: "/privacy" }]}
				copyright="© KDCA"
				identifier={<Identifier organization="질병관리청" />}
			/>,
		);
		const footer = container.querySelector("footer");
		const identifier = footer?.querySelector(
			'section[aria-label="운영기관 정보"]',
		);
		expect(identifier).not.toBeNull();
		expect(footer?.lastElementChild).toBe(identifier);
	});

	it("외부 링크는 rel 과 새 창 안내를 함께 낸다", () => {
		const { container } = render(
			<Footer
				policyLinks={[
					{ label: "관련 사이트", href: "https://x.kr", external: true },
				]}
				copyright="© KDCA"
			/>,
		);
		const link = within(container).getByRole("link", { name: /관련 사이트/ });
		expect(link).toHaveAttribute("target", "_blank");
		expect(link.getAttribute("rel")).toContain("noopener");
		expect(link.textContent).toContain("새 창 열림");
	});
});

describe("Tooltip 키보드 접근", () => {
	it("초점만으로 열리고 초점을 잃으면 닫힌다", async () => {
		const user = userEvent.setup();
		render(
			<Tooltip content="보조 설명입니다">
				<button type="button">도움말</button>
			</Tooltip>,
		);

		expect(screen.queryByRole("tooltip")).toBeNull();

		await user.tab();
		expect(screen.getByRole("button", { name: "도움말" })).toHaveFocus();
		expect(screen.getByRole("tooltip")).toHaveTextContent("보조 설명입니다");

		await user.tab();
		expect(screen.queryByRole("tooltip")).toBeNull();
	});

	it("Esc 로 닫히고 초점은 그대로 남는다", async () => {
		const user = userEvent.setup();
		render(
			<Tooltip content="보조 설명입니다">
				<button type="button">도움말</button>
			</Tooltip>,
		);

		await user.tab();
		expect(screen.getByRole("tooltip")).not.toBeNull();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("tooltip")).toBeNull();
		expect(screen.getByRole("button", { name: "도움말" })).toHaveFocus();
	});

	it("초점을 받는 요소가 없으면 감싸는 쪽이 대신 받는다", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Tooltip content="보조 설명입니다">설명이 필요한 문구</Tooltip>,
		);

		const trigger = container.querySelector("[tabindex='0']");
		expect(trigger).not.toBeNull();

		await user.tab();
		expect(trigger).toHaveFocus();
		expect(screen.getByRole("tooltip")).not.toBeNull();
	});

	it("버튼을 감싸면 탭 정거장을 늘리지 않는다", () => {
		const { container } = render(
			<Tooltip content="보조 설명입니다">
				<button type="button">도움말</button>
			</Tooltip>,
		);
		expect(container.querySelector("[tabindex='0']")).toBeNull();
	});

	it("닫혀 있을 때는 없는 요소를 가리키지 않는다", async () => {
		const user = userEvent.setup();
		const { container } = render(
			<Tooltip content="보조 설명입니다">
				<button type="button">도움말</button>
			</Tooltip>,
		);

		const describedBy = () =>
			container.querySelector("[aria-describedby]")?.getAttribute("aria-describedby");

		expect(describedBy()).toBeUndefined();

		await user.tab();
		const id = describedBy();
		expect(id).toBeTruthy();
		expect(document.getElementById(id as string)).not.toBeNull();
	});
});

describe("MainMenu 열림 상태", () => {
	const items = [
		{
			label: "서비스",
			groups: [
				{
					label: "접종",
					items: [
						{ label: "예방접종", href: "#vaccine" },
						{ label: "이상반응", href: "#adverse" },
					],
				},
			],
		},
	];

	it("하위 항목을 고르면 메뉴가 닫힌다", async () => {
		const user = userEvent.setup();
		render(<MainMenu items={items} />);

		await user.click(screen.getByRole("button", { name: /서비스/ }));
		expect(screen.getByRole("link", { name: "예방접종" })).toBeVisible();

		await user.click(screen.getByRole("link", { name: "예방접종" }));
		expect(screen.queryByRole("link", { name: "예방접종" })).toBeNull();
	});

	it("Esc 로도 닫힌다", async () => {
		const user = userEvent.setup();
		render(<MainMenu items={items} />);

		await user.click(screen.getByRole("button", { name: /서비스/ }));
		expect(screen.getByRole("link", { name: "예방접종" })).toBeVisible();

		await user.keyboard("{Escape}");
		expect(screen.queryByRole("link", { name: "예방접종" })).toBeNull();
	});
});

describe("모달 푸터 버튼", () => {
	const BUTTONS = [
		["SecondaryButton", SmallModal.SecondaryButton],
		["PrimaryButton", SmallModal.PrimaryButton],
		["DangerousButton", SmallModal.DangerousButton],
		["TeriaryButton", SmallModal.TeriaryButton],
		["OutlinedBlueButton", SmallModal.OutlinedBlueButton],
	] as const;

	for (const [name, Component] of BUTTONS) {
		it(`${name} 이 넘긴 onClick 을 그대로 호출한다`, async () => {
			const user = userEvent.setup();
			const onClick = vi.fn();
			render(<Component onClick={onClick}>확인</Component>);

			await user.click(screen.getByRole("button", { name: "확인" }));
			expect(onClick).toHaveBeenCalledTimes(1);
		});
	}
});

describe("MTable 빈 목록", () => {
	const columns = [{ accessorKey: "no", header: "접수번호" }];

	it("데이터가 없으면 기본 문구를 보여준다", () => {
		render(<MTable data={[]} columns={columns} idKey="no" />);
		expect(screen.getByText("조회된 결과가 없습니다.")).toBeVisible();
	});

	it("noData 를 넘기면 그 내용을 보여준다", () => {
		render(
			<MTable
				data={[]}
				columns={columns}
				idKey="no"
				noData="접수 내역이 없습니다."
			/>,
		);
		expect(screen.getByText("접수 내역이 없습니다.")).toBeVisible();
		expect(screen.queryByText("조회된 결과가 없습니다.")).toBeNull();
	});

	it("데이터가 있으면 빈 문구를 보여주지 않는다", () => {
		render(
			<MTable data={[{ no: "2026-001" }]} columns={columns} idKey="no" />,
		);
		expect(screen.queryByText("조회된 결과가 없습니다.")).toBeNull();
	});
});

describe("모달 헤더 · 버튼 이름", () => {
	const MODALS = [
		["SmallModal", SmallModal],
		["MediumModal", MediumModal],
		["LargeModal", LargeModal],
		["DialogModal", DialogModal],
	] as const;

	for (const [name, Modal] of MODALS) {
		it(`${name} 헤더가 title 과 children 을 모두 받는다`, () => {
			const { unmount } = render(<Modal.Header title="제목입니다" />);
			expect(screen.getByText("제목입니다")).toBeVisible();
			unmount();

			render(<Modal.Header>다른 제목</Modal.Header>);
			expect(screen.getByText("다른 제목")).toBeVisible();
		});

		it(`${name} 이 빨간 버튼을 두 이름으로 모두 낸다`, () => {
			expect(Modal.DangerousButton).toBeDefined();
			expect(Modal.DangerButton).toBeDefined();
			expect(Modal.DangerousButton).toBe(Modal.DangerButton);
		});
	}
});
