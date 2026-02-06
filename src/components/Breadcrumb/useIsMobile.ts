import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const update = () => setIsMobile(window.innerWidth <= breakpoint);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, [breakpoint]);

	return isMobile;
};

export default useIsMobile;
