import type { SVGProps } from "react";
import type { IconType } from "./Icon";

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "fill"> {
	icon: IconType;
	/**
	 * 아이콘 색상 변경이 필요할 시 color 값 hexCode 혹은 css variable로 넘겨주세요.
	 */
	color?: string;
	primary?: string; // 다중 색상 아이콘의 경우, 주 색상
	secondary?: string; // 다중 색상 아이콘의 경우, 보조 색상
	size?: number;
}
