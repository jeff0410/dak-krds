import { useId } from "react";
import { Disclosure } from "../Disclosure";
import styles from "./AccessibleMedia.module.css";
import type { AccessibleMediaProps } from "./AccessibleMedia.type";

export function AccessibleMedia({
	src,
	type = "video",
	title,
	poster,
	tracks = [],
	transcript,
	transcriptLabel = "대본 보기",
	description,
	className = "",
	...props
}: AccessibleMediaProps) {
	const baseId = useId();
	const titleId = `${baseId}-title`;
	const trackElements = tracks.map((track) => (
		<track
			key={`${track.kind}-${track.srcLang}`}
			kind={track.kind}
			src={track.src}
			srcLang={track.srcLang}
			label={track.label}
			default={track.default}
		/>
	));

	return (
		<figure
			aria-labelledby={titleId}
			className={`${styles.accessibleMedia} ${className}`.trim()}
			{...props}
		>
			<h3 id={titleId} className={styles.title}>
				{title}
			</h3>

			{type === "video" ? (
				<video
					className={styles.media}
					src={src}
					poster={poster}
					controls
					preload="metadata"
				>
					{trackElements}
				</video>
			) : (
				<audio className={styles.audio} src={src} controls preload="metadata">
					{trackElements}
				</audio>
			)}

			{description && (
				<figcaption className={styles.description}>{description}</figcaption>
			)}

			{transcript && (
				<div className={styles.transcript}>
					<Disclosure title={transcriptLabel}>{transcript}</Disclosure>
				</div>
			)}
		</figure>
	);
}
