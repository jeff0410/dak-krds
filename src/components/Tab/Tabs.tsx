import { type KeyboardEvent, useState } from "react";
import { Tab } from "./Tab";
import * as style from "./Tab.module.css";
import type { TabsProps } from "./Tab.type";
import { TabPanel } from "./TabPanel";

// ▶️ 메인 Tabs 컴포넌트
export const Tabs = ({
	tabs,
	variant = "underline",
	selectedIndex,
	onChange,
	width = "100%",
	tabHeight = "48px",
	gap = 0,
	sideButton,
	overflowX,
	overflowY,
	tabListPosition = "sticky",
}: TabsProps) => {
	// 내부에서 탭 인덱스를 관리할 상태
	const [internalIndex, setInternalIndex] = useState(0);

	// 제어형인지 판별
	const isControlled = selectedIndex !== undefined;

	// 현재 선택된 인덱스
	const currentIndex = isControlled ? selectedIndex : internalIndex;

	// 탭 클릭
	const handleTabChange = (index: number) => {
		if (!isControlled) {
			setInternalIndex(index);
		}
		onChange?.(index); // 외부 콜백 호출
	};

	// 방향키 네비게이션 핸들러
	const handleKeyDown = (event: KeyboardEvent, index: number) => {
		const enabledTabs = tabs
			.map((tab, idx) => ({ ...tab, idx }))
			.filter((tab) => !tab.disabled);
		const currentEnabledIndex = enabledTabs.findIndex(
			(tab) => tab.idx === index,
		);
		let newIndex: number | null = null;

		switch (event.key) {
			case "ArrowLeft":
			case "ArrowUp": {
				event.preventDefault();
				const prevIndex =
					currentEnabledIndex === 0
						? enabledTabs.length - 1
						: currentEnabledIndex - 1;
				newIndex = enabledTabs[prevIndex].idx;
				break;
			}
			case "ArrowRight":
			case "ArrowDown": {
				event.preventDefault();
				const nextIndex =
					currentEnabledIndex === enabledTabs.length - 1
						? 0
						: currentEnabledIndex + 1;
				newIndex = enabledTabs[nextIndex].idx;
				break;
			}
			case "Home": {
				event.preventDefault();
				newIndex = enabledTabs[0].idx;
				break;
			}
			case "End": {
				event.preventDefault();
				newIndex = enabledTabs[enabledTabs.length - 1].idx;
				break;
			}
		}

		if (newIndex !== null) {
			handleTabChange(newIndex);
			// 포커스 이동
			const tabElement = document.getElementById(`tab-${tabs[newIndex].id}`);
			tabElement?.focus();
		}
	};

	return (
		<div className={style.tabsContainer} style={{ width, gap }}>
			{/* 탭 리스트 영역 - 상단 고정 */}
			<div
				role="tablist"
				aria-label="탭 목록"
				style={{ height: tabHeight }}
				className={`${style.tabList} ${style[`variant${variant[0].toUpperCase()}${variant.slice(1)}`]} ${tabListPosition}`}
			>
				<div className={style.tabListInner}>
					{tabs.map((tab, index) => (
						<Tab
							key={tab.id}
							label={tab.label}
							isSelected={index === currentIndex}
							onClick={() => handleTabChange(index)}
							onKeyDown={(e) => handleKeyDown(e, index)}
							id={`tab-${tab.id}`}
							panelId={`panel-${tab.id}`}
							disabled={tab.disabled}
						/>
					))}
				</div>
				{sideButton && (
					<div className={style.sideButtonContainer}>{sideButton}</div>
				)}
			</div>

			{/* 탭 패널 영역 - 스크롤 가능 */}
			<div
				className={style.tabContentContainer}
				style={{
					overflowX: overflowX ?? "hidden",
					overflowY: overflowY ?? "auto",
				}}
			>
				{tabs.map((tab, index) => {
					const pannel =
						typeof tab.content === "function" ? (
							index === currentIndex ? (
								<TabPanel
									key={tab.id}
									id={`panel-${tab.id}`}
									tabId={`tab-${tab.id}`}
									isSelected={true}
								>
									{typeof tab.content === "function"
										? tab.content()
										: tab.content}
								</TabPanel>
							) : null
						) : (
							<TabPanel
								key={tab.id}
								id={`panel-${tab.id}`}
								tabId={`tab-${tab.id}`}
								isSelected={index === currentIndex}
							>
								{tab.content}
							</TabPanel>
						);

					return pannel;
				})}
			</div>
		</div>
	);
};
