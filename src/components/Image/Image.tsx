import { useId } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./Image.module.css";
import type { ImageProps } from "./Image.type";

const RATIO_VALUE: Record<string, string> = {
	"1:1": "1 / 1",
	"4:3": "4 / 3",
	"16:9": "16 / 9",
	"3:2": "3 / 2",
};

export function Image({
	src,
	alt,
	ratio = "auto",
	fit = "cover",
	caption,
	longDescription,
	rounded = false,
	className = "",
	...props
}: ImageProps) {
	const baseId = useId();
	const descriptionId = longDescription ? `${baseId}-description` : undefined;

	const picture = (
		<span
			className={`${styles.frame} ${rounded ? styles.rounded : ""}`.trim()}
			style={ratio !== "auto" ? { aspectRatio: RATIO_VALUE[ratio] } : undefined}
		>
			<img
				src={src}
				alt={alt}
				loading="lazy"
				decoding="async"
				className={`${styles.image} ${styles[fit]}`}
				aria-describedby={descriptionId}
				{...props}
			/>
		</span>
	);

	if (!caption && !longDescription) {
		return <span className={`${styles.image_wrap} ${className}`.trim()}>{picture}</span>;
	}

	return (
		<figure className={`${styles.figure} ${className}`.trim()}>
			{picture}
			{longDescription && (
				<VisuallyHidden as="div" id={descriptionId}>
					{longDescription}
				</VisuallyHidden>
			)}
			{caption && <figcaption className={styles.caption}>{caption}</figcaption>}
		</figure>
	);
}
