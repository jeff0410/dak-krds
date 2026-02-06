// Breadcrumb.type.ts
export interface BreadcrumbItem {
	label: string;
	value: string;
	onClick?: () => void;
}

export interface BreadcrumbProps {
	items: BreadcrumbItem[];
	onItemClick?: (value: string) => void;
}
