import { CustomSingleDatePicker } from './components';
import type { CustomDatePickerProps } from './CustomDatePicker.type';

export function CustomDatePicker(props: CustomDatePickerProps) {
  return <CustomSingleDatePicker {...props} onChange={props.onChange} />;
}
