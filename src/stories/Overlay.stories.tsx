import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import {
	Button,
	DialogModal,
	ErrorPage,
	LoadingPage,
	MTable,
	ModalManager,
	NotFountPage,
	ToastBar,
	ToastBarManager,
	modalService,
	toastbarService,
} from "../components";

const meta = {
	title: "모달 · 알림 · 페이지/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 모달: Story = {
	name: "Modal — 열린 상태",
	parameters: { layout: "fullscreen" },
	render: function ModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<div style={{ padding: 24, background: "#fff", borderRadius: 8 }}>
					<h2>정말 삭제하시겠습니까?</h2>
					<p>삭제한 내용은 되돌릴 수 없습니다.</p>
					<Button width="auto" onClick={() => modalService.pop()}>
						닫기
					</Button>
				</div>,
			);
			return () => modalService.popAll();
		}, []);

		return (
			<ModalManager>
				<div style={{ height: 420, padding: 24 }}>
					<Button width="auto">뒤에 있는 버튼</Button>
				</div>
			</ModalManager>
		);
	},
};

export const 대화상자: Story = {
	name: "DialogModal — 조립형",
	parameters: { layout: "fullscreen" },
	render: () => (
		<div style={{ height: 460 }}>
			<DialogModal onClose={() => {}}>
				<DialogModal.Header>접종 예약 취소</DialogModal.Header>
				<DialogModal.Content>
					예약을 취소하면 같은 날짜로 다시 예약할 수 없습니다.
				</DialogModal.Content>
				<DialogModal.Footer>
					<DialogModal.SecondaryButton onClick={() => {}}>
						돌아가기
					</DialogModal.SecondaryButton>
					<DialogModal.DangerButton onClick={() => {}}>
						예약 취소
					</DialogModal.DangerButton>
				</DialogModal.Footer>
			</DialogModal>
		</div>
	),
};

const TOAST_TYPES = ["succeed", "danger", "warning", "info"] as const;

export const 토스트: Story = {
	name: "ToastBar — 종류 4가지",
	parameters: { layout: "fullscreen" },
	render: () => (
		<div className="stack" style={{ padding: 24 }}>
			{TOAST_TYPES.map((type) => (
				<ToastBar
					key={type}
					id={`toast-${type}`}
					type={type}
					title={type}
					text={`${type} 메시지입니다.`}
				/>
			))}
		</div>
	),
};

export const 토스트_서비스: Story = {
	name: "ToastBar — 서비스로 띄우기",
	parameters: { layout: "fullscreen" },
	render: function ToastServiceStory() {
		useEffect(() => {
			toastbarService.succeedMsg("저장되었습니다");
			toastbarService.dangerMsg("삭제에 실패했습니다", "오류");
		}, []);

		return (
			<div style={{ height: 320, padding: 24 }}>
				<ToastBarManager />
				<Button width="auto" onClick={() => toastbarService.infoMsg("업데이트가 있습니다")}>
					안내 토스트 띄우기
				</Button>
			</div>
		);
	},
};

type Row = { no: string; name: string; status: string };

export const 모바일표: Story = {
	name: "MTable — 모바일 표",
	render: () => (
		<div className="wide">
			<MTable<Row>
				idKey="no"
				columns={[
					{ accessorKey: "no", header: "접수번호" },
					{ accessorKey: "name", header: "성명" },
					{ accessorKey: "status", header: "상태" },
				]}
				data={[
					{ no: "2026-001", name: "홍길동", status: "처리중" },
					{ no: "2026-002", name: "김철수", status: "완료" },
				]}
			/>
		</div>
	),
};

export const 모바일표_빈목록: Story = {
	name: "MTable — 데이터 없음",
	render: () => (
		<div className="wide">
			<MTable<Row>
				idKey="no"
				columns={[{ accessorKey: "no", header: "접수번호" }]}
				data={[]}
				noData="조회된 내역이 없습니다."
			/>
		</div>
	),
};

export const 상태페이지: Story = {
	name: "ErrorPage · NotFountPage · LoadingPage",
	parameters: { layout: "fullscreen" },
	render: () => (
		<div className="stack">
			<div style={{ height: 320, position: "relative" }}>
				<ErrorPage onClick={() => {}} />
			</div>
			<div style={{ height: 320, position: "relative" }}>
				<NotFountPage onClick={() => {}} />
			</div>
			<div style={{ height: 240, position: "relative" }}>
				<LoadingPage />
			</div>
		</div>
	),
};
