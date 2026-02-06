import type React from "react";
import type { CSSProperties } from "react";
import styles from "./Icon.module.css";
import type { IconProps } from "./Icon.type";
import { getIconCategory, getIconProps } from "./Icon.utils";
import { ICON_IMPORT_CONFIG } from "./icon.import";

export type IconType = keyof typeof ICON_IMPORT_CONFIG;
interface CustomCSSProperties extends CSSProperties {
	"--icon-color"?: string;
}

export const Icon = ({
	icon: iconComponent,
	size = 24,
	color,
	primary,
	secondary,
	className = "",
	fillRule = "evenodd",
	viewBox = "0 0 24 24",
	...props
}: IconProps) => {
	const SvgIcon = ICON_IMPORT_CONFIG[iconComponent] as React.ComponentType<
		React.SVGProps<SVGSVGElement>
	>;
	const category = getIconCategory(iconComponent);
	const iconProps = getIconProps(iconComponent, color, primary, secondary);
	const applyColor = color || primary || secondary;
	const isMultiColor = category === "multiColor";
	const isStroke = category === "stroke";

	const iconClassName = [
		className,
		applyColor ? styles.icon : "",
		isMultiColor ? styles.multiColor : "",
		isStroke ? styles.stroke : "",
	]
		.filter(Boolean)
		.join(" ");

	return (
		<SvgIcon
			fillRule={fillRule}
			width={size}
			height={size}
			viewBox={viewBox}
			className={iconClassName}
			style={
				{
					...props.style,
					...iconProps.style,
					...(color ? { "--icon-color": color } : {}),
				} as CustomCSSProperties
			}
			{...props}
		/>
	);
};
