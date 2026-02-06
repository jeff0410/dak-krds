import { useMemo, useState } from "react";
import { Button, Label, type TimeSelectorPopupProps } from "src/components";
import styles from "./TimeSelector.module.css";
import { TimeSelectorInput } from "./TimeSelectorInput";

export const HOUR_OPTIONS = Array.from({ length: 24 }).map((_it, index) =>
	`${index}`.padStart(2, "0"),
);
export const MINUTE_OPTIONS = Array.from({ length: 60 }).map((_it, index) =>
	`${index}`.padStart(2, "0"),
);

export function TimeSelectorPopup({
	time,
	onUpdateTime,
	setVisible,
}: TimeSelectorPopupProps) {
	const [hour, setHour] = useState(time?.split(":")[0] ?? "");
	const [minute, setMinute] = useState(time?.split(":")[1] ?? "");
	const meridiem = useMemo(
		() => (hour ? (Number(hour) >= 12 ? "PM" : "AM") : ""),
		[hour],
	);

	const onChangeMeridiem = (meridiem: string) => {
		if (meridiem === "AM") {
			setHour((hour ? Number(hour) - 12 : "00").toString().padStart(2, "0"));
			return;
		}
		if (meridiem === "PM") {
			setHour((hour ? Number(hour) + 12 : "12").toString().padStart(2, "0"));
			return;
		}
	};

	return (
		<div className={styles.popupContainer}>
			<div className={styles.timeSelectorWrapper}>
				<TimeSelectorInput
					options={HOUR_OPTIONS}
					value={hour}
					setValue={setHour}
					id={"time-selector"}
				/>
				<Label label={":"} weight={"bold"} size={"l"} id={"division"} />
				<TimeSelectorInput
					options={MINUTE_OPTIONS}
					value={minute}
					setValue={setMinute}
					id={"time-selector"}
				/>
				<div className={styles.meridiemWrapper}>
					<Button
						onClick={() => onChangeMeridiem("AM")}
						variant={"secondary"}
						width={44}
						height={23}
						className={
							meridiem === "AM"
								? styles.meridiemButton
								: styles.disabledMeridiemButton
						}
						size={"xs"}
						aria-readonly={true}
						disabled={meridiem === "AM"}
					>
						AM
					</Button>
					<Button
						onClick={() => onChangeMeridiem("PM")}
						variant={"secondary"}
						className={
							meridiem === "PM"
								? styles.meridiemButton
								: styles.disabledMeridiemButton
						}
						width={44}
						height={23}
						size={"xs"}
						disabled={meridiem === "PM"}
					>
						PM
					</Button>
				</div>
			</div>
			<div className={styles.popupFooter}>
				<Button
					size={"m"}
					variant={"outline"}
					width={64}
					onClick={() => setVisible(false)}
				>
					취소
				</Button>
				<Button
					size={"m"}
					width={64}
					onClick={() => {
						onUpdateTime(hour, minute);
						setVisible(false);
					}}
				>
					선택
				</Button>
			</div>
		</div>
	);
}
