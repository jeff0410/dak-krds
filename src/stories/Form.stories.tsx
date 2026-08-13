import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
	Button,
	Checkbox,
	type CheckboxStatus,
	CheckboxGroup,
	ChipGroup,
	FloatingButton,
	Icon,
	Link,
	LinkButton,
	NumberInput,
	PhoneInput,
	QuantityToggle,
	RadioButtonGroup,
	RangeSlider,
	Select,
	Switch,
	Tag,
	TextArea,
	TextInput,
} from "../components";

const meta = {
	title: "액션 · 선택 · 입력/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const VARIANTS = [
	"primary",
	"secondary",
	"teriary",
	"text",
	"gray",
	"danger",
	"danger-secondary",
	"black",
	"success",
	"success-secondary",
	"warning",
	"outline",
	"transparent",
	"custom",
] as const;

export const 버튼: Story = {
	render: () => (
		<div className="stack">
			<div className="row">
				{VARIANTS.map((variant) => (
					<Button key={variant} variant={variant} width="auto">
						{variant}
					</Button>
				))}
			</div>
			<div className="row">
				{(["xs", "s", "m", "l", "xl"] as const).map((size) => (
					<Button key={size} size={size} width="auto">
						{size}
					</Button>
				))}
			</div>
			<div className="row">
				<Button width="auto" disabled>
					비활성
				</Button>
				<Button width="auto" loading loadingText="저장 중">
					저장
				</Button>
				<Button width="auto" useIcon icon={<Icon icon="Home" size={18} />}>
					아이콘
				</Button>
			</div>
		</div>
	),
};

export const 링크: Story = {
	render: () => (
		<div className="row">
			<Link title="관련 사이트로 이동" useIcon>
				관련 사이트
			</Link>
			<LinkButton href="#" title="자세히 보기" variant="accent">
				자세히 보기
			</LinkButton>
			{(["s", "m", "l"] as const).map((size) => (
				<LinkButton key={size} href="#" title={`목록 ${size}`} variant="default" size={size}>
					목록 {size}
				</LinkButton>
			))}
		</div>
	),
};

export const 플로팅버튼: Story = {
	parameters: { layout: "fullscreen" },
	render: () => (
		<div style={{ height: 320 }}>
			<FloatingButton
				icon={<Icon icon="Plus" size={24} />}
				label="빠른 메뉴"
				showLabel
				actions={[
					{ label: "맨 위로", icon: <Icon icon="ArrowUp" size={20} />, href: "#" },
					{ label: "문의", icon: <Icon icon="Home" size={20} />, onClick: () => {} },
				]}
			/>
		</div>
	),
};

export const 선택_변형: Story = {
	name: "선택 — 크기 · 상태 · 배치",
	render: function SelectionVariantsStory() {
		const [value, setValue] = useState("ko");
		const [group, setGroup] = useState<string[]>(["email"]);
		const [terms, setTerms] = useState<CheckboxStatus>("indeterminate");
		const options = [
			{ value: "ko", label: "한국어" },
			{ value: "en", label: "English" },
		];

		return (
			<div className="stack">
				{(["s", "m", "l"] as const).map((size) => (
					<div key={size} className="panel">
						<Select
							id={`size-${size}`}
							label={`크기 ${size}`}
							size={size}
							options={options}
							value={value}
							onChange={(next) => setValue(next as string)}
						/>
					</div>
				))}
				{(["error", "view", "completed"] as const).map((state) => (
					<div key={state} className="panel">
						<Select
							id={`state-${state}`}
							label={`상태 ${state}`}
							state={state}
							options={options}
							value={value}
							onChange={(next) => setValue(next as string)}
						/>
					</div>
				))}
				<div className="panel">
					<Select
						id="variant-text"
						label="변형 text"
						variant="text"
						direction="horizontal"
						options={options}
						value={value}
						onChange={(next) => setValue(next as string)}
					/>
				</div>
				<Checkbox
					id="mixed"
					label="일부만 선택된 상태"
					size="l"
					status={terms}
					onChange={setTerms}
				/>
				<Checkbox
					id="check-disabled"
					label="비활성 체크박스"
					status="on"
					disabled
					onChange={() => {}}
				/>
				<CheckboxGroup
					options={[
						{ value: "email", label: "이메일" },
						{ value: "sms", label: "SMS" },
					]}
					values={group}
					onChange={setGroup}
					direction="vertical"
					size="l"
				/>
				<RadioButtonGroup
					name="vertical"
					options={[
						{ value: "a", label: "세로 배치 A" },
						{ value: "b", label: "세로 배치 B" },
					]}
					selectedValue="a"
					onChange={() => {}}
					direction="vertical"
				/>
				<div className="row">
					{(["s", "m", "l"] as const).map((size) => (
						<Tag key={size} label={`태그 ${size}`} size={size} />
					))}
					<Tag label="삭제 비활성" variant="removable" disabled onDelete={() => {}} />
				</div>
				<ChipGroup
					type="single"
					options={[
						{ value: "react", label: "React" },
						{ value: "ts", label: "TypeScript" },
					]}
					selected={["react"]}
					onChange={() => {}}
				/>
			</div>
		);
	},
};

