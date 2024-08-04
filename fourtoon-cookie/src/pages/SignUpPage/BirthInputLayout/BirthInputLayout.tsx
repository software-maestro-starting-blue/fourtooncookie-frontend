import { View } from "react-native";
import * as S from "./BirthInputLayout.styled";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { LocalDate } from "@js-joda/core";

export interface BirthInputLayoutProps {
    birth: LocalDate;
    onBirthChange: (birth: LocalDate) => void;
}

const BirthInputLayout = (props: BirthInputLayoutProps) => {
    const { birth, onBirthChange } = props;

    const handleDateChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
        if (! date) {
            onBirthChange(LocalDate.now());
        } else {
            const localDate: LocalDate = LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
            onBirthChange(localDate);
        }
    }

    return (
        <DateTimePicker
            value={new Date(birth.year(), birth.monthValue() - 1, birth.dayOfMonth())}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
            style={S.styles.datePicker}
        />
    );
}

export default BirthInputLayout;