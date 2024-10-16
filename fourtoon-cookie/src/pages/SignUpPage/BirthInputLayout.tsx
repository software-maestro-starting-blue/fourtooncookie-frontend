import { StyleSheet, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { LocalDate } from "@js-joda/core";
import { useFunctionWithErrorHandling } from "../../hooks/error";
import Container from "./Container";
import { useTranslationWithParentName } from "../../hooks/locale";
import { useSignUpPageContext } from "./SignUpPageProvider";

const BirthInputLayout = () => {
    const { birth, setBirth } = useSignUpPageContext();

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const t = useTranslationWithParentName('pages.signUpPage.birthInputLayout');

    const handleDateChange = functionWithErrorHandling((event: DateTimePickerEvent, date?: Date | undefined) => {
        if (! date) {
            setBirth(LocalDate.now());
        } else {
            const localDate: LocalDate = LocalDate.of(date.getFullYear(), date.getMonth() + 1, date.getDate());
            setBirth(localDate);
        }
    })

    return (
        <Container title={t("title")}>
            <View style={styles.container}>
                <DateTimePicker
                    value={new Date(birth.year(), birth.monthValue() - 1, birth.dayOfMonth())}
                    mode="date"
                    display="spinner"
                    textColor="black"
                    style={{ width: '100%', height: '100%' }}
                    onChange={handleDateChange}
                />
            </View>
        </Container>
    );
}

export default BirthInputLayout;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: '#f7f7f7',
      borderRadius: 12,
      width: 350,
      height: 280,
    },
    });
    