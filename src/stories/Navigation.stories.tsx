import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
	Breadcrumb,
	InPageNavigation,
	MainMenu,
	Pagination,
	SideNavigation,
	SkipLink,
} from "../components";

const meta = {
	title: "탐색/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 건너뛰기링크: Story = {
	render: () => (
		<div>
			<SkipLink
				items={[
					{ label: "본문 바로가기", targetId: "story-main" },
					{ label: "목차 바로가기", targetId: "story-toc" },
				]}
			/>
			<p>Tab 키를 누르면 화면 위쪽에 링크가 나타납니다.</p>
			<main id="story-main">본문</main>
			<nav id="story-toc">목차</nav>
		</div>
	),
};

export const 건너뛰기링크_항상표시: Story = {
	name: "건너뛰기 링크 — 항상 표시",
	render: () => (
		<SkipLink
			variant="visible"
			items={[{ label: "본문 바로가기", targetId: "story-main" }]}
		/>
	),
};

export const 메인메뉴: Story = {
	render: () => (
		<MainMenu
			items={[
				{ label: "소개", href: "#", current: true },
				{
					label: "서비스",
					description: "제공 서비스 안내",
					groups: [
						{
							label: "접종",
							items: [
								{ label: "예방접종", href: "#", current: true },
								{ label: "이상반응", href: "#" },
							],
						},
						{
							label: "자료",
							items: [
								{ label: "KRDS", href: "https://www.krds.go.kr", external: true },
							],
						},
					],
				},
				{ label: "문의", href: "#" },
			]}
		/>
	),
};

export const 사이드메뉴: Story = {
	render: () => (
		<SideNavigation
			title="서비스 안내"
			titleHref="#"
			items={[
				{ label: "개요", href: "#" },
				{
					label: "접종 정보",
					items: [
						{ label: "대상자", href: "#", current: true },
						{ label: "일정", href: "#" },
					],
				},
				{ label: "문의", href: "#", dividerAfter: true },
				{ label: "관련 사이트", href: "#" },
			]}
		/>
	),
};

export const 콘텐츠내탐색: Story = {
	render: () => (
		<div className="row">
			<InPageNavigation
				sticky={false}
				items={[
					{ label: "신청 자격", targetId: "s1" },
					{ label: "제출 서류", targetId: "s2", level: 2 },
					{ label: "신분증 사본", targetId: "s3", level: 3 },
					{ label: "처리 절차", targetId: "s4" },
				]}
			/>
			<div>
				<section id="s1">
					<h2>신청 자격</h2>
				</section>
				<section id="s2">
					<h2>제출 서류</h2>
				</section>
				<section id="s3">
					<h2>처리 절차</h2>
				</section>
			</div>
		</div>
	),
};

export const 브레드크럼: Story = {
	render: () => (
		<Breadcrumb
			items={[
				{ label: "홈", value: "home" },
				{ label: "서비스", value: "service" },
				{ label: "예방접종", value: "vaccination" },
			]}
		/>
	),
};

export const 페이지네이션: Story = {
	render: function PaginationStory() {
		const [page, setPage] = useState(3);
		return (
			<Pagination currentPage={page} totalPage={10} onChangePage={setPage} />
		);
	},
};
