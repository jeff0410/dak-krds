import { createContext, useContext } from "react";
import { Icon } from "../Icon";
import styles from "./Pagination.module.css";
import type {
	PaginationData,
	PaginationItemProps,
	PaginationProps,
} from "./Pagination.type";
import { useIsMobile } from "./useIsMobile";

const PaginationContext = createContext<PaginationData | null>(null);

function PaginationMore() {
	return (
		<div className={[styles.pageItem, styles.moreButton].join(" ")}>
			<Icon icon="EllipsisHorizontal" size={24} viewBox="0 0 24 24" />
		</div>
	);
}

function PaginationItem({ children: label }: PaginationItemProps) {
	const context = useContext(PaginationContext);
	if (!context) return;
	const { currentPage, onChangePage } = context;
	const length = String(label).length;

	return (
		<button
			type="button"
			onClick={() => onChangePage(label)}
			style={{
				fontSize: `${length <= 3 ? 17 : 13}px`,
				padding: `10px ${length <= 3 ? 10 : 5}px`,
			}}
			className={[
				styles.pageItem,
				currentPage === label && styles.activePageItem,
			].join(" ")}
		>
			{label}
		</button>
	);
}

export function Pagination({
	currentPage,
	totalPage,
	onChangePage,
}: PaginationProps) {
	const isMobile = useIsMobile();
	const pivotPage = isMobile ? 5 : 7;
	const isStart = currentPage < pivotPage || totalPage === pivotPage;
	const isEnd =
		!isStart &&
		totalPage > pivotPage &&
		currentPage > totalPage - pivotPage + 1;
	const isMiddle = totalPage > pivotPage && !isStart && !isEnd;

	const isDisabledPrev = currentPage <= 1;
	const isDisabledNext = currentPage >= totalPage;

	return (
		<PaginationContext value={{ currentPage, onChangePage }}>
			<div className={styles.paginationContainer}>
				<button
					type="button"
					className={[
						styles.pagePrev,
						isDisabledPrev && styles.disabledMoveButton,
					].join(" ")}
					onClick={() => onChangePage(currentPage - 1)}
					disabled={isDisabledPrev}
				>
					<Icon
						icon="ArrowLeft"
						color={`var(--krds-color-gray-${isDisabledPrev ? "40" : "70"})`}
						size={20}
						viewBox="0 0 20 20"
					/>
					<span>이전</span>
				</button>
				<div className={styles.pageContainer}>
					{isStart && (
						<>
							{Array.from(
								{ length: Math.min(totalPage, pivotPage) },
								(_, index) => (
									<PaginationItem key={`pagination-total-${index.toString()}`}>
										{index + 1}
									</PaginationItem>
								),
							)}
							{totalPage > pivotPage && (
								<>
									<PaginationMore />
									<PaginationItem>{totalPage}</PaginationItem>
								</>
							)}
						</>
					)}
					{isMiddle && (
						<>
							<PaginationItem>{1}</PaginationItem>
							<PaginationMore />
							{Array.from({ length: isMobile ? 3 : 5 }, (_, index) => (
								<PaginationItem
									key={`pagination-total-${(index + currentPage - (isMobile ? 2 : 3)).toString()}`}
								>
									{index + currentPage - (isMobile ? 1 : 2)}
								</PaginationItem>
							))}
							<PaginationMore />
							<PaginationItem>{totalPage}</PaginationItem>
						</>
					)}
					{isEnd && (
						<>
							<PaginationItem>{1}</PaginationItem>
							<PaginationMore />
							{Array.from({ length: pivotPage }, (_, index) => (
								<PaginationItem
									key={`pagination-total-${totalPage - pivotPage + index.toString()}`}
								>
									{index + totalPage - pivotPage + 1}
								</PaginationItem>
							))}
						</>
					)}
				</div>
				<button
					type="button"
					className={[
						styles.pageNext,
						isDisabledNext && styles.disabledMoveButton,
					].join(" ")}
					onClick={() => onChangePage(currentPage + 1)}
					disabled={isDisabledNext}
				>
					<span>다음</span>
					<Icon
						icon="ArrowRight"
						color={`var(--krds-color-gray-${isDisabledNext ? "40" : "70"})`}
						size={20}
						viewBox="0 0 20 20"
					/>
				</button>
			</div>
		</PaginationContext>
	);
}
