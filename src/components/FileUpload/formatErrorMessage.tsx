import type React from "react";

export const formatErrorMessage = (
	message: string,
	isMobile: boolean,
): React.ReactNode => {
	if (!message) return null;

	const lines: string[] = isMobile
		? [message.replace(/<br\s*\/?>/gi, " ")]
		: message.split(/<br\s*\/?>/gi);

	return (
		<>
			{lines.map((line: string, idx: number) => (
				<span key={idx}>
					{line}
					{!isMobile && <br />}
				</span>
			))}
		</>
	);
};
