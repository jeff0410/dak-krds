import type { ButtonHTMLAttributes } from "react";
import { Button } from "../../index";

export const RedButton = ({
	children,
	className = "",
	onClick,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			{...props}
			className={className}
			variant="danger"
			label="삭제"
			width="fit-content"
			onClick={onClick ? () => onClick({} as any) : undefined}
		>
			{children}
		</Button>
	);
};
