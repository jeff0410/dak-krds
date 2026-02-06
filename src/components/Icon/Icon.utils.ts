import type { CSSProperties } from "react";
import type { IconType } from "./Icon";
import type { IconCategory } from "./Icon.configs";
import { ICON_CONFIG } from "./Icon.configs";

export function getIconCategory(iconName: IconType): IconCategory | undefined {
	for (const [category, icons] of Object.entries(ICON_CONFIG)) {
		if ((icons as readonly IconType[]).includes(iconName)) {
			return category as IconCategory;
		}
	}
	return undefined;
}

interface CustomCSSProperties extends CSSProperties {
	"--icon-primary"?: string;
	"--icon-secondary"?: string;
	"--icon-stroke"?: string;
	"--icon-color"?: string;
}

export function getIconProps(
	iconName: IconType,
	color?: string,
	primary?: string,
	secondary?: string,
): { style: CustomCSSProperties } {
	const category = getIconCategory(iconName);

	const style: CustomCSSProperties = {};

	if (category === "multiColor") {
		style["--icon-primary"] = primary || "#256EF4";
		style["--icon-secondary"] = secondary || "#ffffff";
	}

	// stroke 아이콘의 경우 --icon-color 변수 사용 (CSS와 일치)
	if (category === "stroke" && color) {
		style["--icon-color"] = color;
	}

	// 일반 아이콘의 경우에도 color 적용
	if (!category && color) {
		style["--icon-color"] = color;
	}

	return { style };
}
