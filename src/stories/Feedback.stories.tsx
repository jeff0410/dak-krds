import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
	AccessibleMedia,
	Alert,
	BackButton,
	BottomSheet,
	Button,
	CoachMark,
	ContextualHelp,
	HelpPanel,
	Icon,
	LanguageSwitcher,
	ProgressBar,
	Resize,
	Snackbar,
	Spinner,
	SplashScreen,
	StepIndicator,
	TabBars,
	TextToSpeech,
	Tooltip,
	TutorialPanel,
	VisuallyHidden,
} from "../components";
import { SAMPLE_POSTER, SAMPLE_VIDEO } from "./assets";

const meta = {
	title: "피드백 · 도움 · 모바일/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 알림: Story = {
	render: () => (
		<div className="stack">
			<Alert variant="information" title="안내" description="정보 메시지입니다." />
			<Alert variant="success" title="완료" description="정상 처리됐습니다." />
			<Alert variant="warning" title="주의" description="확인이 필요합니다." />
			<Alert variant="danger" title="오류" description="처리에 실패했습니다." />
		</div>
	),
};

export const 진행표시: Story = {
	render: function ProgressStory() {
		const [step, setStep] = useState(1);
		return (
			<div className="stack">
				<StepIndicator
					steps={[
						{ description: "약관 동의" },
						{ description: "정보 입력" },
						{ description: "확인" },
						{ description: "완료" },
					]}
					currentStepIndex={step}
					onClickStep={setStep}
					focusable
				/>
				<div className="wide">
					<ProgressBar length={4} currentProgress={step + 1} />
				</div>
				<div className="row">
					<Spinner size="s" />
					<Spinner size="m" />
					<Spinner size="l" />
				</div>
			</div>
		);
	},
};

export const 스낵바: Story = {
	render: function SnackbarStory() {
		const [open, setOpen] = useState(true);
		return (
			<div style={{ height: 160 }}>
				<Button width="auto" onClick={() => setOpen(true)}>
					스낵바 띄우기
				</Button>
				<Snackbar
					open={open}
					title="저장했습니다"
					description="변경 내용이 반영됐습니다."
					actionLabel="되돌리기"
					onAction={() => setOpen(false)}
					onClose={() => setOpen(false)}
				/>
			</div>
		);
	},
};

export const 맥락적도움말: Story = {
	render: () => (
		<div className="stack">
			<p style={{ display: "flex", alignItems: "center" }}>
				본인인증 방식
				<ContextualHelp variant="info" title="본인인증이란?">
					휴대전화 또는 공동인증서로 본인을 확인하는 절차입니다.
				</ContextualHelp>
			</p>
			<p style={{ display: "flex", alignItems: "center" }}>
				접종 이상반응
				<ContextualHelp variant="help" title="이상반응 안내" placement="bottom-end">
					접종 후 발열, 통증 등이 나타날 수 있습니다.
				</ContextualHelp>
			</p>
			<Tooltip content="툴팁으로 보조 설명을 제공합니다." placement="top-center">
				<Button width="auto" variant="outline">
					툴팁 보기
				</Button>
			</Tooltip>
		</div>
	),
};

export const 도움패널: Story = {
	parameters: { layout: "fullscreen" },
	render: function HelpPanelStory() {
		const [open, setOpen] = useState(true);
		return (
			<div style={{ height: 400, padding: 24 }}>
				<Button width="auto" onClick={() => setOpen(true)}>
					도움 패널 열기
				</Button>
				<HelpPanel
					open={open}
					onClose={() => setOpen(false)}
					title="도움말"
					links={[{ label: "자주 묻는 질문", href: "#" }]}
				>
					화면 우측에 붙는 보조 패널입니다.
				</HelpPanel>
			</div>
		);
	},
};

