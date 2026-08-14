import type { ButtonHTMLAttributes } from "react";
import { Button } from "../../index";

export const SecondaryButton = ({
	children,
	onClick,
	...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
	<Button {...props} variant="teriary" label="취소" width="auto" onClick={onClick}>
		{children}
	</Button>
);
