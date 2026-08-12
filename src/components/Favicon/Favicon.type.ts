export type FaviconSize = {
	href: string;
	sizes: string;
	type?: string;
};

export type FaviconProps = {
	href?: string;
	svg?: string;
	light?: string;
	dark?: string;
	appleTouchIcon?: string;
	manifest?: string;
	themeColor?: string;
	sizes?: FaviconSize[];
};
