export interface CarouselProps<T> {
	dataList: T[];
	onChange: (index: number) => void;
	initialIndex?: number;
	className?: string;
	disabled?: boolean;
}
