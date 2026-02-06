import { Button } from "../Button";
import { Label } from "../Label";
import * as style from "./Tab.module.css";
import type { InternalTabProps } from "./Tab.type";

// ▶️ 각 개별 탭을 렌더링하는 컴포넌트
export const Tab = ({
	label,
	isSelected,
	onClick,
	onKeyDown,
	id,
	panelId,
	disabled,
	tabIndex,
}: InternalTabProps) => {
	return (
		<Button
			role="tab"
			aria-selected={isSelected} // 선택 여부
			aria-controls={panelId} // 연결된 패널 ID
			id={id}
			onClick={onClick}
			onKeyDown={onKeyDown}
			tabIndex={tabIndex}
			variant="text"
			width={"fit-content"}
			size="m"
			rounded="0"
			disabled={disabled}
			className={`${style.tabButton} ${
				isSelected ? style.tabButtonSelected : style.tabButtonUnselected
			}`}
		>
			{/* 탭 라벨 */}
			<Label
				id={`tab-label-${label}`}
				className={style.tabLabel}
				size="l"
				weight="bold"
			>
				{label}
			</Label>
			{isSelected && <span className={style.srOnly}>선택됨</span>}
		</Button>
	);
};
