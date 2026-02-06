import type { ButtonHTMLAttributes } from "react";
import { Button } from "src/design-index";

export const BlueButton = ({
	children,
	onClick,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
	return (
		<Button
			{...props}
			label="확인"
			width="78px"
			onClick={onClick ? () => onClick({} as any) : undefined}
		>
			{children}
		</Button>
	);
};
