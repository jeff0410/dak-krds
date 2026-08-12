import { useCallback, useEffect, useId, useRef, useState } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import styles from "./LanguageSwitcher.module.css";
import type { LanguageOption, LanguageSwitcherProps } from "./LanguageSwitcher.type";

const optionLabel = (option: LanguageOption) =>
	option.localName
		? `${option.nativeName} - ${option.localName}`
		: option.nativeName;

export function LanguageSwitcher({
	languages,
	current,
	onSelect,
	label = "언어 선택",
	icon,
	className = "",
	...props
}: LanguageSwitcherProps) {
	const baseId = useId();
	const listId = `${baseId}-list`;
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);

	const close = useCallback((focusTrigger = false) => {
		setIsOpen(false);
		if (focusTrigger) triggerRef.current?.focus();
	}, []);

	useEffect(() => {
		if (!isOpen) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") close(true);
		};
		const onPointerDown = (event: MouseEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) close();
		};
		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
		};
	}, [isOpen, close]);

	const currentOption =
		languages.find((language) => language.code === current) ?? languages[0];
	const isLinkType = languages.length <= 2;

	const renderOption = (option: LanguageOption) => {
		const isCurrent = option.code === current;
		const content = (
			<>
				{optionLabel(option)}
				{option.external && <VisuallyHidden>새 창 열림</VisuallyHidden>}
			</>
		);

		if (option.href) {
			return (
				<a
					href={option.href}
					lang={option.code}
					hrefLang={option.code}
					className={styles.option}
					aria-current={isCurrent ? "true" : undefined}
					{...(option.external
						? { target: "_blank", rel: "noreferrer noopener" }
						: {})}
					onClick={() => onSelect?.(option.code)}
				>
					{content}
				</a>
			);
		}

		return (
			<button
				type="button"
				lang={option.code}
				className={styles.option}
				aria-current={isCurrent ? "true" : undefined}
				onClick={() => {
					onSelect?.(option.code);
					close(true);
				}}
			>
				{content}
			</button>
		);
	};

	if (isLinkType) {
		return (
			<div
				ref={rootRef}
				className={`${styles.languageSwitcher} ${styles.linkType} ${className}`.trim()}
				{...props}
			>
				{icon && (
					<span className={styles.icon} aria-hidden="true">
						{icon}
					</span>
				)}
				<VisuallyHidden as="span">{label}</VisuallyHidden>
				{languages.map((option) => (
					<span key={option.code}>{renderOption(option)}</span>
				))}
			</div>
		);
	}

	return (
		<div
			ref={rootRef}
			className={`${styles.languageSwitcher} ${className}`.trim()}
			{...props}
		>
			<button
				type="button"
				ref={triggerRef}
				className={styles.trigger}
				aria-expanded={isOpen}
				aria-controls={listId}
				onClick={() => setIsOpen((open) => !open)}
			>
				{icon && (
					<span className={styles.icon} aria-hidden="true">
						{icon}
					</span>
				)}
				<span className={styles.triggerLabel}>
					<VisuallyHidden as="span">{label} </VisuallyHidden>
					{currentOption ? optionLabel(currentOption) : label}
				</span>
				<span className={styles.chevron} aria-hidden="true" />
			</button>

			<ul
				id={listId}
				className={`${styles.list} ${isOpen ? styles.open : ""}`.trim()}
			>
				{languages.map((option) => (
					<li key={option.code}>{renderOption(option)}</li>
				))}
			</ul>
		</div>
	);
}
