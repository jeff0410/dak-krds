import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";
import {
	Button,
	DialogModal,
	LargeModal,
	MediumModal,
	ModalManager,
	SmallModal,
	TextInput,
	modalService,
} from "../components";

const meta = {
	title: "모달/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Behind = () => (
	<div style={{ height: 520, padding: 24 }}>
		<Button width="auto" id="behind-button">
			뒤에 있는 버튼
		</Button>
		<a href="#none" style={{ marginLeft: 12 }}>
			뒤에 있는 링크
		</a>
	</div>
);

export const 작은모달: Story = {
	name: "SmallModal",
	parameters: { layout: "fullscreen" },
	render: function SmallModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<SmallModal>
					<SmallModal.Header title="정말 삭제하시겠습니까?" />
					<SmallModal.Content>삭제한 내용은 되돌릴 수 없습니다.</SmallModal.Content>
					<SmallModal.Footer>
						<SmallModal.SecondaryButton onClick={() => modalService.pop()}>
							취소
						</SmallModal.SecondaryButton>
						<SmallModal.DangerousButton onClick={() => modalService.pop()}>
							삭제
						</SmallModal.DangerousButton>
					</SmallModal.Footer>
				</SmallModal>,
			);
			return () => modalService.popAll();
		}, []);
		return (
			<ModalManager>
				<Behind />
			</ModalManager>
		);
	},
};

export const 중간모달: Story = {
	name: "MediumModal",
	parameters: { layout: "fullscreen" },
	render: function MediumModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<MediumModal>
					<MediumModal.Header title="접종 정보 입력" />
					<MediumModal.Content>
						<p>초점이 모달 안에서만 돌아야 합니다.</p>
						<TextInput id="modal-name" title="이름" value="" setValue={() => {}} />
					</MediumModal.Content>
					<MediumModal.Footer>
						<MediumModal.SecondaryButton onClick={() => modalService.pop()}>
							취소
						</MediumModal.SecondaryButton>
						<MediumModal.PrimaryButton onClick={() => modalService.pop()}>
							저장
						</MediumModal.PrimaryButton>
					</MediumModal.Footer>
				</MediumModal>,
			);
			return () => modalService.popAll();
		}, []);
		return (
			<ModalManager>
				<Behind />
			</ModalManager>
		);
	},
};

export const 큰모달: Story = {
	name: "LargeModal",
	parameters: { layout: "fullscreen" },
	render: function LargeModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<LargeModal>
					<LargeModal.Header title="이용 약관" subTitle="2026년 8월 개정" />
					<LargeModal.Content>
						<p>긴 내용이 들어갑니다.</p>
					</LargeModal.Content>
					<LargeModal.Footer>
						<LargeModal.PrimaryButton onClick={() => modalService.pop()}>
							동의
						</LargeModal.PrimaryButton>
					</LargeModal.Footer>
				</LargeModal>,
			);
			return () => modalService.popAll();
		}, []);
		return (
			<ModalManager>
				<Behind />
			</ModalManager>
		);
	},
};

export const 대화상자: Story = {
	name: "DialogModal",
	parameters: { layout: "fullscreen" },
	render: function DialogModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<DialogModal>
					<DialogModal.Header>접종 예약 취소</DialogModal.Header>
					<DialogModal.Content>
						예약을 취소하면 같은 날짜로 다시 예약할 수 없습니다.
					</DialogModal.Content>
					<DialogModal.Footer>
						<DialogModal.SecondaryButton onClick={() => modalService.pop()}>
							돌아가기
						</DialogModal.SecondaryButton>
						<DialogModal.DangerButton onClick={() => modalService.pop()}>
							예약 취소
						</DialogModal.DangerButton>
					</DialogModal.Footer>
				</DialogModal>,
			);
			return () => modalService.popAll();
		}, []);
		return (
			<ModalManager>
				<Behind />
			</ModalManager>
		);
	},
};

export const 겹쳐열기: Story = {
	name: "두 개 겹쳐 열기",
	parameters: { layout: "fullscreen" },
	render: function StackedModalStory() {
		useEffect(() => {
			modalService.popAll();
			modalService.push(
				<SmallModal>
					<SmallModal.Header title="첫 번째" />
					<SmallModal.Content>아래에 깔린 모달입니다.</SmallModal.Content>
				</SmallModal>,
			);
			modalService.push(
				<SmallModal>
					<SmallModal.Header title="두 번째" />
					<SmallModal.Content>위에 쌓인 모달입니다.</SmallModal.Content>
				</SmallModal>,
			);
			return () => modalService.popAll();
		}, []);
		return (
			<ModalManager>
				<Behind />
			</ModalManager>
		);
	},
};
