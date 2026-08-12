import type { Meta, StoryObj } from "@storybook/react-vite";
import { Favicon, Footer, Header, Identifier, Masthead } from "../components";

const meta = {
	title: "아이덴티티/개요",
	parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 공식배너: Story = {
	render: () => <Masthead />,
};

export const 운영기관식별자: Story = {
	render: () => (
		<div className="stack">
			<Identifier organization="질병관리청" />
			<Identifier organization="질병관리청" variant="dark" />
		</div>
	),
};

export const 헤더: Story = {
	render: () => (
		<Header
			logo={<strong>안심예방접종</strong>}
			logoHref="#"
			masthead={<Masthead />}
			utilityLinks={[
				{ label: "로그인", href: "#" },
				{ label: "KRDS", href: "https://www.krds.go.kr", external: true },
			]}
			menu={[
				{ label: "소개", href: "#", current: true },
				{
					label: "서비스",
					description: "제공 서비스 안내",
					groups: [
						{
							label: "접종",
							items: [
								{ label: "예방접종", href: "#" },
								{ label: "이상반응", href: "#" },
							],
						},
					],
				},
			]}
		/>
	),
};

export const 헤더_스크롤고정: Story = {
	name: "헤더 — 내리면 숨김",
	render: () => (
		<div>
			<Header
				logo={<strong>안심예방접종</strong>}
				sticky="auto-hide"
				masthead={<Masthead />}
				menu={[{ label: "소개", href: "#", current: true }]}
			/>
			<div style={{ height: "200vh", padding: "24px" }}>
				아래로 스크롤하면 헤더가 사라지고, 위로 조금만 올리면 다시 나타납니다.
			</div>
		</div>
	),
};

export const 푸터: Story = {
	render: () => (
		<Footer
			logo={<strong>안심예방접종</strong>}
			contacts={[
				{ label: "주소", value: "서울특별시 중구 세종대로 110" },
				{ label: "대표전화", value: "02-1234-5678", href: "tel:0212345678" },
			]}
			utilityLinks={[
				{ label: "질병관리청", href: "https://www.kdca.go.kr", external: true },
			]}
			policyLinks={[
				{ label: "개인정보처리방침", href: "#", emphasis: true },
				{ label: "웹 접근성 정책", href: "#" },
			]}
			copyright="© Korea Disease Control and Prevention Agency."
			identifier={<Identifier organization="질병관리청" variant="dark" />}
		/>
	),
};

export const 파비콘: Story = {
	name: "파비콘 — head 주입",
	render: () => (
		<div style={{ padding: 24 }}>
			<Favicon svg="/favicon.svg" themeColor="#256ef4" />
			<p>
				화면에 그리지 않고 <code>&lt;head&gt;</code> 에 link · meta 를 넣습니다.
				개발자 도구의 head 를 확인하세요.
			</p>
		</div>
	),
};