export const 선택: Story = {
	render: function SelectionStory() {
		const [single, setSingle] = useState("ko");
		const [terms, setTerms] = useState<CheckboxStatus>("off");
		const [checks, setChecks] = useState<string[]>(["email"]);
		const [radio, setRadio] = useState<string | boolean>("a");
		const [alarm, setAlarm] = useState(true);
		const [chips, setChips] = useState<string[]>(["react"]);

		return (
			<div className="stack">
				<div className="panel">
					<Select
						id="lang"
						label="언어"
						options={[
							{ value: "ko", label: "한국어" },
							{ value: "en", label: "English" },
						]}
						value={single}
						onChange={(value) => setSingle(value as string)}
					/>
				</div>
				<Checkbox
					id="terms"
					label="이용약관에 동의합니다"
					status={terms}
					onChange={setTerms}
				/>
				<CheckboxGroup
					options={[
						{ value: "email", label: "이메일" },
						{ value: "sms", label: "SMS" },
					]}
					values={checks}
					onChange={setChecks}
					direction="horizontal"
				/>
				<RadioButtonGroup
					name="agree"
					options={[
						{ value: "a", label: "선택 A" },
						{ value: "b", label: "선택 B" },
					]}
					selectedValue={radio}
					onChange={setRadio}
					direction="horizontal"
				/>
				<Switch
					label="알림 받기"
					labelPosition="right"
					status={alarm}
					onChange={setAlarm}
				/>
				<Switch
					label="레이블 왼쪽"
					labelPosition="left"
					size="l"
					status={alarm}
					onChange={setAlarm}
				/>
				<div className="row">
					<Tag label="기본 태그" />
					<Tag label="삭제 가능" variant="removable" onDelete={() => {}} />
				</div>
				<ChipGroup
					type="multi"
					options={[
						{ value: "react", label: "React" },
						{ value: "ts", label: "TypeScript" },
					]}
					selected={chips}
					onChange={(value, checked) =>
						setChips((list) =>
							checked ? [...list, value] : list.filter((v) => v !== value),
						)
					}
				/>
			</div>
		);
	},
};

export const 입력_상태: Story = {
	name: "입력 — 크기 · 오류 · 배치",
	render: function InputStatesStory() {
		const [value, setValue] = useState("입력값");
		const [memo, setMemo] = useState("내용");

		return (
			<div className="stack">
				<div className="panel">
					<TextInput
						id="password"
						type="password"
						title="비밀번호"
						value={value}
						setValue={setValue}
					/>
				</div>
				<div className="panel">
					<TextInput
						id="invalid"
						title="이메일"
						isValid={false}
						error="올바른 형식이 아닙니다"
						value={value}
						setValue={setValue}
					/>
				</div>
				<div className="panel">
					<TextInput
						id="horizontal"
						title="가로 배치"
						titlePosition="horizontal"
						value={value}
						setValue={setValue}
					/>
				</div>
				<div className="panel">
					<TextInput
						id="disabled-input"
						title="비활성"
						disabled
						value={value}
						setValue={setValue}
					/>
				</div>
				<div className="panel">
					<TextInput
						id="deletable"
						title="삭제 버튼"
						useDelete
						value={value}
						setValue={setValue}
					/>
				</div>
				<div className="panel">
					<PhoneInput
						id="phone-required"
						title="휴대전화"
						isRequired
						value="01012345678"
						setValue={() => {}}
					/>
				</div>
				<div className="panel">
					<Select
						id="placeholder-only"
						label="선택 안 함"
						placeholder="항목을 선택하세요"
						options={[
							{ value: "a", label: "가" },
							{ value: "b", label: "나" },
						]}
						value=""
						onChange={() => {}}
					/>
				</div>
				{(["s", "m", "l"] as const).map((size) => (
					<div key={size} className="wide">
						<TextArea
							id={`area-${size}`}
							title={`문의 내용 ${size}`}
							size={size}
							value={memo}
							setValue={setMemo}
						/>
					</div>
				))}
				<div className="wide">
					<TextArea
						id="area-invalid"
						title="오류 상태"
						isValid={false}
						error="500자 이내로 입력하세요"
						value={memo}
						setValue={setMemo}
					/>
				</div>
			</div>
		);
	},
};

export const 입력: Story = {
	render: function InputStory() {
		const [name, setName] = useState("홍길동");
		const [memo, setMemo] = useState("");
		const [amount, setAmount] = useState("1000");
		const [phone, setPhone] = useState("01012345678");
		const [count, setCount] = useState(3);
		const [radius, setRadius] = useState(40);

		return (
			<div className="stack">
				<div className="panel">
					<TextInput
						id="name"
						title="이름"
						description="실명을 입력하세요"
						isRequired
						value={name}
						setValue={setName}
					/>
				</div>
				<div className="wide">
					<TextArea
						id="memo"
						title="문의 내용"
						placeholder="내용을 입력하세요"
						useCount
						maxLength={200}
						value={memo}
						setValue={setMemo}
					/>
				</div>
				<div className="panel">
					<NumberInput
						id="amount"
						title="금액"
						useComma
						value={amount}
						setValue={setAmount}
					/>
				</div>
				<div className="panel">
					<PhoneInput
						id="phone"
						title="휴대전화"
						value={phone}
						setValue={setPhone}
					/>
				</div>
				<QuantityToggle
					label="접종 회차"
					value={count}
					onChange={setCount}
					min={1}
					max={5}
					unit="회"
				/>
				<div className="panel">
					<RangeSlider
						label="검색 반경"
						value={radius}
						onChange={setRadius}
						min={0}
						max={100}
						step={10}
						unit="km"
					/>
				</div>
			</div>
		);
	},
};
