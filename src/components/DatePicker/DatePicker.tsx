import { RangeDatePicker } from "./components/RangeDatePicker/RangeDatePicker";
import { SingleDatePicker } from "./components/SingleDatePicker/SingleDatePicker";
import type { DatePickerProps } from "./DatePicker.type";

export function DatePicker(props: DatePickerProps) {
	if (props.type === "range") {
		return (
			<RangeDatePicker
				{...props}
				onChange={props.onChange}
				isValid={props.isValid}
			/>
		);
	} else {
		return (
			<SingleDatePicker
				{...props}
				onChange={props.onChange}
				isValid={props.isValid}
			/>
		);
	}
}
