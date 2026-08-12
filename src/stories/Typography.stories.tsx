import type { Meta, StoryObj } from "@storybook/react-vite";
import { Body, Detail, Display, Heading, Label, Title } from "../components";

const meta = {
	title: "타이포그래피/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 전체: Story = {
	render: () => (
		<div className="stack">
			<Display size="l">Display L</Display>
			<Display size="m">Display M</Display>
			<Display size="s">Display S</Display>
			<Heading size={1}>Heading 1</Heading>
			<Heading size={2}>Heading 2</Heading>
			<Heading size={3}>Heading 3</Heading>
			<Title size="xxl">Title XXL</Title>
			<Title size="l">Title L</Title>
			<Title size="m" weight="medium">
				Title M (medium)
			</Title>
			<Body size={1}>Body 1 — 국민 누구나 디지털 정부서비스를 쉽게.</Body>
			<Body size={2} weight="bold">
				Body 2 bold — 일관성 있고 접근성 높은 인터페이스.
			</Body>
			<Detail size="l">Detail L — 보조 설명 문구</Detail>
			<Detail size="s">Detail S — 보조 설명 문구</Detail>
			<Label id="sample" required>
				필수 레이블
			</Label>
		</div>
	),
};

export const Display태그: Story = {
	name: "Display — 기본은 div, as 로 지정",
	render: () => (
		<div className="stack">
			<Display size="m">기본 — div 로 그려집니다</Display>
			<Display as="h1" size="m">
				as=&quot;h1&quot; — 제목이 필요할 때만
			</Display>
		</div>
	),
};
