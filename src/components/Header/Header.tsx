import { useId, useState } from "react";
import { useAutoHideOnScroll } from "../../hooks/use-auto-hide-on-scroll";
import a11y from "../../styles/a11y.module.css";
import { MainMenu } from "../MainMenu";
import { SkipLink } from "../SkipLink";
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
	sticky = "none",
	skipLinks,
	skipTargetId = "main-content",
	skipLabel = "본문 바로가기",
	className = "",
	...props
}: HeaderProps) {
	const baseId = useId();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuId = `${baseId}-menu`;
	const isHidden = useAutoHideOnScroll(sticky === "auto-hide" && !isMenuOpen);

	return (
		<header
			className={`${styles.header} ${sticky !== "none" ? styles.sticky : ""} ${isHidden ? styles.hidden : ""} ${className}`.trim()}
			{...props}
		>
			<SkipLink
				items={skipLinks ?? [{ label: skipLabel, targetId: skipTargetId }]}
			/>

			{masthead}

			<div className={styles.inner}>
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
													<span className={a11y.srOnly}>새 창 열림</span>
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
												<span className={a11y.srOnly}>{action.label}</span>
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
												<span className={a11y.srOnly}>{action.label}</span>
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
								aria-controls={menuId}
								onClick={() => setIsMenuOpen((open) => !open)}
							>
								<span className={styles.hamburgerBar} aria-hidden="true" />
								<span className={a11y.srOnly}>
									{isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
								</span>
							</button>
						)}
					</div>
				</div>

				{menu.length > 0 && (
					<div className={styles.mainMenuArea}>
						<MainMenu items={menu} menuId={menuId} isMobileOpen={isMenuOpen} />
					</div>
				)}
			</div>
		</header>
	);
}
