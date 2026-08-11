import a11y from "../../styles/a11y.module.css";
import styles from "./Footer.module.css";
import type { FooterLink, FooterProps } from "./Footer.type";

const externalProps = (link: FooterLink) =>
	link.external
		? { target: "_blank" as const, rel: "noreferrer noopener" as const }
		: {};

export function Footer({
	logo,
	contacts = [],
	utilityLinks = [],
	socials = [],
	policyLinks,
	copyright,
	identifier,
	className = "",
	...props
}: FooterProps) {
	const hasMiddle = utilityLinks.length > 0 || socials.length > 0;

	return (
		<footer className={`${styles.footer} ${className}`.trim()} {...props}>
			<div className={styles.inner}>
				{(logo || contacts.length > 0) && (
					<div className={styles.top}>
						{logo && <div className={styles.logo}>{logo}</div>}
						{contacts.length > 0 && (
							<dl className={styles.contacts}>
								{contacts.map((contact) => (
									<div key={contact.label} className={styles.contact}>
										<dt className={styles.contactLabel}>{contact.label}</dt>
										<dd className={styles.contactValue}>
											{contact.href ? (
												<a href={contact.href} className={styles.contactLink}>
													{contact.value}
												</a>
											) : (
												contact.value
											)}
										</dd>
									</div>
								))}
							</dl>
						)}
					</div>
				)}

				{hasMiddle && (
					<div className={styles.middle}>
						{utilityLinks.length > 0 && (
							<nav aria-label="관련 사이트">
								<ul className={styles.utilityList}>
									{utilityLinks.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												className={styles.utilityLink}
												{...externalProps(link)}
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
						{socials.length > 0 && (
							<ul className={styles.socialList}>
								{socials.map((social) => (
									<li key={social.href}>
										<a
											href={social.href}
											className={styles.socialLink}
											target="_blank"
											rel="noreferrer noopener"
										>
											{social.icon}
											<span className={a11y.srOnly}>
												{social.label} 새 창 열림
											</span>
										</a>
									</li>
								))}
							</ul>
						)}
					</div>
				)}

				<div className={styles.bottom}>
					<nav aria-label="정책 정보">
						<ul className={styles.policyList}>
							{policyLinks.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className={`${styles.policyLink} ${
											link.emphasis ? styles.emphasis : ""
										}`.trim()}
										{...externalProps(link)}
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
					<p className={styles.copyright}>{copyright}</p>
				</div>
			</div>

			{identifier}
		</footer>
	);
}
