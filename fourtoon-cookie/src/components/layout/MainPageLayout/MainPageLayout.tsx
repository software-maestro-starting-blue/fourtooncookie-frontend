import { ReactNode } from "react";
import * as S from "./MainPageLayout.styled";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer, { FOOTER_STATE } from "./Footer/Footer";

export interface MainPageLayoutProps {
    children: ReactNode,
    footerState: FOOTER_STATE,
}

const MainPageLayout = (props: MainPageLayoutProps) => {
    const { children, footerState, ...rest } = props;

    return (
        <View style={S.styles.container}>
            <SafeAreaView style={S.styles.childrenContainer}>
                { children }
            </SafeAreaView>
            <Footer footerState={footerState} />
        </View>
    );

}

export default MainPageLayout;