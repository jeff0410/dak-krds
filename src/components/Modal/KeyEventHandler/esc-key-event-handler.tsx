import type { PropsWithChildren } from "react";
import { useRef } from "react";

import { useEscKeyEventListener } from "../utils";

export const EscKeyEventHandler = ({
	children,
	onEscKeyDown,
}: PropsWithChildren<{ onEscKeyDown: () => void }>) => {
	const ref = useRef<HTMLDivElement | null>(null);

	useEscKeyEventListener({ onEscKeyDown, ref });

	return (
		<div id="esc-handler" ref={ref}>
			{children}
		</div>
	);
};
