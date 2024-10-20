import { StyleSheet } from "react-native";
import Button from "../../components/common/Button";
import { useTranslationWithParentName } from "../../hooks/locale";

export interface YellowWideButtonProps {
    isNextAvailabe: boolean;
    onNextButtonClick: () => void;
}

const YellowWideButton = (props: YellowWideButtonProps) => {
    const { isNextAvailabe, onNextButtonClick, ...rest } = props;

    const commonT = useTranslationWithParentName('common');

    return (
        <Button
            title={commonT('done')}
            onPress={onNextButtonClick}
            style={{
                ...styles.nextButton, 
                backgroundColor: isNextAvailabe ? '#FFC426' : '#DDDDDD'
            }}
            textStyle={styles.nextButtonText}
        />
    )
}

export default YellowWideButton;

const styles = StyleSheet.create({
    nextButton: {
      width: '100%',
      height: 60,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 17,
      fontWeight: '600'
    }
});