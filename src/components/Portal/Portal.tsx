import type { PropsWithChildren } from "react";
import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import type { PortalProps } from "./Portal.type";

export const Portal = ({
	children,
	style,
	container,
}: PropsWithChildren<PortalProps>) => {
	const portal = useMemo(() => document.createElement("div"), []);

	useEffect(() => {
		Object.assign(portal.style, style);
	}, [portal, style]);

	useEffect(() => {
		const parent = container || document.body;
		// eslint-disable-next-line react-hooks/immutability -- container 는 데이터가 아니라 포탈을 붙일 실제 DOM 노드이며, 위치 기준을 잡기 위한 의도된 조작이다
		parent.style.position = "relative";

		if (parent instanceof HTMLElement) {
			parent.appendChild(portal);
		}

		return () => {
			if (parent.contains(portal)) {
				parent.removeChild(portal);
			}
		};
	}, [portal, container]);

	return createPortal(children, portal);
};
