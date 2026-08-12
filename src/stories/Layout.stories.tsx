import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
	Accordion,
	Badge,
	Carousel,
	CriticalAlerts,
	Disclosure,
	Image,
	StructuredList,
	Table,
	Tabs,
	TextList,
} from "../components";
import { SAMPLE_IMAGE } from "./assets";

const meta = {
	title: "레이아웃 및 표현/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 긴급공지: Story = {
	parameters: { layout: "fullscreen" },
	render: () => (
		<div className="stack">
			<CriticalAlerts
				level="high"
				message="재난 상황 발생. 즉시 확인하세요."
				linkLabel="상세 보기"
				linkHref="#"
			/>
			<CriticalAlerts
				level="medium"
				message="8월 15일 02:00~04:00 서비스 점검 예정입니다."
			/>
			<CriticalAlerts level="low" message="개인정보처리방침이 개정되었습니다." />
		</div>
	),
};

export const 구조화목록: Story = {
	render: () => (
		<div className="panel">
			<StructuredList
				title="접수 정보"
				rows={[
					{ term: "접수번호", description: "2026-08-0001" },
					{ term: "접수일", description: "2026년 8월 12일" },
					{ term: "처리상태", description: "검토 중" },
				]}
			/>
		</div>
	),
};

export const 텍스트목록: Story = {
	render: () => (
		<div className="row">
			<div className="panel">
				<TextList
					variant="bullet"
					items={[{ content: "불릿 하나" }, { content: "불릿 둘" }]}
				/>
			</div>
			<div className="panel">
				<TextList
					variant="ordered"
					items={[
						{ content: "신청서를 작성합니다." },
						{
							content: "서류를 첨부합니다.",
							items: [{ content: "신분증 사본" }],
						},
					]}
				/>
			</div>
		</div>
	),
};

export const 디스클로저: Story = {
	render: () => (
		<div className="wide">
			<Disclosure title="추가 안내 사항">
				아코디언보다 가볍게, 부가 정보를 접어 두는 용도입니다.
			</Disclosure>
		</div>
	),
};

export const 아코디언: Story = {
	render: () => (
		<div className="wide">
			<Accordion
				variant="line"
				items={[
					{
						id: "q1",
						title: "접종 대상자는 누구인가요?",
						children: "만 65세 이상 어르신과 기저질환자입니다.",
					},
					{ id: "q2", title: "비용이 있나요?", children: "무료입니다." },
				]}
			/>
		</div>
	),
};

export const 탭: Story = {
	render: () => (
		<div className="wide">
			<Tabs
				variant="underline"
				tabs={[
					{ id: "overview", label: "개요", content: "서비스 개요입니다." },
					{ id: "howto", label: "이용방법", content: "이용 방법입니다." },
					{ id: "qna", label: "문의", content: "문의 내용입니다." },
				]}
			/>
		</div>
	),
};

export const 표: Story = {
	render: () => (
		<div className="wide">
			<Table
				data={[
					{ no: "2026-001", name: "홍길동", status: "처리중" },
					{ no: "2026-002", name: "김철수", status: "완료" },
				]}
				columns={[
					{ accessorKey: "no", header: "접수번호" },
					{ accessorKey: "name", header: "성명" },
					{ accessorKey: "status", header: "상태" },
				]}
			/>
		</div>
	),
};

export const 이미지: Story = {
	render: () => (
		<div className="panel">
			<Image
				src={SAMPLE_IMAGE}
				alt="예시 이미지"
				ratio="16:9"
				rounded
				caption="이미지 설명 문구"
				longDescription="파란 배경에 KRDS 글자가 적힌 예시 이미지입니다."
			/>
		</div>
	),
};

export const 캐러셀: Story = {
	render: function CarouselStory() {
		const [index, setIndex] = useState(0);
		return (
			<div className="wide">
				<Carousel
					initialIndex={index}
					onChange={setIndex}
					dataList={["첫 번째 배너", "두 번째 배너", "세 번째 배너"].map(
						(text) => (
							<div
								key={text}
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									height: 128,
									borderRadius: 8,
									backgroundColor: "var(--krds-color-secondary-5)",
									fontWeight: 700,
								}}
							>
								{text}
							</div>
						),
					)}
				/>
			</div>
		);
	},
};

const BADGE_VARIANTS = [
	"default",
	"primary",
	"secondary",
	"information",
	"success",
	"warning",
	"point",
	"danger",
	"error",
] as const;

const BADGE_APPEARANCES = ["stroke", "fill-strong", "fill-soft"] as const;

export const 배지: Story = {
	render: () => (
		<div className="stack">
			{BADGE_APPEARANCES.map((appearance) => (
				<div key={appearance} className="row">
					{BADGE_VARIANTS.map((variant) => (
						<Badge
							key={variant}
							label={variant}
							variant={variant}
							appearance={appearance}
						/>
					))}
				</div>
			))}
			<div className="row">
				<Badge label="작게" size="s" />
				<Badge label="크게" size="m" />
			</div>
		</div>
	),
};
