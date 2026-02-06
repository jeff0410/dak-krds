import type { ButtonHTMLAttributes } from "react";
import { Button } from "../../index";

export const GreyButton = ({
	children,
	onClick,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button
		{...props}
		variant="gray"
		size="m"
		label="닫기"
		width="78px"
		onClick={onClick ? () => onClick({} as any) : undefined}
	>
		{children}
	</Button>
);
