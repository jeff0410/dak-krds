import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";
import "../src/stories/stories.css";

const preview: Preview = {
	parameters: {
		layout: "padded",
		controls: { expanded: true },
		a11y: { test: "error" },
		options: {
			storySort: {
				order: [
					"아이덴티티",
					"탐색",
					"레이아웃 및 표현",
					"액션",
					"선택",
					"피드백",
					"도움",
					"입력",
					"설정",
					"콘텐츠",
					"모바일",
					"타이포그래피",
				],
			},
		},
	},
	globalTypes: {
		viewport: { description: "화면 폭" },
	},
	initialGlobals: {
		viewport: { value: "responsive" },
	},
};

export default preview;
