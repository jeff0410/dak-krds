import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./TextToSpeech.module.css";
import type { TextToSpeechProps } from "./TextToSpeech.type";

const getSynthesis = () =>
	typeof window !== "undefined" && "speechSynthesis" in window
		? window.speechSynthesis
		: null;

const subscribeToNothing = () => () => {};

export function TextToSpeech({
	targetSelector,
	text,
	lang = "ko-KR",
	rate = 1,
	label = "음성으로 듣기",
	playLabel = "재생",
	pauseLabel = "일시정지",
	stopLabel = "정지",
	className = "",
	...props
}: TextToSpeechProps) {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const isSupported = useSyncExternalStore(
		subscribeToNothing,
		() => Boolean(getSynthesis()),
		() => false,
	);

	useEffect(() => () => getSynthesis()?.cancel(), []);

	const resolveText = useCallback(() => {
		if (text) return text;
		if (!targetSelector) return "";
		return document.querySelector(targetSelector)?.textContent?.trim() ?? "";
	}, [text, targetSelector]);

	const play = () => {
		const synthesis = getSynthesis();
		if (!synthesis) return;

		if (isPaused) {
			synthesis.resume();
			setIsPaused(false);
			return;
		}

		const content = resolveText();
		if (!content) return;

		synthesis.cancel();
		const utterance = new SpeechSynthesisUtterance(content);
		utterance.lang = lang;
		utterance.rate = rate;
		utterance.onend = () => {
			setIsSpeaking(false);
			setIsPaused(false);
		};
		synthesis.speak(utterance);
		setIsSpeaking(true);
	};

	const pause = () => {
		getSynthesis()?.pause();
		setIsPaused(true);
	};

	const stop = () => {
		getSynthesis()?.cancel();
		setIsSpeaking(false);
		setIsPaused(false);
	};

	if (!isSupported) return null;

	return (
		<div className={`${styles.textToSpeech} ${className}`.trim()} {...props}>
			<span className={styles.label}>{label}</span>
			<div className={styles.controls}>
				<button
					type="button"
					className={styles.button}
					onClick={isSpeaking && !isPaused ? pause : play}
				>
					<span className={styles.icon} aria-hidden="true">
						{isSpeaking && !isPaused ? "❙❙" : "▶"}
					</span>
					<VisuallyHidden as="span">
						{isSpeaking && !isPaused ? pauseLabel : playLabel}
					</VisuallyHidden>
				</button>
				<button
					type="button"
					className={styles.button}
					onClick={stop}
					disabled={!isSpeaking}
				>
					<span className={styles.icon} aria-hidden="true">
						■
					</span>
					<VisuallyHidden as="span">{stopLabel}</VisuallyHidden>
				</button>
			</div>
			<VisuallyHidden as="span" aria-live="polite">
				{isSpeaking ? (isPaused ? "일시정지됨" : "음성 재생 중") : ""}
			</VisuallyHidden>
		</div>
	);
}
