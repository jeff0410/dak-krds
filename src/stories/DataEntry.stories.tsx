import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
	Button,
	CustomDatePicker,
	DatePicker,
	Drawer,
	FileUpload,
	type FileObject,
	TimeSelector,
} from "../components";

const meta = {
	title: "날짜 · 업로드 · 패널/개요",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const 날짜선택: Story = {
	render: function DatePickerStory() {
		const [single, setSingle] = useState("2026-08-14");
		const [range, setRange] = useState<string[]>(["2026-08-01", "2026-08-14"]);

		return (
			<div className="stack">
				<div className="panel">
					<DatePicker
						id="single"
						label="접종일"
						value={single}
						onChange={setSingle}
					/>
				</div>
				<div className="panel">
					<DatePicker
						id="range"
						type="range"
						label="조회 기간"
						value={range}
						onChange={setRange}
					/>
				</div>
				<div className="panel">
					<DatePicker
						id="required"
						label="필수 항목"
						isRequired
						value={single}
						onChange={setSingle}
					/>
				</div>
				<div className="panel">
					<DatePicker
						id="invalid"
						label="오류 상태"
						isValid={false}
						useMessage
						value={single}
						onChange={setSingle}
					/>
				</div>
				<div className="panel">
					<DatePicker
						id="disabled"
						label="비활성"
						disabled
						value={single}
						onChange={setSingle}
					/>
				</div>
				<div className="panel">
					<DatePicker
						id="horizontal"
						label="가로 배치"
						titlePosition="horizontal"
						value={single}
						onChange={setSingle}
					/>
				</div>
			</div>
		);
	},
};

export const 날짜선택_달력열림: Story = {
	name: "날짜 선택 — 달력 열린 상태",
	parameters: { layout: "fullscreen" },
	play: async ({ canvasElement }) => {
		canvasElement.querySelector<HTMLElement>("button")?.click();
	},
	render: function CalendarOpenStory() {
		const [value, setValue] = useState("2026-08-14");
		return (
			<div style={{ height: 520, padding: 24 }}>
				<DatePicker id="open" label="접종일" value={value} onChange={setValue} />
			</div>
		);
	},
};

export const 시간선택: Story = {
	render: function TimeSelectorStory() {
		const [time, setTime] = useState("09:30");
		return (
			<div className="panel">
				<TimeSelector value={time} onChange={setTime} />
				<TimeSelector value={time} onChange={setTime} useAP />
			</div>
		);
	},
};

export const 사용자달력: Story = {
	name: "CustomDatePicker",
	render: function CustomDatePickerStory() {
		const [value, setValue] = useState("2026-08-14");
		return (
			<div className="panel">
				<CustomDatePicker
					id="custom"
					label="접종일"
					value={value}
					onChange={setValue}
				/>
			</div>
		);
	},
};

export const 파일업로드: Story = {
	render: function FileUploadStory() {
		const [files, setFiles] = useState<FileObject[]>([]);
		return (
			<div className="wide">
				<FileUpload
					title="증빙 서류"
					description="신분증 사본을 첨부하세요."
					subDescription="PDF · JPG · PNG, 10MB 이하"
					accept=".pdf,.jpg,.png"
					maxFiles={3}
					showCountLabel
					fileList={files}
					onUpload={async () => true}
					onRemove={(name) =>
						setFiles((list) => list.filter((item) => item.name !== name))
					}
					onChange={setFiles}
				/>
			</div>
		);
	},
};

export const 파일업로드_목록: Story = {
	name: "파일 업로드 — 첨부된 목록",
	render: function FileUploadListStory() {
		const sample = (name: string, status: FileObject["status"], error?: string) =>
			({
				file: new File(["내용"], name),
				name,
				size: 1024 * 512,
				status,
				errorMessage: error,
			}) satisfies FileObject;

		const [files, setFiles] = useState<FileObject[]>([
			sample("신분증.pdf", "success"),
			sample("주민등록등본.jpg", "uploading"),
			sample("용량초과.png", "success", "10MB 를 넘는 파일입니다"),
		]);

		return (
			<div className="wide">
				<FileUpload
					title="증빙 서류"
					description="첨부된 파일 목록입니다."
					showCountLabel
					maxFiles={3}
					fileList={files}
					onUpload={async () => true}
					onRemove={(name) =>
						setFiles((list) => list.filter((item) => item.name !== name))
					}
					onChange={setFiles}
				/>
			</div>
		);
	},
};

export const 서랍: Story = {
	name: "Drawer — 열린 상태",
	parameters: { layout: "fullscreen" },
	render: function DrawerStory() {
		const [open, setOpen] = useState(true);
		return (
			<div id="app" style={{ position: "relative", height: 480 }}>
				<div style={{ padding: 24 }}>
					<Button width="auto" onClick={() => setOpen(true)}>
						서랍 열기
					</Button>
				</div>
				<Drawer open={open} setOpen={setOpen} position="bottom" title="접종 기관 선택">
					<p>가까운 기관을 선택하세요.</p>
				</Drawer>
			</div>
		);
	},
};
