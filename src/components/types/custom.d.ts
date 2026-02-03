declare module "*.svg" {
	import React = require("react");

	const ReactComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}

declare module "*.css" {
	const classes: { [className: string]: string };
	export default classes;
}
