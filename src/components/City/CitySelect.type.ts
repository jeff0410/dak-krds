import type { CommonSelectProps } from "../Select";

export type CitySelectType = "sido" | "gugun";

export type cityValue = {
	sido: string;
	gugun: string;
	sidoCode: string;
	gugunCode: string;
	fullName: string;
};

export interface CitySelectProps extends Omit<CommonSelectProps, "options"> {
	useGugun?: boolean;
	value?: cityValue;
	onChange?: (value: cityValue) => void;
}
