import { useEffect } from "react";
import type { FaviconProps } from "./Favicon.type";

const MARKER = "data-dak-favicon";

type TagSpec = {
	tag: "link" | "meta";
	attrs: Record<string, string>;
};

const guessType = (href: string) => {
	if (href.endsWith(".svg")) return "image/svg+xml";
	if (href.endsWith(".png")) return "image/png";
	if (href.endsWith(".ico")) return "image/x-icon";
	return undefined;
};

const buildSpecs = ({
	href,
	svg,
	light,
	dark,
	appleTouchIcon,
	manifest,
	themeColor,
	sizes = [],
}: FaviconProps): TagSpec[] => {
	const specs: TagSpec[] = [];

	const icon = (
		iconHref: string,
		extra: Record<string, string | undefined> = {},
	) => {
		const type = extra.type ?? guessType(iconHref);
		const attrs: Record<string, string> = { rel: "icon", href: iconHref };
		if (type) attrs.type = type;
		for (const [key, value] of Object.entries(extra)) {
			if (key !== "type" && value) attrs[key] = value;
		}
		specs.push({ tag: "link", attrs });
	};

	if (svg) icon(svg);
	if (light) icon(light, { media: "(prefers-color-scheme: light)" });
	if (dark) icon(dark, { media: "(prefers-color-scheme: dark)" });
	if (href) icon(href);
	for (const size of sizes) icon(size.href, { sizes: size.sizes, type: size.type });

	if (appleTouchIcon) {
		specs.push({
			tag: "link",
			attrs: { rel: "apple-touch-icon", href: appleTouchIcon, sizes: "180x180" },
		});
	}
	if (manifest) {
		specs.push({ tag: "link", attrs: { rel: "manifest", href: manifest } });
	}
	if (themeColor) {
		specs.push({ tag: "meta", attrs: { name: "theme-color", content: themeColor } });
	}

	return specs;
};

export function Favicon(props: FaviconProps) {
	const {
		href,
		svg,
		light,
		dark,
		appleTouchIcon,
		manifest,
		themeColor,
		sizes,
	} = props;

	useEffect(() => {
		if (typeof document === "undefined") return;

		const specs = buildSpecs({
			href,
			svg,
			light,
			dark,
			appleTouchIcon,
			manifest,
			themeColor,
			sizes,
		});
		if (!specs.length) return;

		for (const stale of document.head.querySelectorAll(`[${MARKER}]`)) {
			stale.remove();
		}

		const created = specs.map((spec) => {
			const element = document.createElement(spec.tag);
			for (const [key, value] of Object.entries(spec.attrs)) {
				element.setAttribute(key, value);
			}
			element.setAttribute(MARKER, "");
			document.head.appendChild(element);
			return element;
		});

		return () => {
			for (const element of created) element.remove();
		};
	}, [href, svg, light, dark, appleTouchIcon, manifest, themeColor, sizes]);

	return null;
}
