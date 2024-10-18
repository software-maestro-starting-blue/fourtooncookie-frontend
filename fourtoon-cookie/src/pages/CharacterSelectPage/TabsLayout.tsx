import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CharacterPaymentType } from '../../types/character';

import { useTranslationWithParentName } from '../../hooks/locale';
import { useCharacterSelectPageContext } from './CharacterSelectPageProvider';

const TabsLayout = () => {
    const { selectedPaymentType, setSelectedPaymentType } = useCharacterSelectPageContext();

    const t = useTranslationWithParentName('pages.characterSelectPage.tabsLayout');
    
    return (
        <View style={styles.headersContainer}>
            {
                [
                    { type: CharacterPaymentType.FREE, label: t("free")},
                    //{ type: CharacterPaymentType.PAID, label: t("paid") },
                ].map((item) => (
                    <Tab
                        isActive={selectedPaymentType === item.type}
                        label={item.label}
                        onPress={() => setSelectedPaymentType(item.type)}
                    />
                ))
            }
        </View>
    );
};

export default TabsLayout;

interface TabProps {
    isActive: boolean;
    label: string;
    onPress: () => void;
}

const Tab = (props: TabProps) => {
    const { isActive, label, onPress, ...rest } = props;

    return (
        <TouchableOpacity onPress={onPress} style={[styles.tab, isActive && styles.selectedTab ]}>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    headersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 18,
        marginRight: 8,
    },
    selectedTab: {
        backgroundColor: '#212121',
    },
    tabText: {
        fontFamily: 'Pretendard',
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.005,
        color: '#AAAAAA',
    },
    activeTabText: {
        fontFamily: 'Pretendard',
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: -0.005,
        color: '#FFFFFF',
    }
});