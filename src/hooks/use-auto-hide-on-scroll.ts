import { useEffect, useState } from "react";

export const useAutoHideOnScroll = (enabled: boolean, revealDelta = 4) => {
	const [isHidden, setIsHidden] = useState(false);

	useEffect(() => {
		if (!enabled) return;

		let lastY = window.scrollY;
		let frame = 0;

		const update = () => {
			frame = 0;
			const currentY = window.scrollY;
			const diff = currentY - lastY;

			if (currentY <= 0) {
				setIsHidden(false);
			} else if (diff > revealDelta) {
				setIsHidden(true);
			} else if (diff < -revealDelta) {
				setIsHidden(false);
			}

			if (Math.abs(diff) > revealDelta) lastY = currentY;
		};

		const onScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(update);
		};

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame) window.cancelAnimationFrame(frame);
			setIsHidden(false);
		};
	}, [enabled, revealDelta]);

	return enabled && isHidden;
};