export const 따라하기패널: Story = {
	parameters: { layout: "fullscreen" },
	render: function TutorialPanelStory() {
		const [open, setOpen] = useState(true);
		return (
			<div style={{ height: 480, padding: 24 }}>
				<Button width="auto" onClick={() => setOpen(true)}>
					따라하기 열기
				</Button>
				<TutorialPanel
					open={open}
					onClose={() => setOpen(false)}
					title="신청 따라하기"
					steps={[
						{ title: "1. 약관 동의", content: "필수 약관에 동의합니다." },
						{ title: "2. 정보 입력", content: "본인 정보를 입력합니다." },
						{ title: "3. 제출", content: "내용을 확인하고 제출합니다." },
					]}
				/>
			</div>
		);
	},
};

export const 코치마크: Story = {
	parameters: { layout: "fullscreen" },
	render: function CoachMarkStory() {
		const [open, setOpen] = useState(false);
		return (
			<div style={{ height: 360, padding: 24 }}>
				<Button id="coach-target" width="auto" onClick={() => setOpen(true)}>
					코치마크 시작
				</Button>
				<CoachMark
					open={open}
					onClose={() => setOpen(false)}
					steps={[
						{
							targetId: "coach-target",
							title: "1. 시작 버튼",
							instruction: "이 버튼을 눌러 안내를 시작합니다.",
						},
						{
							targetId: "coach-target",
							title: "2. 마무리",
							instruction: "마치기를 누르면 안내가 끝납니다.",
						},
					]}
				/>
			</div>
		);
	},
};

export const 음성지원과숨긴콘텐츠: Story = {
	name: "음성지원 · 숨긴 콘텐츠",
	render: () => (
		<div className="stack">
			<TextToSpeech text="이 문서는 KRDS 컴포넌트 쇼케이스입니다." />
			<p>
				다음 문구는 화면에 보이지 않지만 스크린 리더가 읽습니다.
				<VisuallyHidden>스크린 리더 전용 안내 문구입니다.</VisuallyHidden>
			</p>
		</div>
	),
};

export const 접근가능한미디어: Story = {
	render: () => (
		<div className="wide">
			<AccessibleMedia
				src={SAMPLE_VIDEO}
				poster={SAMPLE_POSTER}
				title="안내 영상"
				description="자막과 대본을 함께 제공하는 미디어 예시입니다."
				transcript="영상에는 꽃이 피는 장면이 담겨 있습니다."
			/>
		</div>
	),
};

export const 설정: Story = {
	render: function SettingsStory() {
		const [lang, setLang] = useState("ko");
		const [scale, setScale] = useState(100);
		return (
			<div className="row">
				<LanguageSwitcher
					current={lang}
					onSelect={setLang}
					languages={[
						{ code: "ko", nativeName: "한국어" },
						{ code: "en", nativeName: "English", localName: "영어" },
						{ code: "zh", nativeName: "中文", localName: "중국어" },
					]}
				/>
				<Resize value={scale} onChange={setScale} />
			</div>
		);
	},
};

export const 모바일: Story = {
	parameters: { layout: "fullscreen" },
	render: function MobileStory() {
		const [sheet, setSheet] = useState(false);
		const [splash, setSplash] = useState(false);
		return (
			<div style={{ height: 420 }}>
				<BackButton title="예방접종 상세" onBack={() => {}} />
				<div className="row" style={{ padding: 24 }}>
					<Button width="auto" onClick={() => setSheet(true)}>
						바텀시트 열기
					</Button>
					<Button
						width="auto"
						variant="secondary"
						onClick={() => {
							setSplash(true);
							window.setTimeout(() => setSplash(false), 1200);
						}}
					>
						스플래시 보기
					</Button>
				</div>
				<BottomSheet
					open={sheet}
					onClose={() => setSheet(false)}
					title="접종 기관 선택"
					description="가까운 기관을 선택하세요."
				>
					<p>목록</p>
				</BottomSheet>
				{splash && (
					<SplashScreen
						logo={<strong>안심예방접종</strong>}
						message="불러오는 중입니다"
					/>
				)}
				<TabBars
					items={[
						{ label: "홈", icon: <Icon icon="Home" size={22} />, href: "#", current: true },
						{ label: "접종", icon: <Icon icon="Check" size={22} />, href: "#", badge: 3 },
						{ label: "전체", icon: <Icon icon="ChevronRight" size={22} />, href: "#" },
					]}
				/>
			</div>
		);
	},
};
