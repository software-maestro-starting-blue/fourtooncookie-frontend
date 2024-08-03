import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import * as S from "./BirthInputLayout.styled";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export interface BirthInputLayoutProps {
    birth: Date;
    onBirthChange: (birth: Date) => void;
}

const BirthInputLayout = (props: BirthInputLayoutProps) => {
    const { birth, onBirthChange } = props;

    const handleDateChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
        onBirthChange(date || new Date());
    }

    return (
        <View>
            <Text style={S.styles.title}>생년월일을 알려주세요</Text>
            <View style={S.styles.inputContainer}>
                <DateTimePicker
                    value={birth}
                    mode="date"
                    display="spinner"
                    onChange={handleDateChange}
                    style={S.styles.datePicker}
                />
            </View>
        </View>
    );
}

export default BirthInputLayout;