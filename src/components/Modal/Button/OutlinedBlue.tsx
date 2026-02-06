import type { ButtonHTMLAttributes } from "react";
import { Button } from "../../index";

export const OutlinedBlueButton = ({
	children,
	onClick,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button
		{...props}
		size="m"
		variant="outline"
		label="닫기"
		width="78px"
		onClick={onClick ? () => onClick({} as any) : undefined}
	>
		{children}
	</Button>
);
