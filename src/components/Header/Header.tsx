import { useCallback, useEffect, useId, useRef, useState } from "react";
import styles from "./Header.module.css";
import type { HeaderProps } from "./Header.type";

export function Header({
	logo,
	logoHref = "/",
	menu = [],
	utilityLinks = [],
	iconActions = [],
	masthead,
	variant = "horizontal",
	skipTargetId = "main-content",
	skipLabel = "본문 바로가기",
	className = "",
	...props
}: HeaderProps) {
	const baseId = useId();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const navRef = useRef<HTMLDivElement>(null);

	const closeAll = useCallback(() => {
		setIsMenuOpen(false);
		setOpenIndex(null);
	}, []);

	useEffect(() => {
		if (!isMenuOpen && openIndex === null) return;

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") closeAll();
		};
		const onPointerDown = (event: MouseEvent) => {
			if (!navRef.current?.contains(event.target as Node)) closeAll();
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
		};
	}, [isMenuOpen, openIndex, closeAll]);

	return (
		<header className={`${styles.header} ${className}`.trim()} {...props}>
			<a href={`#${skipTargetId}`} className={styles.skipLink}>
				{skipLabel}
			</a>

			{masthead}

			<div className={styles.inner} ref={navRef}>
				<div className={styles.top}>
					<a href={logoHref} className={styles.logo}>
						{logo}
					</a>

					<div className={`${styles.actions} ${styles[variant]}`}>
						{utilityLinks.length > 0 && (
							<nav aria-label="유틸리티" className={styles.utility}>
								<ul className={styles.utilityList}>
									{utilityLinks.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												className={styles.utilityLink}
												{...(link.external
													? { target: "_blank", rel: "noreferrer noopener" }
													: {})}
											>
												{link.label}
												{link.external && (
													<span className={styles.srOnly}>새 창 열림</span>
												)}
											</a>
										</li>
									))}
								</ul>
							</nav>
						)}

						{iconActions.length > 0 && (
							<ul className={styles.iconList}>
								{iconActions.map((action) =>
									action.href ? (
										<li key={action.label}>
											<a href={action.href} className={styles.iconButton}>
												{action.icon}
												<span className={styles.srOnly}>{action.label}</span>
											</a>
										</li>
									) : (
										<li key={action.label}>
											<button
												type="button"
												className={styles.iconButton}
												onClick={action.onClick}
											>
												{action.icon}
												<span className={styles.srOnly}>{action.label}</span>
											</button>
										</li>
									),
								)}
							</ul>
						)}

						{menu.length > 0 && (
							<button
								type="button"
								className={styles.hamburger}
								aria-expanded={isMenuOpen}
								aria-controls={`${baseId}-menu`}
								onClick={() => setIsMenuOpen((open) => !open)}
							>
								<span className={styles.hamburgerBar} aria-hidden="true" />
								<span className={styles.srOnly}>
									{isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
								</span>
							</button>
						)}
					</div>
				</div>

				{menu.length > 0 && (
					<nav
						id={`${baseId}-menu`}
						aria-label="주메뉴"
						className={`${styles.mainMenu} ${isMenuOpen ? styles.open : ""}`.trim()}
					>
						<ul className={styles.menuList}>
							{menu.map((item, index) => {
								const submenuId = `${baseId}-submenu-${index}`;
								const hasItems = Boolean(item.items?.length);

								return (
									<li key={item.label} className={styles.menuItem}>
										{hasItems ? (
											<button
												type="button"
												className={styles.menuTrigger}
												aria-expanded={openIndex === index}
												aria-controls={submenuId}
												onClick={() =>
													setOpenIndex(openIndex === index ? null : index)
												}
											>
												{item.label}
											</button>
										) : (
											<a href={item.href} className={styles.menuLink}>
												{item.label}
											</a>
										)}

										{hasItems && (
											<ul
												id={submenuId}
												className={`${styles.submenu} ${
													openIndex === index ? styles.open : ""
												}`.trim()}
											>
												{item.items?.map((sub) => (
													<li key={sub.href}>
														<a
															href={sub.href}
															className={styles.submenuLink}
															{...(sub.external
																? {
																		target: "_blank",
																		rel: "noreferrer noopener",
																	}
																: {})}
														>
															{sub.label}
															{sub.external && (
																<span className={styles.srOnly}>
																	새 창 열림
																</span>
															)}
														</a>
													</li>
												))}
											</ul>
										)}
									</li>
								);
							})}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
}
