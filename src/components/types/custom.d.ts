declare module "*.svg" {
	import type React from "react";
	const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module "*.svg?url" {
	const content: string;
	export default content;
}

declare module "*.png" {
	const content: string;
	export default content;
}

declare module "*.jpg" {
	const content: string;
	export default content;
}

declare module "*.jpeg" {
	const content: string;
	export default content;
}

declare module "*.css" {
	const classes: { readonly [key: string]: string };
	export = classes;
}
