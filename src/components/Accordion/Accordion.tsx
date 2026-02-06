import type React from "react";
import { useRef, useState } from "react";
import { Label } from "../Label";
import * as style from "./Accordion.module.css";
import type {
	AccordionProps,
	ChevronIconProps,
	InternalAccordionItemProps,
} from "./Accordion.type";

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		className={`${style.chevronIcon} ${isOpen ? style.chevronIconOpen : ""}`}
		aria-hidden="true"
	>
		<path
			d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
			fill="currentColor"
		/>
	</svg>
);

const AccordionItem: React.FC<InternalAccordionItemProps> = ({
	title,
	id,
	children,
	className,
	childrenClassName,
	size = "m",
	isOpen,
	onClick,
}) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const buttonId = `accordion-button-${typeof title === "string" ? title.replace(/\s+/g, "-").toLowerCase() : id}`;
	const contentId = `accordion-content-${typeof title === "string" ? title.replace(/\s+/g, "-").toLowerCase() : id}`;

	return (
		<div className={style.accordionItem} data-isopen={isOpen.toString()}>
			<button
				type="button"
				className={style.accordionButton}
				onClick={onClick}
				aria-expanded={isOpen}
				aria-controls={contentId}
				id={buttonId}
			>
				<Label id={buttonId} size={size} weight="bold" className={className}>
					{title}
				</Label>
				<span className={style.chevronContainer}>
					<ChevronIcon isOpen={isOpen} />
				</span>
				<span className={style.srOnly}>{isOpen ? "접기" : "펼치기"}</span>
			</button>
			<section
				ref={contentRef}
				aria-labelledby={buttonId}
				id={contentId}
				className={style.accordionContent}
				style={{
					maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
				}}
				inert={!isOpen ? true : undefined}
			>
				<div className={`${style.accordionContentInner} ${childrenClassName}`}>
					{children}
				</div>
			</section>
		</div>
	);
};

export const Accordion: React.FC<AccordionProps> = ({
	items,
	className = "",
	variant = "line",
	...props
}) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const handleItemClick = (index: number) => {
		setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<div
			{...props}
			className={`${className} ${style.accordion} ${style[variant]}`}
		>
			{items.map((item, index) => (
				<AccordionItem
					key={
						(typeof item.title === "string" && item.title) ||
						item.id ||
						`accordion-item-${index}`
					} // 더 안정적인 key 사용
					{...item}
					id={`accordion-item-${index}`}
					isOpen={openIndex === index}
					size={item.size || "m"}
					onClick={() => handleItemClick(index)}
					className={item.className || style.accordionTitle}
				/>
			))}
		</div>
	);
};
