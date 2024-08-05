import { ReactNode } from "react";
import * as S from "./MainPageLayout.styled";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../../common/Footer/Footer";

export interface MainPageLayoutProps {
    children: ReactNode
}

const MainPageLayout = (props: MainPageLayoutProps) => {
    const { children } = props;

    return (
        <View style={S.styles.container}>
            <SafeAreaView style={S.styles.listContainer}>
                { children }
            </SafeAreaView>
            <Footer isHomeActivate={true} isPersonActivate={false} />
        </View>
    );

}

export default MainPageLayout;