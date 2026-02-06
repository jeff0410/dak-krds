export interface PaginationData {
	currentPage: number;
	onChangePage: (page: number) => void;
}

export interface PaginationProps extends PaginationData {
	totalPage: number;
}

export interface PaginationItemProps {
	children: number;
}
