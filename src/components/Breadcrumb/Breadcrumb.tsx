import type React from "react";
import { Icon } from "../Icon";
import { Label } from "../Label";
import * as style from "./Breadcrumb.module.css";
import type { BreadcrumbProps } from "./Breadcrumb.type";
import useIsMobile from "./useIsMobile";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
	items,
	onItemClick,
}) => {
	const isMobile = useIsMobile();

	return (
		<nav aria-label="브레드크럼">
			<ol className={style.list}>
				{items.map((item, index) => (
					<li key={item.label} className={style.item}>
						{index > 0 && (
							<Icon icon="ArrowRight" size={20} viewBox="0 0 20 20" />
						)}
						<Label
							id={item.label}
							onClick={() => {
								onItemClick?.(item.value);
								item.onClick?.();
							}}
							color="gray-90"
							size="xs"
							className={style.label}
							tabIndex={0}
						>
							{index === 0 && (
								<Icon icon="Home" size={20} viewBox="0 0 20 20" />
							)}
							<span title={item.label}>
								{isMobile && item.label.length > 4
									? `${item.label.slice(0, 4)}...`
									: item.label}
							</span>
						</Label>
					</li>
				))}
			</ol>
		</nav>
	);
};
