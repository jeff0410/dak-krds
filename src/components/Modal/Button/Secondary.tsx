import type { ButtonHTMLAttributes } from "react";
import { Button } from "../../index";

export const SecondaryButton = ({
	children,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button
		{...props}
		variant="secondary"
		size="s"
		label="닫기"
		width="78px"
		onClick={() => {}}
	>
		{children}
	</Button>
);
